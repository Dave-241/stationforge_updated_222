"use client ";

import React from "react";
import bg_image from "../../../public/login/login.webp";
import Image from "next/image";
import About_hero_img from "../../../public/about/about_hero.webp";

const About_hero = () => {
  return (
    <>
      <div className="w-full pt-[2vw] relative h-auto gap-[2vw] z-[9] pb-[5vw]">
        <div className="w-full h-auto  flex justify-center items-center  flex-col z-[9] border2 gap-[3vw] px-[2vw] ">
          <div className="w-full h-atuo pb-[5vw] gap-[3vw] flex justify-center items-center  flex-col z-[9]">
            <p className="text-[3.2vw] neuem  text-white">StationForge</p>
            <Image
              src={About_hero_img}
              alt="about hero section image"
              className=" w-full h-fit z-[9]"
            />
          </div>

          {/* our goals section  */}
          <div className="w-full z-[9] text-center flex items-center flex-col gap-[1.5vw]">
            <h1 className="text-[#CCFF00] text-[3.2vw] capitalize neuem">
              Our Goals
            </h1>{" "}
            <div className=" border-[#767676] rounded-[1.3vw] border w-[60vw] h-[10.6vw] bg-[#111111] flex justify-center items-center">
              <p className="text-white text-[1.4vw] neuer ">
                StationForge is here to make quality tabletop miniatures in a
                variety of themes to help you expand <br />
                your creative side by providing many parts and models with
                possibilities to kitbash them into <br /> something of your own.
              </p>
            </div>
          </div>
        </div>
        <Image
          src={bg_image}
          alt="background image"
          className="absolute w-full h-full  top-0 left-0 z-[4]"
        />
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] bg-[#D9D9D9] "></div>
    </>
  );
};

export default About_hero;
