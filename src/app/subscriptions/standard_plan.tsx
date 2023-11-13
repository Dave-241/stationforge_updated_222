"use client ";

import Image from "next/image";
import React, { useState } from "react";
import stan_1 from "../../../public/subscription/stan_1.webp";
import stan_2 from "../../../public/subscription/stan_2.webp";
import stan_3 from "../../../public/subscription/stan_3.webp";
import stan_4 from "../../../public/subscription/stan_4.webp";
import stan_5 from "../../../public/subscription/stan_5.webp";

const StandardPlan = () => {
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
  return (
    <>
      <div className="w-[29vw] sm:w-[80vw] sm:h-[120vw]  h-[50vw] pt-[2vw] pb-[2vw] px-[1.2vw] sm:px-[6vw] flex flex-col justify-center items-center  bg-[#111111] rounded-[1.2vw] sm:border-l-[1.6vw] border-l-[0.5vw] gap-[2vw] sm:gap-[4vw] sm:rounded-[3.5vw]   border-[#4C89E5]">
        {/* first row div */}
        <div className="w-full flex justify-between items-center">
          <Image
            src={stan_1}
            className="w-[3vw] sm:w-[15vw] h-fit"
            alt="most popular image placeholder"
          />

          <h3 className="neuer text-[1.2vw] sm:text-[3vw] sm:py-[2vw] sm:px-[4vw] sm:rounded-[4vw] text-black bg-white py-[0.7vw] px-[1.4vw] rounded-[2.7vw]">
            Most popular{" "}
          </h3>
        </div>
        {/* second row div */}
        <div className="w-full flex   flex-col gap-[0.4vw] sm:gap-[1vw] pb-[1vw] ">
          <h2 className="text-[2.1vw] text-white neuem sm:text-[6vw]">
            Standard Tier
          </h2>
          <h3 className="text-white neuer text-opacity-[40%] sm:text-[2.7vw] text-[1vw]">
            Access to monthly releases <br className="sm:hidden" />
            (files <br className="sm:block hidden" /> are pre-supported)
          </h3>
        </div>

        {/* thired div  */}
        <div className="w-full">
          <h3 className="text-white text-[2.3vw] neuem sm:text-[4vw]">
            $10{" "}
            <span className="text-opacity-[40%] text-white text-[1.2vw] sm:text-[3vw]">
              /Month
            </span>
          </h3>
        </div>

        {/* fourth div */}
        <ul className="w-full h-auto flex-col flex gap-[1vw] pb-[1.5vw]">
          {list.map((e: any, index: any) => {
            return (
              <li key={index} className="flex gap-[1.2vw] items-center">
                <Image
                  src={e.img}
                  alt={e.txt}
                  className="w-[3vw] sm:w-[10vw] h-fit"
                />
                <p className="text-[1vw] text-white neuer sm:text-[3vw]">
                  {e.txt}
                </p>
              </li>
            );
          })}
        </ul>

        {/* fivth div  also known as button */}
        <button className="w-full h-[4vw] text-[1.6vw] neuem rounded-[3.7vw] sm:rounded-[5vw] transition duration-[0.2s] hover:bg-[#7e9426] bg-[#CCFF00] sm:text-[3.2vw] sm:h-[8vw] ">
          Join
        </button>
      </div>{" "}
    </>
  );
};

export default StandardPlan;
