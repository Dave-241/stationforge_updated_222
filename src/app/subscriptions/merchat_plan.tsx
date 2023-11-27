"use client ";

import React, { useState } from "react";
import mer_1 from "../../../public/subscription/mer_1.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  manage_subscription,
  pay_merchant_Subscriptions,
  pay_standard_Subscriptions,
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
  const { setpage_loader }: any = useProfile_Context();
  const paynow = async () => {
    if (uuid != "" && email != "") {
      const session_url = await pay_merchant_Subscriptions(uuid, email);
      try {
        setmerchant_isloading(true);
        if (session_url.url) {
          router.push(session_url.url);
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

        const manage_session = await manage_subscription(customer);
        if (manage_session.url) {
          router.push(manage_session.url);
          console.log(manage_session.url);
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
  const update_subscription_to_merchant = async () => {
    if (customer != "") {
      try {
        setmerchant_isloading(true);

        const subscriptions = await stripe.subscriptions.list({
          customer: customer,
        });

        const sub_id = subscriptions.data[0].id;
        const item_id = subscriptions.data[0].items.data[0].id;

        const subscription_update: any = await stripe.subscriptions.update(
          sub_id,
          {
            items: [
              {
                id: item_id,
                price: process.env.NEXT_PUBLIC_MERCHANT_PRICE,
              },
            ],
          },
        );

        console.log(subscriptions);
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
  return (
    <>
      <div className="w-[29vw] sm:w-[80vw] sm:h-[130vw] sm:border-l-[1.6vw]  sm:gap-[4vw] sm:px-[6vw] sm:rounded-[4vw]   h-[50vw] pt-[2vw] pb-[2vw] px-[1.2vw] flex flex-col justify-center items-center  subscription_merchant_background_color rounded-[1.2vw] border-l-[0.5vw] gap-[2vw]  border-[#CCFF00]">
        {/* first row div */}
        <div className="w-full flex justify-between items-center">
          <Image
            src={mer_1}
            className="w-[3vw]  sm:w-[15vw] h-fit"
            alt="most popular image placeholder"
          />
        </div>
        {/* second row div */}
        <div className="w-full flex  flex-col gap-[0.2vw]  ">
          <h2 className="text-[2.1vw] text-black neuem sm:text-[6vw]">
            Merchant Tier
          </h2>
          <h3 className="text-[#000000] sm:text-[2.6vw] neuer text-opacity-[60%] text-[0.9vw]">
            The merchant tier2 is a second wave of merchants that gives you
            commercial license to 3D prints and sell station forge models in
            physical forms only as long as subscribed this tier is only limited
            to 50 individuals as was the previous tier
          </h3>
        </div>
        {/* thired div  */}
        <div className="w-full">
          <h3 className="text-black text-[2.3vw] neuem sm:text-[4vw] ">
            $50{" "}
            <span className="text-opacity-[60%] text-black text-[1.2vw] sm:text-[3vw]">
              /Month
            </span>
          </h3>
        </div>
        {/* fourthe div */}
        <p className="text-[1vw] neuer sm:text-[2.9vw]">
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
          className="w-full flex justify-center items-center sm:gap-[4vw] gap-[1vw] h-[4vw] text-[1.6vw] neuem rounded-[3.7vw] sm:rounded-[5vw] transition duration-[0.2s] hover:bg-[#7e9426] bg-[#CCFF00] sm:text-[4vw] sm:h-[10vw] "
          onClick={() => {
            if (!uuid) {
              setpage_loader(true);
              router.push("/login?ref=subscription");
            } else if (!customer) {
              paynow();
            } else if (currentplan == 3) {
              update_subscription_to_merchant();
            } else if (
              (customer != "" && currentplan == 1) ||
              currentplan == 4
            ) {
              manage_merchant_subscriptions();
            }
          }}
        >
          {!customer && "Join"}
          {customer &&
            currentplan == 1 &&
            current_subscription_plain == " Merchant tier" &&
            "Renew subscription"}
          {customer && currentplan == 4 && "Manage subscription"}
          {customer &&
            current_subscription_plain == "Standard tier" &&
            "Upgrade "}
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
