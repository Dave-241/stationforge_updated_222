"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import searchimg from "../../../../../public/admin_section/post_insight/search_black.webp";
import Image from "next/image";

const Manage_release = ({ id }: any) => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Array for months with corresponding month numbers
  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];

  // Generate an array of years from the current year to the next 3 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i);

  const example_arr = ["", "", "", "", "", "", "", "", "", "", "", ""];

  return (
    <>
      <div className="relative sm:pb-[2rem]">
        <button
          className="text-base neuem"
          onClick={() => {
            router.back();
          }}
        >
          <i className="bi bi-chevron-left"></i> Back
        </button>
        <p
          style={{ whiteSpace: "nowrap" }}
          className="neuem capitalize absolute bottom-0 left-[50%] translate-x-[-50%]"
        >
          Manage release for standard tier
        </p>
      </div>

      <div className="md:w-[40rem] gap-[4rem] pt-[2rem] mx-auto max-w-full  flex flex-col">
        <div className="flex flex-col  gap-[0.5rem]">
          <p className="neuer">Select date for release</p>
          <div className="bg-white sm:flex-col w-full shadow-sm drop-shadow-lg   p-[2rem] rounded-[20px] flex gap-[1rem]">
            {/* Year Dropdown */}
            <div className="w-full neuem flex flex-col gap-[0.4rem] ">
              <label className="text-sm" htmlFor="year">
                Select year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className=" border rounded-[20px] neuer bg-[#EFEFEF] py-[1.2rem] px-[1rem]"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Dropdown */}
            <div className="w-full neuem flex flex-col gap-[0.4rem] ">
              <label className="text-sm" htmlFor="month">
                Select month
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className=" border rounded-[20px] neuer bg-[#EFEFEF] py-[1.2rem] px-[1rem]"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month.number} value={month.number}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-full  flex flex-col gap-[1rem]">
          <div className="flex  gap-[1rem] sm:flex-col items-center">
            <p className="neuem flex-shrink-0">Objects for release</p>
            <div className="w-full  items-center  flex justify-center   relative ">
              <div className="absolute h-full  w-[3.2rem] pr-[0.3rem] flex justify-end items-center top-0 left-0 z-[13]">
                <Image
                  src={searchimg}
                  alt="Search icon image"
                  className="w-[1.3rem]  h-fit"
                />
              </div>
              <input
                type="text"
                placeholder="Search objects"
                className="h-[3rem] w-full  text-black neuer text-sm outline-none focus:border transition duration-[0.8s] pl-[3.5rem] pr-[1rem]  rounded-[3rem] placeholder:text-black neuer bg-[#000000] bg-opacity-[10%]  border-white border-opacity-[30%] border-[0.1rem]"
                // onChange={(e) => {
                //   update_search_text(e.target.value);
                // }}
              />
            </div>
          </div>

          <div className="w-full sm:overflow-x-scroll rounded-[20px]  shadow-md   overflow-hidden drop-shadow-lg ">
            <div className=" flex flex-col">
              <div className="w-full sm:w-[30rem] sm:flex-shrink-0  md:pr-[1.2vw] neuem text-sm bg-[#F4F4F4] flex">
                <div className="w-[40%] text-center border-r border-r-gray-400 py-[1.2rem]">
                  <p>Objects</p>
                </div>
                <div className="w-[30%] text-center border-r border-r-gray-400 py-[1.2rem]">
                  <p>Add Model</p>
                </div>
                <div className="w-[30%] text-center py-[1.2rem]">
                  <p>Actions</p>
                </div>
              </div>

              <div className="w-full sm:w-[30rem] flex-col overflow-y-scroll h-[24rem] flex bg-white ">
                {example_arr.map((e: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="w-full sm:flex-shrink-0 text-center text-sm border-b border-b-gray-400 flex"
                    >
                      <div className="w-[40%] border-r border-gray-400 py-[1.2rem]">
                        <p className="neuem">Welcome pack</p>
                      </div>
                      <div className="w-[30%] border-r border-gray-400 py-[1.2rem]">
                        <p className=""></p>
                      </div>
                      <div className="w-[30%]  py-[1.2rem]">
                        <p className=""></p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage_release;
