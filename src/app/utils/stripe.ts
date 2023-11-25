import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? "",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  },
);

export const pay_standard_Subscriptions: any = async (
  userid: string,
  email: string,
) => {
  const billing_url = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }${"subscriptions"}`;

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${billing_url}?session_id={CHECKOUT_SESSION_ID}`,
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
    success_url: `${billing_url}?session_id={CHECKOUT_SESSION_ID}`,
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
  });

  // console.log(stripeSession.url);
  return { url: stripeSession.url };
};
