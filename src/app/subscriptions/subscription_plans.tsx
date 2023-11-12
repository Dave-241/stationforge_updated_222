"use client ";

import React from "react";
import bg_image from "../../../public/login/login.webp";
import Image from "next/image";
import StandardPlan from "./standard_plan";
import Merchant_plan from "./merchat_plan";

const Subscription_Plans = () => {
  return (
    <>
      <div className="w-full h-auto justify-center flex flex-col items-center pb-[3vw] relative">
        <div className="w-auto py-[2vw] px-[4vw] rounded-[0.8vw] border-[0.15vw]  border-opacity-[40%] border-white flex flex-col gap-[0.7vw] z-[9] bg-black">
          <h1 className="text-[2.4vw] neuem text-white text-center">
            choose a plan
          </h1>
          <h2 className="text-white text-[1.3vw] text-center neuem text-opacity-[30%]">
            We have a two part selection subscription plan <br /> that gives you
            the best fit for for you
          </h2>
        </div>
        <div className="w-full  justify-center flex flex-col items-center z-[9]  pt-[3vw]">
          <p className="text-[3.2vw] neuem text-white">StationForge</p>

          {/* this is where the pricing would be  */}
          <div className="w-full pt-[3vw] justify-center items-center flex gap-[3vw]">
            <StandardPlan />
            <Merchant_plan />
          </div>
        </div>
        <Image
          src={bg_image}
          alt="background image"
          className="absolute w-full h-full  top-0 left-0 z-[5]"
        />
      </div>
    </>
  );
};

export default Subscription_Plans;
