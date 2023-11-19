"use client ";

import React, { useState, useEffect } from "react";
import forge_download_img from "../../../../public/admin_section/digital_sales/forge_downloaded.webp";
import Image from "next/image";

const Each_subscriber = () => {
  const [currentYear, setCurrentYear] = useState("");

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
  useEffect(() => {
    // Get the current date
    // Extract the year as a string
    const year = date.getFullYear().toString();

    // Set the current month and year in the state
    setCurrentYear(year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className="w-full  flex justify-between items-center neuer  text-[0.9vw] ">
        <div className="w-[25%]  h-auto flex items-center gap-[0.5vw]">
          <div
            className="w-[3.5vw] h-[3.5vw] rounded-[100%] avater_bg "
            style={{ backgroundImage: `url(/setings/avatar.jpg)` }}
          ></div>
          <p className="">Andreya Adams</p>
        </div>
        <div className="w-[20%]  h-auto">4th September 2023</div>
        <div className="w-[20%]  h-auto">
          1st {currentMonthName} {currentYear}
        </div>
        <div className="w-[20%]  h-auto flex items-center font-[900] gap-[0.5vw]">
          <Image
            src={forge_download_img}
            alt="forge download img"
            className="w-[7vw] h-fit "
          />
          232 forges
          <button className=" bg-[#F5F5F5] px-[0.8vw] py-[0.3vw] text-[#95B611] rounded-[2vw]">
            View <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="w-[15%]  h-auto text-center">23 days</div>
      </div>
    </>
  );
};

export default Each_subscriber;
