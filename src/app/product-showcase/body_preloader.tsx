"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import img from "../../../public/subscription/post_1.webp";
import prev_img from "../../../public/showcase/prev.webp";
import next_img from "../../../public/showcase/next.webp";
const Showcase_preloader = (props: any) => {
  const [items, setitems] = useState(["", "", "", ""]);

  return (
    <>
      <main className="w-full h-auto  px-[8.5vw]  flex justify-between items-start">
        {/* for the images side  */}
        <div className="w-[39vw] overflow-hidden  border-[white] border-[0.15vw] border-opacity-[31%] rounded-[2vw] flex flex-col h-[57vw]">
          {/* main image */}
          <div className="w-full h-[68%] animate-pulse bg-[#2a2828] overflow-hidden"></div>
          <div
            className={`w-full h-[32%]  flex justify-around items-center relative overflow-hidden  `}
          >
            <div className="absolute flex h-full w-auto  items-center gap-[2vw] px-[2vw]  top-0 left-0 ">
              {items.map((e: any, index: any) => {
                return (
                  <>
                    <div
                      className="w-[10vw] h-[10vw] animate-pulse bg-[#2a2828] "
                      key={index}
                    >
                      {" "}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        {/* for the text and description side */}
        <div className="w-[36vw] flex flex-col text-white items-start justify-center gap-[3vw]  h-auto pt-[4vw]">
          <h1 className="neuem text-[2.5vw] w-[80%] h-[3vw] animate-pulse bg-[#2a2828] rounded-[3.2vw]"></h1>

          <button className="bg-[#CCFF00] animate-pulse text-black neuer text-[1.1vw] rounded-[3.2vw] py-[1.4vw] px-[6vw]"></button>

          <div className="w-full flex flex-col justify-center gap-[1.7vw] ">
            <h3 className="text-[1.3vw] neuer animate-pulse bg-[#2a2828] w-[50%] h-[2vw] rounded-[3.2vw]"></h3>

            <p className="text-[1.2vw] neuer w-full h-[20vw] animate-pulse bg-[#2a2828] rounded-[2vw]"></p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Showcase_preloader;
