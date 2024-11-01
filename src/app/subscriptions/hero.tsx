"use client";

import Image from "next/image";
import React from "react";
import hero_img from "../../../public/subscription/hero_sub.webp";
import Link from "next/link";
import mob_hero_img from "../../../public/subscription/mob_hero_sub.webp";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useProfile_Context } from "../utils/profile_context";

const Subscription_Hero = () => {
  const [page_path, setpage_path] = useState(1);
  //   use router
  const router = useRouter();

  const searchParams = usePathname();

  useEffect(() => {
    if (searchParams == "/about") {
      setpage_path(2);
    } else {
      setpage_path(1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { toggleDropdown, setpage_loader }: any = useProfile_Context();
  const pathname = usePathname();

  return (
    <>
      <div className="w-full  flex justify-center  h-auto px-[2%]  pt-[2%]">
        <Image
          src={hero_img}
          className="md:w-[100rem]  md:max-w-full  sm:hidden h-fit"
          alt="Subscription hero image"
        />
        <Image
          src={mob_hero_img}
          className="w-full hidden sm:block h-fit"
          alt="Subscription hero image"
        />
      </div>

      <div className="w-full  justify-center flex items-center pb-[4%] sm:pb-[8vw]  ">
        <div className="w-auto h-auto   md:gap-[2rem] lg:gap-[2.5rem] sm:gap-[5vw]  flex-col justify-center flex items-center pt-[3vw] sm:pt-[6vw]">
          {/* members and post numbers */}
          <div className="w-auto gap-0   relative h-auto flex justify-center items-center ">
            {" "}
            <span className="capitalize neuer text-[#F6F6F6]  bg-white bg-opacity-[8%] sm:px-0 sm:py-0 px-[2rem] py-[0.5rem] sm:w-[30vw] sm:rounded-[5vw] sm:h-[10vw] sm:text-[3vw] flex justify-center items-center border-[0.06vw] border-[#F6F6F6] rounded-[1.3rem]  text-lg  border-opacity-[80%] z-[20]">
              2370 Members
            </span>
            <div className="border-b-[0.2vw] sm:w-[7vw] sm:border-b-[0.6vw]  border-white border-opacity-[20%] w-[3rem] border-dotted z-[4]"></div>
            <span className="capitalize neuer text-[#F6F6F6]  bg-white bg-opacity-[8%] sm:px-0 sm:py-0 px-[2rem] py-[0.5rem] sm:w-[30vw] sm:rounded-[5vw] sm:h-[10vw] sm:text-[3vw] flex justify-center items-center  border-[0.06vw] border-[#F6F6F6] rounded-[1.3rem] text-lg border-opacity-[80%] z-[20]">
              230 Posts
            </span>
          </div>

          <p className="neuer sm:text-[3vw] text-lg capitalize text-white text-center">
            Creating 3D-Printable Tabletop Miniatures
          </p>

          <h3 className="neuem  md:w-fit md:px-[4rem] text-black bg-[#CCFF00] flex justify-center items-center text-2xl  rounded-[1rem] sm:rounded-[3vw] w-full sm:py-0 py-[0.5rem] sm:h-[10vw] sm:text-[3.2vw]">
            Become a member
          </h3>
          <div className="w-full flex justify-center items-start gap-[2.5rem] sm:text-[5vw] text-xl sm:gap-[4vw] sm:py-[1vw]">
            <i className="bi text-white  cursor-pointer hover:text-opacity-[90%] transition duration-[0.4s] bi-discord "></i>
            <i className="bi text-white  cursor-pointer hover:text-opacity-[90%] transition duration-[0.4s] bi-instagram "></i>
            <i className="bi text-white  cursor-pointer hover:text-opacity-[90%] transition duration-[0.4s] bi-upload "></i>
          </div>

          <div className="w-fit py-[0.7rem] sm:py-[2.2vw] sm:px-[5vw] px-[1.2rem] neuem bg-white rounded-[2rem] flex justify-center sm:rounded-[6vw] items-center gap-[0.5vw]">
            <Link
              href={"/subscriptions"}
              scroll={false}
              className={`md:text-base sm:text-[3.5vw] sm:rounded-[3.2vw] sm:py-[1vw] hover:text-[#CCFF00] transition duration-[0.6s] rounded-[1.5rem] sm:px-[2.5vw] ${
                page_path != 2 ? "text-white" : "text-black"
              }  py-[0.4rem] px-[1rem] ${page_path != 2 ? "bg-black" : ""} `}
              onClick={() => {
                if (pathname == "/subscriptions") {
                  setpage_loader(false);
                } else {
                  setpage_loader(false);
                  setTimeout(() => {
                    setpage_loader(true);
                  }, 500);
                }
              }}
            >
              Home
            </Link>
            <Link
              href={"/about"}
              scroll={false}
              className={`md:text-base sm:text-[3.5vw] sm:rounded-[3.2vw] sm:py-[1vw] hover:text-[#CCFF00] transition duration-[0.6s] rounded-[1.5rem] sm:px-[2.5vw]  py-[0.4rem] px-[1rem]  ${
                page_path == 2 ? "text-white" : "text-black"
              }  py-[0.4vw] px-[1vw] ${page_path == 2 ? "bg-black" : ""} `}
              onClick={() => {
                if (pathname == "/about") {
                  setpage_loader(false);
                } else {
                  setpage_loader(true);
                }
              }}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription_Hero;
