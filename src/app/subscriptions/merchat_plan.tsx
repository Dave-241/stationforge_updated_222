"use client ";

import React from "react";
import mer_1 from "../../../public/subscription/mer_1.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  pay_merchant_Subscriptions,
  pay_standard_Subscriptions,
} from "../utils/stripe";

const Merchant_plan = ({ currentplan, email, uuid }: any) => {
  const router = useRouter();

  const paynow = async () => {
    if (uuid != "" && email != "") {
      console.log("this is for payetn");
      const session_url = await pay_merchant_Subscriptions(uuid, email);
      try {
        if (session_url.url) {
          router.push(session_url.url);
        }
      } catch (error: any) {
        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
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
        {currentplan == 4 && (
          <button className="w-full h-[4.3vw] text-[1.6vw] sm:rounded-[5vw]  sm:text-[4vw] sm:h-[10vw] neuem rounded-[3.7vw] transition duration-[0.2s] hover:bg-opacity-[80%] bg-opacity-[100%] bg-[#000000] text-white ">
            Manage subscription
          </button>
        )}

        {currentplan != 4 && (
          <button
            className="w-full h-[4.3vw] text-[1.6vw] sm:rounded-[5vw]  sm:text-[4vw] sm:h-[10vw] neuem rounded-[3.7vw] transition duration-[0.2s] hover:bg-opacity-[80%] bg-opacity-[100%] bg-[#000000] text-white "
            onClick={paynow}
          >
            Join
          </button>
        )}
      </div>{" "}
    </>
  );
};

export default Merchant_plan;
