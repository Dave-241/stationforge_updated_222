import { stripe, update_user_doc } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Cors from "micro-cors";
import nodemailer from "nodemailer";

import type Stripe from "stripe";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
export async function POST(request: Request) {
  // Function to calculate the Unix timestamp for the 1st day of the next month
  function getNextMonthTimestamp() {
    const currentDate = new Date();
    const nextMonth = new Date(
      Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 1),
    );
    return Math.floor(nextMonth.getTime() / 1000);
  }
  const secret = process.env.STRIPE_WEBHOOK_KEY || "";

  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 },
    );
  }

  //   this function updates t when the user either cancels or renews subscriptions
  const deleteUserSubscription = async (email: string, priceId: string) => {
    try {
      const subscriptionCollection = collection(
        db,
        "user_subscription_webhook",
      );

      // Query to find the document with matching email and price_id
      const q = query(
        subscriptionCollection,
        where("email", "==", email),
        where("price_id", "==", priceId),
      );

      const querySnapshot = await getDocs(q);

      // Loop through the matched documents and delete them
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log(
        `Subscription document with email: ${email} and price_id: ${priceId} deleted successfully.`,
      );
    } catch (error) {
      console.error("Error deleting subscription document:", error);
      throw error;
    }
  };

  const update_users_info = async (
    Email: string,
    customer: string,
    subscriptionid: string,
  ) => {
    try {
      // Reference to the Firestore collection
      const subscriptionCollection = collection(
        db,
        "user_subscription_webhook",
      );

      // Query to check if there is an existing document with the given email and price_id
      const existingSubscriptionQuery = query(
        subscriptionCollection,
        where("email", "==", Email),
        where("price_id", "==", subscriptionid),
      );

      // Execute the query
      const querySnapshot = await getDocs(existingSubscriptionQuery);

      // If no matching documents are found, add a new document
      if (querySnapshot.empty) {
        await addDoc(subscriptionCollection, {
          email: Email,
          price_id: subscriptionid,
          createdAt: serverTimestamp(),
          active: true,
          customer: customer,
        });
        console.log("New subscription document created.");
      } else {
        console.log(
          "Subscription document already exists for this email and price_id.",
        );
      }
    } catch (error) {
      console.error("Error updating user document:", error);
      throw error;
    }
  };

  //   this is the billing url
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;
  const session: any = (await event.data.object) as Stripe.Checkout.Session;

  //   this is for sending mails

  const sendmails_when_invoice_fails = async (
    subscriptionid: string,
    updatePaymentLink: any,
  ) => {
    const userQuery = query(
      collection(db, "users"),
      where("subscriptionId", "==", subscriptionid),
    );
    const userDocs = await getDocs(userQuery);
    if (userDocs.empty) {
      console.log("No user document found for the current user");
      return;
    }

    const email = userDocs.docs[0].data().Email;

    const emailContent = `
  <h4>Dear ${email},</h4>
  <p>We hope this message finds you well. We wanted to inform you that there was an issue processing the recent payment for your account.</p>
  
 
  
  <p>To avoid any service interruptions, we kindly ask you to update your payment information by clicking the link below:</p>
  
  <a href="${updatePaymentLink}">Update Payment Information</a>
  
  <p>If you have any questions or need assistance, please don't hesitate to contact our support team at ${"000-000-000"}.</p>
  
  <p>Thank you for your prompt attention to this matter.</p>
  
  <p>Best regards,<br>${"Station Forge"}</p>
`;

    const emailOptions = {
      from: process.env.PUBLIC_EMAIL_ID,
      to: email,
      subject: "Action Required: Payment Issue on Your Account",
      html: emailContent,
    };

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PUBLIC_EMAIL_ID,
        pass: process.env.PUBLIC_EMAIL_ID_KEY,
      },
    });

    await transporter.sendMail(emailOptions);
  };

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const subscription: any = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "customer.subscription.deleted":
      //   console.log("this was urrent");
      const customerSubscriptionDeleted: any = await event.data.object;

      const deleted_plain_id = await customerSubscriptionDeleted.items.data[0]
        .price.id;

      deleteUserSubscription(
        customerSubscriptionDeleted.email,
        deleted_plain_id,
      );

      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case "customer.subscription.created":
      const created_customer: any = event.data.object as Stripe.Subscription;

      break;
    case "customer.subscription.updated":
      const customerSubscriptionUpdated: any = (await event.data
        .object) as Stripe.Subscription;

      //  console.log(customerSubscriptionUpdated.trial_end);

      const billing_anchor =
        await customerSubscriptionUpdated.billing_cycle_anchor;

      const trial_end = await customerSubscriptionUpdated.trial_end;

      const next_first_month = await getNextMonthTimestamp();

      console.log(trial_end, next_first_month, billing_anchor);
      // Check if the subscription is still in trial

      // Subscription has moved past the trial period
      if (billing_anchor == next_first_month) {
        // console.log("Billing cycle anchor is for the next month");
        // return;
        break;
      } else if (
        trial_end != next_first_month &&
        billing_anchor != next_first_month
      ) {
        // console.log("it has updateed");
        const subscription_created = await stripe.subscriptions.update(
          customerSubscriptionUpdated.id,
          {
            trial_end: getNextMonthTimestamp(),
            proration_behavior: "none",
          },
        );
      }

      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case "invoice.payment_succeeded":
      const invoicePaymentSucceeded: any = await event.data.object;

      // Check if subscription is available in the invoicePaymentSucceeded object
      const subscriptionId = await invoicePaymentSucceeded.subscription;
      // Fetch the subscription details from Stripe
      const subscription_payment_succedded =
        await stripe.subscriptions.retrieve(subscriptionId);
      // Now you can access the current plan ID
      const plain_id = await subscription_payment_succedded.items.data[0].price
        .id;

      // Use currentPlanId for further processing
      console.log(
        invoicePaymentSucceeded,
        "this is the detail you are looing for ",
      );

      if (
        invoicePaymentSucceeded.billing_reason == "subscription_cycle" ||
        invoicePaymentSucceeded.billing_reason == "subscription_create"
      ) {
        update_users_info(
          invoicePaymentSucceeded.customer_email,
          invoicePaymentSucceeded.customer,
          plain_id,
        );
      }

      //  else if (
      //   invoicePaymentSucceeded.billing_reason == "subscription_update"
      // ) {
      //   update_users_info_without_increasing_allocation(
      //     invoicePaymentSucceeded.customer_email,
      //     false,
      //     4,
      //     invoicePaymentSucceeded.customer,
      //     "Merchant tier",
      //   );
      // }

      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    // ... handle other event types
    case "invoice.payment_failed":
      const invoicePaymentfailed: any = event.data.object;
      // Generate a link to the billing portal
      const portalLink = await stripe.billingPortal.sessions.create({
        customer: invoicePaymentfailed.customer,
        return_url: billing_url, // Specify the return URL after the customer updates their information
      });

      sendmails_when_invoice_fails(
        invoicePaymentfailed.customer,
        portalLink.url,
      );
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
