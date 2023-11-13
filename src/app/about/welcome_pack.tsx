"use client";
import React, { useEffect, useState } from "react";
import img1 from "../../../public/about/wlecome_pack.webp";
import Image from "next/image";

const Welcome_pack = () => {
  const [welcome_items, setwelcome_items] = useState([
    { img: img1, txt: "10 Orkaz Plague ", t2: "preader" },
    { img: img1, txt: "10 Scavenger ", t2: "Junkyards", middle: "true" },
    { img: img1, txt: "10 Grimguard ", t2: "Marksman" },
  ]);
  return (
    <>
      <div className="w-full flex justify-center items-center gap-[3vw] flex-col pt-[4vw] sm:pt-[10vw] sm:gap-[6vw]">
        <h2 className="text-center text-[3.2vw] text-[#CCFF00] neuem leading-[3.3vw] sm:text-[7vw] sm:leading-[8vw]">
          Whats included each month? <br />
          Welcome Pack:
        </h2>
        <p className="text-white sm:text-[4vw] sm:w-[90%]  text-opacity-[40%] text-[1.2vw] neuer text-center">
          When you first subscribe to our Patreon you are{" "}
          <br className="sm:block hidden " /> greeted{" "}
          <br className="sm:hidden " /> with a 3-set welcome pack!
        </p>
        {/* display the items */}
        <div className="w-full flex justify-center sm:px-[3vw] h-auto pb-[6vw] ">
          <div className="w-[75vw] sm:w-full sm:pt-[4vw] sm:flex-wrap sm:gap-[8%]   h-auto flex gap-[3vw] justify-center">
            {welcome_items.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className={` ${
                    e.middle ? "translate-y-[5vw] sm:translate-y-0 " : " "
                  } flex w-full sm:w-[46%] sm:pb-[5vw] h-auto flex-col  gap-[0.8vw]`}
                >
                  <div className="w-full h-auto  overflow-hidden rounded-[3vw]">
                    <Image src={e.img} alt={e.txt} className="w-full h-fit" />
                  </div>
                  <p className="text-[1.6vw] text-white neuer text-center leading-[2vw] sm:text-[4vw] sm:leading-[5vw]">
                    {e.txt} <br /> {e.t2}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[20vw] h-[7vw]  border-[#767676] rounded-[1.3vw] border flex justify-center items-center mb-[6vw]">
          {" "}
          <p className=" capitalize text-[1.2vw] text-white text-center ">
            a Total Of 30 <br />
            Miniature Bonus
          </p>
        </div>
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] bg-[#D9D9D9] "></div>
    </>
  );
};

export default Welcome_pack;
