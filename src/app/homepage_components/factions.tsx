"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Fractions = ({
  faction_option,
  active_faction,
  setactive_faction,
  setfaction_data,
  sub_faction_arr,
  active_sub_faction,
  setactive_sub_faction,
}: any) => {
  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();

  return (
    <div className="relative w-[32%] sm:hidden">
      <div className="w-full h-auto pb-[1rem]  pt-[2rem] px-[1rem] sticky top-[4rem] flex flex-col gap-[1rem]">
        <h3 className="neuer text-4xl pb-[0.3rem] text-white">Factions</h3>

        <div className="h-[0.1rem] bg-white bg-opacity-[10%] w-full"></div>

        <div className="w-full left-0 h-auto relative  flex flex-wrap gap-[2%]">
          {faction_option.map((e: any, index: number) => {
            return (
              <div
                key={index}
                className="lg:w-[32%] mb-[1rem] md:w-[48%] rounded-[1.5rem]  h-[5rem] bg-[#CCFF00] flex justify-center items-center text-black neuer cursor-pointer "
                style={{
                  backgroundColor:
                    active_faction == e.id ? "#CCFF00" : "#111111",
                  color: active_faction == e.id ? "black" : "white",

                  transition: "0.5s ease",
                }}
                onClick={() => {
                  setactive_faction(e.id);
                  setfaction_data(e.label);
                }}
              >
                {e.label}
              </div>
            );
          })}
        </div>

        <p className="text-2xl pt-[1rem] neuer text-white">Sub Factions</p>
        <div className="w-full rounded-[2rem]  bg-[#111111] min-h-[10rem] flex-wrap flex justify-start items-center gap-[1.3%]  pt-[1rem] px-[2%]">
          {sub_faction_arr?.length == 0 && (
            <p className="neuer pb-[1rem] text-white text-center w-full">
              Non Available
            </p>
          )}

          {sub_faction_arr?.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className="lg:w-[31%] md:w-[48%] flex mb-[1rem] justify-center items-center rounded-[1.2rem] h-[4rem] text-white text-opacity-[70%] neuer  cursor-pointer hover:bg-opacity-[50%]"
                style={{
                  backgroundColor:
                    active_sub_faction == e ? "#CCFF00" : "black",
                  transition: "0.5s ease",
                  color: active_sub_faction == e ? "black" : "white",
                }}
                onClick={() => {
                  setactive_sub_faction(e);
                  // setselected_sub_faction(e);
                }}
              >
                <p className="text-center neuer  ">{e}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fractions;
