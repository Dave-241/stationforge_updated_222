"use client ";

import Image from "next/image";
import React, { useState } from "react";
import stan_1_old from "../../../public/subscription/stan_1.webp";
import stan_1 from "../../../public/subscription/mer_1.webp";

import stan_2 from "../../../public/subscription/stan_2.webp";
import stan_3 from "../../../public/subscription/stan_3.webp";
import stan_4 from "../../../public/subscription/stan_4.webp";
import stan_5 from "../../../public/subscription/stan_5.webp";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  manage_subscription,
  pay_standard_Subscriptions,
  renew_subscription,
  stripe,
} from "../utils/stripe";
import { useProfile_Context } from "../utils/profile_context";

const StandardPlan = ({
  currentplan,
  email,
  uuid,
  plan,
  customer,
  current_subscription_plain,
  standard_isloading,
  setstandard_isloading,
}: any) => {
  const { setpage_loader, Add_notification }: any = useProfile_Context();

  const [list, setlist] = useState([
    {
      img: stan_2,
      txt: "Early access to content",
    },
    {
      img: stan_3,
      txt: "Digital downloads",
    },
    {
      img: stan_4,
      txt: "20% OFF on all the previous months releases",
    },
    {
      img: stan_5,
      txt: "Discord access",
    },
  ]);

  const router = useRouter();

  function getNextMonthTimestamp() {
    const currentDate = new Date();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1, 1); // Set to 1st day of next month
    return Math.floor(nextMonth.getTime() / 1000); // Convert to Unix timestamp (in seconds)
  }

  const paynow = async () => {
    if (uuid != "" && email != "") {
      try {
        setstandard_isloading(true);
        Add_notification("Initiated standard subscription");

        // console.log("this was standard");
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);
        const stripe = await stripe_promise;
        const session_url = await pay_standard_Subscriptions(uuid, email);

        if (session_url.id) {
          const result = await stripe?.redirectToCheckout({
            sessionId: session_url.id,
          });
        }
      } catch (error: any) {
        setstandard_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setstandard_isloading(false);

      return;
    }
  };

  const manage_merchant_subscriptions = async () => {
    if (customer != "") {
      try {
        setstandard_isloading(true);

        const manage_session = await manage_subscription(customer);
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);

        const stripe = await stripe_promise;
        if (manage_session.url && stripe) {
          router.push(manage_session.url);
        }
      } catch (error: any) {
        setstandard_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setstandard_isloading(false);

      return;
    }
  };

  const renew_subscription_to_standard = async () => {
    if (customer != "") {
      try {
        setstandard_isloading(true);
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);
        const stripe = await stripe_promise;
        const session_url = await renew_subscription(
          customer,
          uuid,
          email,
          process.env.NEXT_PUBLIC_STANDARD_PRICE,
        );
        if (session_url.id) {
          const result = await stripe?.redirectToCheckout({
            sessionId: session_url.id,
          });
        }
      } catch (error: any) {
        setstandard_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setstandard_isloading(false);

      return;
    }
  };

  const [isExpanded, setIsExpanded] = useState(false); // For read more functionality
  const trimmed_text = plan.description.slice(0, 200);
  return (
    <>
      <div className="md:w-[40%] h-fit lg:w-[30%] sm:w-[80vw] sm:flex-shrink-0 sm:py-[10vw] md:h-auto md:py-[2rem] lg:py-[2rem] subscription_merchant_background_color  md:px-[1.2rem] sm:px-[6vw] flex flex-col justify-center items-center  bg-[#111111] md:rounded-[1.2rem] sm:border-l-[1.6vw] md:border-l-[0.5rem] md:gap-[2rem] sm:gap-[4vw] sm:rounded-[4vw]   border-[#CCFF00]">
        {/* first row div */}
        <div className="w-full flex justify-between items-center">
          <Image
            src={stan_1}
            className="md:w-[3rem] sm:w-[15vw] h-fit"
            alt="most popular image placeholder"
          />

          {/* <h3 className="neuer text-[1.2vw] sm:text-[3vw] sm:py-[2vw] sm:px-[4vw] sm:rounded-[4vw] text-black bg-white py-[0.7vw] px-[1.4vw] rounded-[2.7vw]">
            Most popular{" "}
          </h3> */}
        </div>
        {/* second row div */}
        <div className="w-full flex   flex-col gap-[0.4vw] sm:gap-[1vw] ">
          <h2 className="md:text-3xl text-black neuem sm:text-[6vw]">
            {plan.name}
          </h2>
          {/* <h3 className="text-white neuer text-opacity-[40%] sm:text-[2.7vw] text-[1vw]">
            Access to monthly releases <br className="sm:hidden" />
            (files <br className="sm:block hidden" /> are pre-supported)
          </h3> */}
        </div>

        {/* thired div  */}
        <div className="w-full">
          <h3 className="text-black md:text-3xl neuem sm:text-[4vw] ">
            ${plan.monthly_price}{" "}
            <span className="text-opacity-[60%] text-black md:text-xl sm:text-[3vw]">
              /Month
            </span>
          </h3>
        </div>

        <div className="flex flex-col">
          <div
            style={{ color: "black" }}
            className={` neuer md:container   text-black bg-transparent text-dark-blue dark:text-black 
            [&_p]:text-sm  [&_p]:text-[black] [&_p_md]:text-sm  [&_p]:leading-relaxed 
            [&_h1]:text-3xl [&_h1]:w-full [&_h1]:font-bold [&_h1]:mb-2 
            [&_h2]:text-2xl [&_h2]:w-full [&_h2_md]:text-3xl [&_h2_lg]:text-4xl [&_h2]:font-bold [&_h2]:mb-4 
            [&_h3]:text-xl [&_h3]:w-full [&_h3_md]:text-2xl [&_h3_lg]:text-3xl [&_h3]:font-bold [&_h3]:mb-4 
            [&_h4]:text-lg [&_h4]:w-full [&_h4_md]:text-xl [&_h4_lg]:text-2xl [&_h4]:font-bold [&_h4]:mb-4 
            [&_h5]:text-base [&_h5]:w-full [&_h5_md]:text-lg [&_h5_lg]:text-xl [&_h5]:font-bold [&_h5]:mb-4 
            [&_h6]:text-sm [&_h6]:w-full [&_h6_md]:text-base [&_h6_lg]:text-lg [&_h6]:font-bold [&_h6]:mb-4 
            [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-5
            [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-5
            [&_li]:mb-3
            [&_table]:w-full [&_table]:border-collapse [&_table]:border 
            [&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-black [&_th]:text-left 
            [&_td]:border [&_td]:px-4 [&_td]:py-2
            [&_img]:inline [&_img]:m-2
            [&_a]:underline [&_a]:underline-offset-[5px] [&_a]:text-[#440C0C]
            `}
            // dangerouslySetInnerHTML={{ __html: plan.description }}
            dangerouslySetInnerHTML={{
              __html: isExpanded ? plan.description : trimmed_text,
            }}
          ></div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#CCFF00] mt-[1rem] text-sm text-left underline "
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

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
              renew_subscription_to_standard();
            } else if (
              (customer != "" && currentplan == 3) ||
              currentplan == 4
            ) {
              manage_merchant_subscriptions();
            }
          }}
        >
          {!customer && "Join"}
          {customer &&
            currentplan == 1 &&
            current_subscription_plain == "Public user" &&
            "Renew subscription"}
          {customer && currentplan == 3 && "Manage active subscription "}
          {customer && currentplan == 4 && "Downgrade subscription "}

          {standard_isloading && (
            <div className="rounded-[100%] sm:h-[7vw] sm:border-t-[1vw] sm:w-[7vw] md:h-[2rem] md:w-[2rem]  border-solid  md:border-t-[0.3rem] border-[black] animate-spin"></div>
          )}
        </button>
      </div>{" "}
    </>
  );
};

export default StandardPlan;
