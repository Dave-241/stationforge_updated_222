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

const Products = (props: any) => {
  const route = useRouter();
  const { products, setsearch_text, search_text } = props;
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
      <div className="w-[68%] sm:w-full sm:border-none h-auto pb-[1vw] pt-[2vw]  border-r-[white] border-r-[0.1vw]  border-l-[white] border-l-[0.13vw] border-opacity-[10%]  flex flex-col gap-[1vw]">
        <div className="w-full flex justify-between items-center px-[2vw]">
          <h3 className="neuer text-[2.2vw] text-white ">
            All New Models ({currentMonthName})
          </h3>
          <div className="w-auto relative z-[999999999]">
            <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
              <Image
                src={searchimg}
                unoptimized
                width="0"
                height="0"
                alt="Search icon image"
                className="w-[1.3vw]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Search model"
              onChange={(e) => {
                setsearch_text(e.target.value);
              }}
              value={search_text || ""}
              className="h-[3vw] w-[23vw] placeholder:text-white text-white neuer text-[1.1vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
            />
          </div>
        </div>
        <div className="h-[0.1vw] bg-white  bg-opacity-[10%] w-full"></div>

        <div className="w-full  flex flex-wrap justify-start px-[1.8vw] sm:px-0 gap-[1.7vw] sm:gap-[3vw] ">
          {products.map((e: any, index: any) => {
            // if (index == 9 ) {

            // }
            return (
              <>
                <Link
                  href={`/product-showcase?product_id=${e.id}`}
                  key={index}
                  //   scroll={true}
                  className="w-[19.6vw] sm:w-[45.5vw]  sm:gap-[3vw] sm:rounded-[4vw]  border-white  border border-opacity-[30%] overflow-hidden cursor-pointer hover:scale-[1.008] transition duration-[0.6s] h-auto flex flex-col gap-[1.3vw] rounded-[2vw]"
                  onClick={() => {
                    setpage_loader(true);
                    // route.push(``);
                  }}
                >
                  <div className="w-full avater_bg sm:h-[45vw] h-[20vw] overflow-hidden">
                    <Image
                      src={e.cover_png}
                      alt={e.title}
                      unoptimized
                      width="0"
                      height="0"
                      className="w-full h-full scale-[1.2]"
                    />
                  </div>
                  <div className="w-full px-[1vw] sm:px-[3vw] flex justify-between  items-center">
                    <p className="neuem text-[1.2vw] text-white sm:text-[3vw]   sm:leading-[3.5vw]">
                      {e.title}
                    </p>
                  </div>

                  <button className="bg-[#CCFF00] sm:text-[3vw] hover:bg-opacity-[70%] sm:ml-[3vw] sm:py-[1.2vw] sm:px-[5vw] sm:rounded-[3vw] sm:mb-[4vw] ml-[1vw] rounded-[1.2vw] py-[0.6vw] px-[1.8vw] neuer text-black w-fit h-fit mb-[2vw] text-[1vw]">
                    View
                  </button>
                </Link>
                {index === 8 && (
                  <div className="w-full h-auto  sm:hidden">
                    <Banner />
                  </div>
                )}
                {index === 7 && (
                  <div className="w-full h-auto hidden sm:block">
                    <Mob_Banner />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
