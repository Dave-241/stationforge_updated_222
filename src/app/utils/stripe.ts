import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? "",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  },
);

// Function to calculate the Unix timestamp for the 1st day of the next month
function getNextMonthTimestamp() {
  const currentDate = new Date();
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(currentDate.getMonth() + 1, 1); // Set to 1st day of next month
  return Math.floor(nextMonth.getTime() / 1000); // Convert to Unix timestamp (in seconds)
}

export const pay_standard_Subscriptions: any = async (
  userid: string,
  email: string,
) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    cancel_url: billing_url,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STANDARD_PRICE,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userid,
    },
    // subscription_data: {
    //   billing_cycle_anchor: getNextMonthTimestamp(),
    // },
    subscription_data: {
      billing_cycle_anchor: Math.floor(Date.now() / 1000), // Set billing_cycle_anchor to now for immediate billing
    },
  });

  // console.log(stripeSession.url);
  return { url: stripeSession.url };
};

export const pay_merchant_Subscriptions: any = async (
  userid: string,
  email: string,
) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    cancel_url: billing_url,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,

    line_items: [
      {
        price: process.env.NEXT_PUBLIC_MERCHANT_PRICE,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userid,
    },
    subscription_data: {
      billing_cycle_anchor: Math.floor(Date.now() / 1000), // Set billing_cycle_anchor to now for immediate billing
    },
  });

  // console.log(stripeSession.url);
  return { url: stripeSession.url };
};

export const manage_subscription: any = async (customerid: string) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: customerid,
    return_url: billing_url,
  });
  return { url: stripeSession.url };
};

// export const upgrade_subscriptions: any = async (customerid: string) => {
//   const billing_url = `${
//     process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
//   }${"subscriptions"}`;

//   const subscriptions = await stripe.subscriptions.list({
//     customer: customerid,
//   });

//   return { url: subscriptions.url };
// };

export const renew_subscription: any = async (
  customerid: string,
  userid: string,
  email: string,
  priceid: any,
) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    customer: customerid, // Replace with the actual customer ID
    cancel_url: billing_url,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",

    line_items: [
      {
        price: priceid,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userid,
    },
    subscription_data: {
      billing_cycle_anchor: getNextMonthTimestamp(),
    },
  });

  // console.log(stripeSession.url);
  return { url: stripeSession.url };
};

// export const update_subscription = async (subid:any) => {
//   // Set the billing cycle anchor to the first day of the next month
//   const subscription = await stripe.subscriptions.update(subid, {
//     billing_cycle_anchor: getNextMonthTimestamp,
//   });
// }
