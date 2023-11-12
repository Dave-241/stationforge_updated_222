"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Step_one = () => {
  const { step, setstep }: any = useOnboarding_Context();
  return (
    <>
      <div
        className={`w-auto h-auto absolute bottom-[-15vw] flex justify-center z-[9999990]  right-[4.1vw] flex-col items-center transition duration-[1s]  `}
        style={{ opacity: step != 1 ? 0 : 1 }}
      >
        <i className="bi  translate-y-[2vw] h-fit bi-caret-up-fill text-transparent  text-[3vw]  "></i>
        <div className="w-[22vw] h-[14vw] bg-transparent    rounded-[1.5vw] relative flex justify-center items-center flex-col gap-[1.2vw] px-[1vw]">
          <p className="text-[#CCFF00] text-[1vw] neuem  absolute top-[0.5vw] right-[1vw]">
            1 / 4
          </p>
          <h1 className="neuem text-[1.1vw] font-[600] text-center text-black">
            See Models you have added to forge here
          </h1>
          <p className="neuer text-[1vw] text-center ">
            When you add a forge to your forge it appears here foe easy tracking
            and downloads
          </p>

          <button
            className="neuem w-full rounded-[1vw] py-[0.8vw] text-[1.1vw] hover:bg-opacity-[30%] transition duration-[0.6s] cursor-pointer bg-[#CCFF00] border-none outline-none "
            onClick={() => {
              setstep(2);
            }}
          >
            Next
          </button>
        </div>
      </div>
      {/* animtion that swings around  */}
      <div
        className={`w-auto   h-auto absolute bottom-[-15vw] flex justify-center z-[9999]  right-[4.1vw] flex-col items-center transition duration-[10s] ${
          step == 2 && "animate_next_1"
        } ${step == 3 && "animate_next_2"} ${step == 4 && "animate_next_3"}  `}
      >
        <i
          className="bi  translate-y-[2vw] h-fit bi-caret-up-fill text-white text-[3vw]  "
          style={{
            opacity: step != 1 ? 0 : 1,
            transition: "1s ease",
            display: step != 1 ? "none" : "block",
          }}
        ></i>
        <div className="w-[22vw] border-[#CCFF00] border-[0.1vw]  h-[14vw]  bg-white  rounded-[1.5vw]  flex justify-center items-center flex-col gap-[1.2vw] px-[1vw]">
          <h1 className="neuem text-[1.1vw] text-center text-black"></h1>
          <p className="neuer text-[1vw] text-center "></p>

          <button
            className="neuem w-full rounded-[1vw] py-[0.8vw] text-[1.1vw] hover:bg-opacity-[30%] transition duration-[0.6s] cursor-pointer border-none outline-none "
            onClick={() => {
              setstep(2);
            }}
          ></button>
        </div>
        <i
          className="bi  translate-y-[-2vw] h-fit bi-caret-down-fill text-white  text-[3vw]  "
          style={{
            opacity: step != 1 ? 1 : 0,
            transition: "1s ease",
            display: step != 1 ? "block" : "none",
            transform: `translateY(${step != 1 ? "-2vw" : "-5vw"})`,
          }}
        ></i>
      </div>
    </>
  );
};

export default Step_one;
