"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import main from "../../../../public/about/pre_support.webp";
import step_1 from "../../../../public/about/step_1.webp";
import Link from "next/link";

const Terms = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center px-[2vw] gap-[3rem] flex-col pt-[7rem] sm:pt-[15vw] sm:px-[4vw]">
        <h2 className="text-center md:text-5xl sm:text-[7vw] text-[#CCFF00]  neuem ">
          Terms an Conditions
        </h2>
        <p className="text-white md:w-[60rem] md:max-w-[90%] pt-[1rem] sm:pt-[6vw] pb-[7rem] text-opacity-[30%] md:text-xl neuer text-center capitalize sm:text-[3.5vw]">
          StationForge owns all of the provided files. Using the{" "}
          <br className="sm:block hidden " /> content is only allowed for
          personal use. <br className="sm:block hidden " /> These files may not
          be sold, shared, distributed, rented, transferred, copied, reproduced,
          or republished in any way. You may not sell, share, distribute, rent,
          or transmit the prints you make under any circumstances, nor may{" "}
          <br className="sm:block hidden " />
          you recast them. <br className="sm:block hidden " /> Files may be
          resized or cut for personal use but not sold, shared, distributed,
          rented, transferred, copied, reproduced, or republished. Furthermore,
          you may not alter, duplicate, disassemble, reverse compile, reverse
          engineer, or create derivative works of the fil
        </p>
      </div>
      <div className="w-full h-[0.1rem] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[95vw] sm:mx-auto bg-[#D9D9D9] sm:mt-[5vw]"></div>{" "}
    </>
  );
};

export default Terms;
