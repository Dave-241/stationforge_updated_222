"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import main from "../../../../public/about/pre_support.webp";
import step_1 from "../../../../public/about/step_1.webp";
import Link from "next/link";

const Terms = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center px-[2vw] gap-[3vw] flex-col pt-[7vw]">
        <h2 className="text-center text-[3.2vw] text-[#CCFF00]  neuem leading-[3.3vw]">
          Terms an Conditions
        </h2>
        <p className="text-white pt-[3vw] pb-[7vw] text-opacity-[30%] text-[1.2vw] neuer text-center capitalize">
          StationForge owns all of the provided files. Using the content is only
          allowed for personal use. <br />
          These files may not be sold, shared, distributed, rented, transferred,
          copied, reproduced, or republished in any way. You may not sell,
          share, distribute, rent, or <br /> transmit the prints you make under
          any circumstances, nor may you recast them. <br />
          Files may be resized or cut for personal use but not sold, shared,
          distributed, rented, transferred, copied, reproduced, or republished.
          Furthermore, you may <br /> not alter, duplicate, disassemble, reverse
          compile, reverse engineer, or create derivative works of the fil
        </p>
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] bg-[#D9D9D9] "></div>
    </>
  );
};

export default Terms;
