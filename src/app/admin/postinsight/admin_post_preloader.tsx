"use client";

import React, { useState, useEffect } from "react";

const Admin_Post_preloader = (props: any) => {
  const [images, setimages] = useState(["", "", "", ""]);

  return (
    <>
      <section className="w-[58vw] h-auto flex flex-col py-[4vw] gap-[3vw]  bg-[white] rounded-[1.5vw]">
        {/*the heading */}

        <div className="w-full px-[4vw] flex flex-col gap-[2vw]  items-start">
          <div className="w-full flex items-center text-[1vw] gap-[0.5vw] text-opacity-[70%] text-white neuer">
            <p className="animate-pulse bg-[#868687] h-[2vw] w-[30vw] rounded-[1vw]"></p>
          </div>
          <p className="animate-pulse bg-[#868687] h-[2vw] w-[15vw] rounded-[1vw]"></p>
        </div>
        {/* the images */}
        <div className="w-full flex flex-wrap gap-[1vw] relative  justify-center items-center px-[0vw]">
          {images.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className="w-[28vw] animate-pulse bg-[#868687]  relative h-[24vw] avater_bg rounded-[1.5vw] overflow-hidden "
              ></div>
            );
          })}
        </div>

        <div className="w-full px-[4vw] text-white text-opacity-[50%] text-[1.2vw] flex flex-col gap-[2vw] items-start ">
          <p className=" h-[2vw] w-[30vw] neuer animate-pulse rounded-[1vw] bg-[#868687]"></p>

          <span className="bg-[#CCFF00] h-[2vw] w-[20vw] animate-pulse rounded-[1vw] bgs-[#868687]"></span>

          {/* the icons */}
          <div className="w-full  py-[1vw]  h-auto  flex justify-between items-center">
            <p className=" h-[2vw] w-[23vw] neuer animate-pulse rounded-[1vw] bg-[#868687]"></p>

            <div className="w-auto flex gap-[1vw] justify-end items-center ">
              <p className=" h-[2vw] w-[5vw] neuer animate-pulse rounded-[1vw] bg-[#CCFF00]"></p>
            </div>
          </div>

          {/* the form to handle comments  */}
          <div className="w-full h-[3.4vw]   mt-[0vw] relative text-[1vw]">
            <div className="animate-pulse rounded-[2vw] bg-[#868687] h-full w-full"></div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Admin_Post_preloader;
