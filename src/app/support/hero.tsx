"use client";

import Image from "next/image";
import React, { useState } from "react";
import Hero_img from "../../../public/support/hero.webp";
import search_img from "../../../public/support/search_icon.png";

const Support_hero = () => {
  return (
    <>
      <div className="w-full h-[30vw]  mt-[2vw] px-[2vw] flex justify-center items-center">
        <div className="w-full h-full relative overflow-hidden flex justify-center items-center  rounded-[1.5vw]">
          <div className="w-auto relative z-[10]">
            <div className="absolute h-full  w-[5vw] pr-[0.5vw] flex justify-end items-center top-0 left-0 z-[13]">
              <Image
                src={search_img}
                alt="Search icon image"
                className="w-[1.8vw]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Hello, how can we help you"
              className="h-[4vw] text-white neuem text-[1.3vw] outline-none focus:border transition duration-[0.8s] pl-[5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] w-[35vw]"
            />
          </div>
          <Image
            src={Hero_img}
            alt="support page hero image"
            className="absolute top-0 left-0 w-full h-fit z-[1]"
          />
        </div>
      </div>
    </>
  );
};

export default Support_hero;
