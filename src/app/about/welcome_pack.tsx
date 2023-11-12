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
      <div className="w-full flex justify-center items-center gap-[3vw] flex-col pt-[4vw]">
        <h2 className="text-center text-[3.2vw] text-[#CCFF00] neuem leading-[3.3vw]">
          Whats included each month? <br />
          Welcome Pack:
        </h2>
        <p className="text-white  text-opacity-[40%] text-[1.2vw] neuer text-center">
          When you first subscribe to our Patreon you are greeted <br /> with a
          3-set welcome pack!
        </p>
        {/* display the items */}
        <div className="w-full flex justify-center h-auto pb-[6vw] ">
          <div className="w-[75vw] h-auto flex gap-[3vw] justify-center">
            {welcome_items.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className={` ${
                    e.middle ? "translate-y-[5vw] " : " "
                  } flex w-full h-auto flex-col  gap-[0.8vw]`}
                >
                  <div className="w-full h-auto  overflow-hidden rounded-[3vw]">
                    <Image src={e.img} alt={e.txt} className="w-full h-fit" />
                  </div>
                  <p className="text-[1.6vw] text-white neuer text-center leading-[2vw]">
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
