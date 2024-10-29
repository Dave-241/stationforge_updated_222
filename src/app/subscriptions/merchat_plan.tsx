"use client ";

import React, { useState } from "react";
import mer_1 from "../../../public/subscription/mer_1.webp";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import stan_1 from "../../../public/subscription/stan_1.webp";

import { useRouter } from "next/navigation";
import {
  manage_subscription,
  pay_merchant_Subscriptions,
  pay_standard_Subscriptions,
  renew_subscription,
  stripe,
  // upgrade_subscriptions,
} from "../utils/stripe";
import { useProfile_Context } from "../utils/profile_context";

const Merchant_plan = ({
  currentplan,
  email,
  uuid,
  customer,
  current_subscription_plain,
  merchant_isloading,
  setmerchant_isloading,
}: any) => {
  const router = useRouter();
  const { setpage_loader, Add_notification }: any = useProfile_Context();
  const paynow = async () => {
    if (uuid != "" && email != "") {
      try {
        setmerchant_isloading(true);
        Add_notification("Initiated merchant subscription");
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);
        const stripe = await stripe_promise;
        const session_url = await pay_merchant_Subscriptions(uuid, email);

        if (session_url.id) {
          const result = await stripe?.redirectToCheckout({
            sessionId: session_url.id,
          });
        }
      } catch (error: any) {
        setmerchant_isloading(false);
        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setmerchant_isloading(false);
      return;
    }
  };

  const manage_merchant_subscriptions = async () => {
    if (customer != "") {
      try {
        setmerchant_isloading(true);
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);
        const stripe = await stripe_promise;
        const manage_session = await manage_subscription(customer);
        if (manage_session.url && stripe) {
          router.push(manage_session.url);
        }
      } catch (error: any) {
        setmerchant_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setmerchant_isloading(false);

      return;
    }
  };

  const renew_subscription_to_merchant = async () => {
    if (customer != "") {
      try {
        setmerchant_isloading(true);
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);
        const stripe = await stripe_promise;
        const session_url = await renew_subscription(
          customer,
          uuid,
          email,
          process.env.NEXT_PUBLIC_MERCHANT_PRICE,
        );
        if (session_url.id) {
          const result = await stripe?.redirectToCheckout({
            sessionId: session_url.id,
          });
        }
      } catch (error: any) {
        setmerchant_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setmerchant_isloading(false);
      // loading merchant
      return;
    }
  };
  return (
    <>
      <div className="md:w-[40%] lg:w-[30%] sm:w-[80vw] sm:h-[130vw] md:h-auto md:py-[2rem] lg:py-[4rem]  md:px-[1.2rem] sm:px-[6vw] flex flex-col justify-center items-center  bg-[#111111] md:rounded-[1.2rem] sm:border-l-[1.6vw] md:border-l-[0.5rem] md:gap-[2rem] sm:gap-[4vw] sm:rounded-[4vw]   border-[#4C89E5]">
        {/* first row div */}
        <div className="w-full flex justify-between items-center">
          <Image
            src={stan_1}
            className="md:w-[3rem] sm:w-[15vw] h-fit"
            alt="most popular image placeholder"
          />
        </div>
        {/* second row div */}
        <div className="w-full flex  flex-col gap-[0.2vw]  ">
          <h2 className="md:text-3xl  neuem text-white sm:text-[6vw]">
            Merchant Tier
          </h2>
          {/* <h3 className="text-[#000000] sm:text-[2.6vw] neuer text-opacity-[60%] text-[0.9vw]">
            The merchant tier2 is a second wave of merchants that gives you
            commercial license to 3D prints and sell station forge models in
            physical forms only as long as subscribed this tier is only limited
            to 50 individuals as was the previous tier
          </h3> */}
        </div>
        {/* thired div  */}
        <div className="w-full">
          <h3 className="text-white md:text-3xl neuem sm:text-[4vw] ">
            $50{" "}
            <span className="text-opacity-[60%] text-white md:text-xl sm:text-[3vw]">
              /Month
            </span>
          </h3>
        </div>
        {/* fourthe div */}
        <p className="md:text-xs neuer sm:text-[2.9vw] text-white">
          Permission to print and distribute physical models (not the STL.
          files) through your website/marketplaces. Use the original pictures
          only from the page with the Station Forge logo. Re-rendering photos is
          not permitted and will be taken down by our team. Renaming the Station
          Forge models, removing watermarks, or using other brand names for our
          models is not allowed. Taking precautions against piracy after
          pledging to this tier you must provide us with the links to the
          websites of your profile on where you are planning to sell our
          <span className="text-[#CCFF00]"> Read more</span>
        </p>
        {/* fivth div  also known as button */}
        <button
          className="w-full md:py-[1rem]  flex justify-center items-center sm:gap-[4vw] gap-[1vw] md:text-sm lg:text-xl neuem md:rounded-[3.7rem] sm:rounded-[5vw] transition duration-[0.2s] hover:bg-[#7e9426] bg-[#CCFF00] sm:text-[3.7vw] sm:h-[10vw] "
          onClick={() => {
            if (!uuid) {
              setpage_loader(true);
              router.push("/login?ref=subscription");
            } else if (!customer) {
              paynow();
            } else if (customer && currentplan == 1) {
              renew_subscription_to_merchant();
            } else if (
              (customer != "" && currentplan == 3) ||
              currentplan == 4
            ) {
              manage_merchant_subscriptions();
              // renew_subscription_to_merchant();
            }
          }}
        >
          {!customer && "Join"}
          {customer &&
            currentplan == 1 &&
            current_subscription_plain == "Public user" &&
            "Renew subscription"}
          {customer && currentplan == 4 && "Manage active subscription"}
          {customer && currentplan == 3 && "Upgrade subscription "}
          {/* {customer &&
            current_subscription_plain == "Standard tier" &&
            "Upgrade "} */}
          {merchant_isloading && (
            <div className="rounded-[100%] sm:h-[7vw] sm:border-t-[1vw] sm:w-[7vw] h-[2vw] w-[2vw]  border-solid  border-t-[0.3vw] border-[black] animate-spin"></div>
          )}
        </button>

        {/* {currentplan != 4 && (
          <button
            className="w-full h-[4.3vw] text-[1.6vw] sm:rounded-[5vw]  sm:text-[4vw] sm:h-[10vw] neuem rounded-[3.7vw] transition duration-[0.2s] hover:bg-opacity-[80%] bg-opacity-[100%] bg-[#000000] text-white "
            onClick={paynow}
          >
            Join
          </button>
        )} */}
      </div>{" "}
    </>
  );
};

export default Merchant_plan;
