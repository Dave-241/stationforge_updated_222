"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import main from "../../../public/about/pre_support.webp";
import ben_1 from "../../../public/about/ben_1.webp";
import ben_2 from "../../../public/about/ben_2.webp";
import Link from "next/link";

const Pre_support = () => {
  const [welcome_items, setwelcome_items] = useState([
    {
      img: ben_1,
      head: "Benefit 1",
      txt: "Mini Swap Collabs with other  ",
      t2: "Patreon creators",
    },

    {
      img: ben_2,
      head: "Benefit 2",
      txt: "20% discount codes for my mini  ",
      t2: "factory ",
    },
  ]);

  const [community_icons, setcommunity_icons] = useState([
    {
      link: "/",
      bi: "facebook",
    },
    {
      link: "/",
      bi: "discord",
    },
    {
      link: "/",
      bi: "instagram",
    },
  ]);
  return (
    <>
      <div className="w-full flex justify-center items-center px-[2.5vw] gap-[3vw] flex-col pt-[4vw]">
        <h2 className="text-center text-[3.2vw] text-[#CCFF00]  neuem leading-[3.3vw]">
          Pre Support
        </h2>
        <p className="text-white  text-opacity-[40%] text-[1.2vw] neuer text-center capitalize">
          ll of our models are fully supported by professionals on our team. If
          you{"'"}re <br /> having trouble, join our{" "}
          <Link
            href={"https://discord.com/invite/EMVhj7hS8B"}
            className="underline underline-offset-4"
          >
            {" "}
            Discord
          </Link>{" "}
          for assistance support.
        </p>

        <div className="w-full h-auto mb-[2vw]">
          <Image
            src={main}
            alt="preload support main display image"
            className="w-full h-fit"
          />
        </div>

        <h2 className="text-white  text-opacity-[40%] text-[1.7vw] neuer text-center">
          Extra benefits
        </h2>

        {/* display the items */}
        <div className="w-full flex justify-center h-auto pb-[3vw] pt-[0.4vw]">
          <div className="w-[65vw] h-auto flex gap-[2.7vw] justify-center">
            {welcome_items.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className=" w-full h-auto py-[2vw] px-[2vw] flex flex-col bg-[#111111] rounded-[2vw] gap-[3vw] items-start justify-center "
                >
                  <div className="w-full h-auto   overflow-hidden rounded-[3vw]">
                    <p className="neuem text-[1.5vw] text-white capitalize ">
                      {e.head}
                    </p>
                  </div>
                  <div className="w-full h-auto flex items-center justify-start gap-[1vw]">
                    <Image
                      src={e.img}
                      alt={e.txt}
                      className="w-[2.5vw] h-fit"
                    />
                    <p className="text-[1.3vw] text-opacity-[80%] text-white neuer  leading-[2vw]">
                      {e.txt} <br /> {e.t2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="text-center text-[2.4vw] text-[#CCFF00]  neuem  ">
          Let{"'"}s Chat! Join our community here
        </h3>

        <div className="w-full flex justify-center gap-[2vw] items-center pb-[5vw]">
          {community_icons.map((e: any, index: any) => {
            return (
              <div
                className=" h-[3.7vw] w-[3.7vw] text-white border-opacity-[80%] cursor-pointer hover:border-opacity-[100%] hover:opacity-[100%] transition duration-[0.6vw] opacity-[80%] text-[1.7vw] font-[700] rounded-[100%] flex justify-center items-center  border-white border-[0.07vw]"
                key={index}
              >
                <i className={`bi bi-${e.bi} w-fit h-fit`}></i>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] bg-[#D9D9D9] "></div>
    </>
  );
};

export default Pre_support;
