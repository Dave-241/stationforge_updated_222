import { stripe } from "@/app/utils/stripe";
import { Console } from "console";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

import type Stripe from "stripe";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";
  let event: Stripe.Event;
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  const auth: any = getAuth();

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      "whsec_5d57657d7ae14a31a9eb80ac529e3ba3f9b6d93197cd6d11e4046010621b7814" ||
        "",
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 },
    );
  }

  //   this is the funtion to update on after the webhook
  const update_user_doc = async (
    e: number,
    id: string,
    type: string,
    subscriptionid: string,
    subscriptionCancel: boolean,
  ) => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("userid", "==", id),
      );
      const userDocs = await getDocs(userQuery);

      if (userDocs.empty) {
        console.log("No user document found for the current user");
        return;
      }

      const userDocRef = doc(db, "users", userDocs.docs[0].id);
      await updateDoc(userDocRef, {
        subscribedAt: serverTimestamp(),
        step: e,
        subscriptionCancelled: subscriptionCancel,
        subscription: type,
        subscriptionId: subscriptionid,
        no_of_subscriptions: 1,
      });

      console.log("User document updated successfully");
    } catch (error) {
      console.error("Error updating user document:", error);
      throw error;
    }
  };

  //   this function updates t when the user either cancels or renews subscriptions
  const updateT = async (
    subscriptionid: string,
    cancelled: boolean,
    step: number,
    subscription_no: number,
    subscription: string,
  ) => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("subscriptionId", "==", subscriptionid),
      );
      const userDocs = await getDocs(userQuery);
      if (userDocs.empty) {
        console.log("No user document found for the current user");
        return;
      }
      const current_number = userDocs.docs[0].data().no_of_subscriptions;

      const userDocRef = doc(db, "users", userDocs.docs[0].id);
      await updateDoc(userDocRef, {
        subscribedAt: serverTimestamp(),
        step: step,
        subscriptionCancelled: cancelled,
        no_of_subscriptions: current_number + subscription_no,
        subscription: subscription,
      });

      console.log("User document updated successfully");
    } catch (error) {
      console.error("Error updating user document:", error);
      throw error;
    }
  };

  //   this is the billing url
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;
  const session: any = event.data.object as Stripe.Checkout.Session;

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

  // if (event.type === "checkout.session.completed") {
  //   console.log("tis is the session id " + session.metadata.userId);
  //   // console.log(subscription);

  // }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const subscription: any = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );
      if (subscription.plan.id == process.env.NEXT_PUBLIC_MERCHANT_PRICE) {
        update_user_doc(
          4,
          session.metadata.userId,
          "Merchant tier",
          session.customer,
          false,
        );
      } else if (
        subscription.plan.id == process.env.NEXT_PUBLIC_STANDARD_PRICE
      ) {
        update_user_doc(
          3,
          session.metadata.userId,
          "Standard tier",
          session.customer,
          false,
        );
      }
      //   console.log("Checkout was completed just now ");
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "customer.subscription.deleted":
      //   console.log("this was urrent");
      const customerSubscriptionDeleted: any = event.data.object;

      updateT(customerSubscriptionDeleted.customer, true, 1, 0, "Public user");

      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case "customer.subscription.updated":
      const customerSubscriptionUpdated: any = await event.data.object;
      const plain_id = customerSubscriptionUpdated.plan.id;
      //   console.log(customerSubscriptionUpdated);
      //   console.log(customerSubscriptionUpdated.customer);
      if (plain_id == process.env.NEXT_PUBLIC_MERCHANT_PRICE) {
        updateT(
          customerSubscriptionUpdated.customer,
          false,
          4,
          1,
          "Merchant tier",
        );
      } else if (plain_id == process.env.NEXT_PUBLIC_STANDARD_PRICE) {
        updateT(
          customerSubscriptionUpdated.customer,
          false,
          3,
          1,
          "Standard tier",
        );
      }
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    case "invoice.payment_succeeded":
      const invoicePaymentSucceeded = event.data.object;

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

      //   console.log(invoicePaymentfailed.customer); // Then define and call a function to handle the event invoice.payment_succeeded

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
