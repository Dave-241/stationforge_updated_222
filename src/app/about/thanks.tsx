"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import main from "../../../../public/about/pre_support.webp";
import step_1 from "../../../../public/about/step_1.webp";
import Link from "next/link";

const Thanks = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center sm:px-[3vw] px-[1rem] gap-[3rem] flex-col pt-[7rem]">
        <h2 className="text-center md:text-5xl sm:text-[5.4vw] text-[#CCFF00]  neuem  sm:leading-[8vw]">
          THANK YOU FOR SUPPORTING US{" "}
        </h2>
        <p className="text-white   text-opacity-[30%] md:text-3xl neuer text-center capitalize sm:text-[4vw]">
          Our Stats
        </p>

        <div className="w-[100rem] md:max-w-[80%] sm:w-full sm:h-[30vw] py-[4rem] sm:rounded-[2.5vw] rounded-[1.2rem] bg-[#111111] flex justify-between md:text-2xl px-[5.4rem] items-center">
          <div className="w-auto h-auto  flex flex-col items-start gap-[1.2rem]">
            <p className=" sm:text-[4vw] neuem  text-white">Total Members</p>
            <span className="text-opacity-[80%] sm:text-[3vw] text-white neuer md:text-base">
              2735
            </span>
          </div>
          {/* long vertical line */}
          <div className="h-[6rem] w-[0.1rem] sm:h-[15vw] sm:w-[0.4vw] bg-opacity-[23%] bg-[#D9D9D9]  "></div>
          <div className="w-auto h-auto  flex flex-col items-start gap-[1.2rem]">
            <p className=" sm:text-[4vw] neuem  text-white">Paid Members</p>
            <span className="text-opacity-[80%] sm:text-[3vw] text-white neuer md:text-base">
              2,372
            </span>
          </div>
          <div className="h-[6rem] w-[0.1rem] sm:h-[15vw] sm:w-[0.4vw] bg-opacity-[23%] bg-[#D9D9D9]  "></div>

          <div className="w-auto h-auto  flex flex-col items-start gap-[1.2rem]">
            <p className=" sm:text-[4vw] neuem  text-white">Posts</p>
            <span className="text-opacity-[80%] sm:text-[3vw] text-white neuer md:text-base">
              240
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Thanks;
