"use client ";

import React from "react";
import bg_image from "../../../public/login/login.webp";
import Image from "next/image";
import StandardPlan from "./standard_plan";
import mob_bg from "../../../public/subscription/mob_bg_sub.webp";
import Merchant_plan from "./merchat_plan";

const Subscription_Plans = () => {
  return (
    <>
      <div className="w-full h-auto justify-center flex flex-col items-center sm:pb[6vw] pb-[3vw] relative">
        <div className="w-auto py-[2vw] sm:rounded-[2.6vw] sm:py-[5vw] sm:px-[5vw] px-[4vw] rounded-[0.8vw] border-[0.15vw]  border-opacity-[40%] border-white flex flex-col gap-[0.7vw] z-[9] bg-black">
          <h1 className="text-[2.4vw] sm:text-[5vw] neuem text-white text-center">
            choose a plan
          </h1>
          <h2 className="text-white sm:text-[3vw] text-[1.3vw] text-center neuem text-opacity-[30%]">
            We have a two part selection subscription plan <br /> that gives you
            the best fit for for you
          </h2>
        </div>
        <div className="w-full  justify-center flex flex-col items-center z-[9]  sm:pt-[7vw] pt-[3vw]">
          <p className="text-[3.2vw] neuem text-white sm:text-[6vw]">
            StationForge
          </p>

          {/* this is where the pricing would be  */}
          <div className="h-auto sm:h-[140vw] cover_scrollbar w-full sm:relative sm:overflow-x-scroll ">
            <div className="w-auto sm:px-[4vw] pt-[3vw] sm:top-0 sm:left-0  sm:absolute justify-center items-center flex gap-[3vw] sm:gap-[5vw]">
              <StandardPlan />
              <Merchant_plan />
            </div>
          </div>
        </div>
        <Image
          src={bg_image}
          alt="background image"
          className="absolute w-full h-full sm:hidden top-0 left-0 z-[5]"
        />
        <Image
          src={mob_bg}
          alt="background image"
          className="absolute w-full h-full hidden sm:block  top-0 left-0 z-[5]"
        />
      </div>
    </>
  );
};

export default Subscription_Plans;
