"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import searchimg from "../../../public/support/search_icon.png";
import Image from "next/image";
import Step_three from "./step3";

const Products_onboarding = () => {
  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();

  const [items, setitems] = useState([
    {
      img: "/onboarding/1.webp",
      txt: "Grimguard seargeant A",
      price: "343",
    },
    {
      img: "/onboarding/2.webp",
      txt: "Grimguard officer",
      price: "343",
    },
    {
      img: "/onboarding/3.webp",
      txt: "Grimguard priest",
      price: "343",
    },
    {
      img: "/onboarding/4.webp",
      txt: "Orkaz Strappaz Front",
      price: "343",
    },
    {
      img: "/onboarding/5.webp",
      txt: "Orkaz Strappaz Sideback",
      price: "343",
    },
    {
      img: "/onboarding/6.webp",
      txt: "Orkaz Strappaz Side",
      price: "343",
    },
    {
      img: "/onboarding/7.webp",
      txt: "Orkaz Strappaz Face",
      price: "343",
    },
    {
      img: "/onboarding/8.webp",
      txt: "Vaskar Orkaz Hunter Front",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
  ]);

  return (
    <>
      <div className="w-[68%]  h-auto pb-[1vw] border-r-[white] border-r-[0.1vw] border-opacity-[10%]  flex flex-col gap-[1vw]">
        <div className="w-full flex justify-between items-center px-[2vw]">
          <h3
            className="neuer text-[2.2vw] text-white "
            style={{ opacity: opacity }}
          >
            All New Models (August)
          </h3>
          <div
            className="w-auto relative z-[999999999]"
            style={{ opacity: step == 3 ? "" : opacity }}
          >
            <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
              <Image
                src={searchimg}
                alt="Search icon image"
                className="w-[1.3vw]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Search model"
              className="h-[3vw] w-[23vw] placeholder:text-white text-white neuer text-[1.1vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
            />

            <Step_three />
          </div>
        </div>
        <div
          className="h-[0.1vw] bg-white bg-opacity-[10%] w-full"
          style={{ opacity: opacity }}
        ></div>

        <div
          className="w-full flex flex-wrap justify-between px-[1.8vw] gap-[1.1vw]"
          style={{ opacity: opacity }}
        >
          {items.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className="w-[20vw]  border-white  border border-opacity-[30%] overflow-hidden h-auto flex flex-col gap-[1vw] rounded-[2vw]"
              >
                <div
                  className="w-full avater_bg h-[20vw]"
                  style={{ backgroundImage: `url(${e.img})` }}
                ></div>
                <div className="w-full px-[1vw] flex justify-between  items-center">
                  <p className="neuem text-[1.2vw] text-white">{e.txt}</p>

                  <span className="neuem text-[1.2vw] text-white text-opacity-[50%]">
                    ${e.price}
                  </span>
                </div>

                <div className="bg-[#CCFF00]  ml-[1vw] rounded-[1.2vw] py-[0.6vw] px-[1.6vw] neuer text-black w-fit h-fit mb-[2vw] text-[1vw]">
                  View
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products_onboarding;
