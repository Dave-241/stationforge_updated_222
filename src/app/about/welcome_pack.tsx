"use client";
import React, { useEffect, useState } from "react";
import img1 from "../../../public/about/wlecome_pack_1.webp";
import img2 from "../../../public/about/wlecome_pack_2.webp";
import img3 from "../../../public/about/wlecome_pack_3.webp";
import Image from "next/image";

const Welcome_pack = () => {
  const [welcome_items, setwelcome_items] = useState([
    { img: img3, txt: "10 Orkaz Plague ", t2: "preader" },
    { img: img1, txt: "10 Scavenger ", t2: "Junkyards", middle: "true" },
    { img: img2, txt: "10 Grimguard ", t2: "Marksman" },
  ]);
  return (
    <>
      <div className="w-full flex justify-center items-center gap-[3rem] flex-col pt-[4rem] sm:pt-[10vw] sm:gap-[6vw]">
        <h2 className="text-center md:text-5xl text-[#CCFF00] neuem sm:text-[7vw] sm:leading-[8vw]">
          Whats included each month? <br />
          Welcome Pack:
        </h2>
        <p className="text-white sm:text-[4vw] sm:w-[90%]  text-opacity-[40%] md:text-xl neuer text-center">
          When you first subscribe to our Patreon you are{" "}
          <br className="sm:block hidden " /> greeted{" "}
          <br className="sm:hidden " /> with a 3-set welcome pack!
        </p>
        {/* display the items */}
        <div className="w-full flex justify-center sm:px-[3vw] h-auto sm:pb-[3vw] pb-[6rem] ">
          <div className="w-[80rem] md:max-w-[80%] sm:w-full sm:pt-[4vw] sm:flex-wrap sm:gap-[8%]   h-auto flex gap-[3rem] justify-center">
            {welcome_items.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className={` ${
                    e.middle ? "translate-y-[7rem] sm:translate-y-0 " : " "
                  } flex w-full sm:w-[46%] sm:pb-[5vw] h-auto flex-col  gap-[0.5rem]`}
                >
                  <div className="w-full h-auto  overflow-hidden rounded-[3rem]">
                    <Image src={e.img} alt={e.txt} className="w-full h-fit" />
                  </div>
                  <p className="md:text-xl text-white neuer text-center sm:text-[4vw] sm:leading-[5vw]">
                    {e.txt} <br /> {e.t2}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[15rem] mt-[1rem] py-[1.2rem] max-w-[90%] sm:h-[15vw] sm:rounded-[3vw] sm:w-[50vw] border-[#767676] rounded-[1.3rem] border sm:mb-[12vw] flex justify-center items-center mb-[6rem]">
          {" "}
          <p className=" capitalize sm:text-[3vw] text-base text-white text-center ">
            a Total Of 30 <br />
            Miniature Bonus
          </p>
        </div>
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[95vw] sm:mx-auto bg-[#D9D9D9] sm:mt-[5vw]"></div>{" "}
    </>
  );
};

export default Welcome_pack;
