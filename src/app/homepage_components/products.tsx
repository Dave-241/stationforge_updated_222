"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import searchimg from "../../../public/support/search_icon.png";
import Image from "next/image";
import Banner from "./banner";
import { useRouter } from "next/navigation";
import { useProfile_Context } from "../utils/profile_context";
import Link from "next/link";
import Mob_Banner from "./mob_banner";
import mob_filter from "../../../public/home/mob_filter.webp";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const Products = (props: any) => {
  const route = useRouter();
  const {
    products,
    setsearch_text,
    is_network_err,
    search_text,
    setmobile_faction_active,
    product_is_loading,
  } = props;
  const [opacity, setopacity] = useState(0.5);
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[date.getMonth()];

  return (
    <>
      <div className="w-[68%] sm:w-full sm:border-none h-auto pb-[1rem] pt-[2rem]  border-r-[white] border-r-[0.1vw]  border-l-[white] border-l-[0.13rem] border-opacity-[10%]  flex flex-col gap-[1rem] sm:gap-[8vw]">
        <div className="w-full lg:flex-row md:flex-col flex justify-between  lg:items-center md:gap-[1rem] lg:gap-0 px-[3%]">
          <h3 className="neuer text-2xl text-white  ">
            All New Models <br className="md:hidden " /> ({currentMonthName})
          </h3>
          <div className="w-auto  relative sm:hidden z-[999]">
            <div className="absolute h-full  w-[3.2rem] pr-[0.3rem] flex justify-end items-center top-0 left-0 z-[13]">
              <Image
                src={searchimg}
                unoptimized
                width="0"
                height="0"
                alt="Search icon image"
                className="w-[1.3rem]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Search model"
              onChange={(e) => {
                setsearch_text(e.target.value);
              }}
              value={search_text || ""}
              className="h-[3rem] w-[23rem] placeholder:text-white text-white neuer  outline-none focus:border transition duration-[0.8s] pl-[3.5rem] pr-[1rem]  rounded-[3vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
            />
          </div>

          {/* now this is for the search filter  */}
          <div
            className="text-[white] text-opacity-[90%] hidden justify-center items-center sm:flex w-[38vw] gap-[2vw] text-[3vw] h-[10vw] bg-[#181515] rounded-[5vw] "
            onClick={() => {
              setmobile_faction_active(true);
            }}
          >
            <p className={`${inter.className}`}>Select categories</p>
            <Image
              src={mob_filter}
              alt="filter icon"
              className="w-[3vw] h-fit opacity-[90%]"
            />
          </div>
        </div>

        {/* this is for the mobile input  */}

        <div className="w-auto sm:block hidden relative z-[999999999]">
          <div className="absolute h-full   w-[12vw]  flex justify-center items-center top-0 left-0 z-[13]">
            <Image
              src={searchimg}
              unoptimized
              width="0"
              height="0"
              alt="Search icon image"
              className="w-[5vw]   h-fit"
            />
          </div>
          <input
            type="text"
            placeholder="Search model"
            onChange={(e) => {
              setsearch_text(e.target.value);
            }}
            value={search_text || ""}
            className="h-[12vw] w-full  sm:block hidden placeholder:text-white text-white neuer text-[3.5vw] outline-none focus:border transition duration-[0.8s] pl-[12vw] pr-[1vw]  rounded-[7vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
          />
        </div>
        <div className="h-[0.1rem] bg-white  bg-opacity-[10%] w-full sm:hidden"></div>

        <div className="w-full  flex flex-wrap justify-start px-[1.8vw] sm:px-0 gap-[1.7rem] sm:gap-[3vw] ">
          {is_network_err && (
            <div className="w-full py-[10rem]  flex justify-center items-center text-[white] neuer text-opacity-[70%] ">
              Something went wrong, Kindly refresh this page
            </div>
          )}
          {products.length == 0 && !product_is_loading && (
            <div className=" w-full py-[10rem] flex justify-center items-center ">
              <p className="text-white  neuer text-opacity-[70%]">
                No product to show
              </p>
            </div>
          )}

          <div className=" w-full flex-wrap md:justify-start gap-[1.5%] justify-between flex">
            {products.map((e: any, index: any) => {
              return (
                <>
                  <div
                    key={index}
                    className="lg:w-[32%] xl:w-[18%] mb-[1rem] md:mb-[1.2rem] w-[48.5%] group    gap-[1.2rem] sm:rounded-[4vw]  border-white  border border-opacity-[30%] overflow-hidden hover:scale-[1.008] transition duration-[0.6s] h-auto flex flex-col  rounded-[2rem]"
                  >
                    <div
                      className="w-full  avater_bg h-[11rem] md:h-[15rem] lg:h-[20rem] overflow-hidden"
                      style={{ backgroundImage: "url(/cover.webp)" }}
                    >
                      <Image
                        src={e.cover_png}
                        alt={e.title}
                        unoptimized
                        width="0"
                        height="0"
                        className="w-full h-full object-cover group-hover:scale-[1.05] duration-[0.5s] transition"
                      />
                    </div>
                    <div className="w-full flex-col px-[1rem] flex md:gap-[1.2rem] gap-[1rem] pb-[1.4rem]">
                      <p className="neuem md:text-base text-sm text-white capitalize">
                        {e.title}
                      </p>
                      <div className="w-full items-center gap-[1rem] md:gap-[1rem] flex justify-between">
                        <Link
                          href={`/product-showcase?product_id=${e.id}&faction=${e.factions}`}
                          onClick={() => {
                            setpage_loader(true);
                            // route.push(``);
                          }}
                          className="bg-[#CCFF00] md:text-sm text-xs hover:bg-opacity-[70%]  sm:py-[1.2vw] sm:px-[5vw] sm:rounded-[3vw]   rounded-[1.2rem] py-[0.6rem] px-[3rem] neuer text-black w-fit h-fit text-[1vw]"
                        >
                          View
                        </Link>

                        <p className="text-white text-xs neuer text-opacity-[40%]">
                          <i className="bi bi-award-fill"></i> {e.name}
                        </p>
                      </div>{" "}
                    </div>
                  </div>
                  {index === 8 && (
                    <div className="w-full h-auto  sm:hidden">
                      <Banner />
                    </div>
                  )}
                  {index === 7 && (
                    <div className="w-full h-auto hidden sm:my-[2.5vw] sm:block">
                      <Mob_Banner />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
