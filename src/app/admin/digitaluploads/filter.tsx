"use client";

import { useEffect } from "react";

const Filters = ({
  selected_month,
  setselected_month,
  selected_year,
  setselected_year,
  productStats_copy,
}: any) => {
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
  const date = new Date();
  const currentYear = new Date().getFullYear(); // Get the current year
  const prev_years = [
    currentYear - 5,
    currentYear - 4,
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
  ];
  // const years = [

  //   currentYear + 1,
  //   currentYear + 2,
  //   currentYear + 3,
  // ]; // Add more years as needed
  const currentMonthName = monthNames[date.getMonth()];

  useEffect(() => {
    setselected_year(currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productStats_copy]);

  return (
    <>
      <div className="w-full  h-auto  flex flex-col gap-[2rem] ">
        <h1 className="neuem text-center pb-[0.67rem] lg:text-4xl">
          Digital Uploads
        </h1>

        <div className="w-full h-[0.1rem] lg:block hidden bg-black bg-opacity-[40%]"></div>

        <div className="w-full  lg:px-[3rem] px-[3%] flex flex-col  gap-[1rem]">
          <h1 className="neuer text-[1.2rem] px-[1rem] ">Select year</h1>

          <select
            className="w-full cursor-pointer h-[3.5rem] outline-none  text-sm neuer px-[1rem] rounded-[1rem]"
            //   value={selectedYear}
            onChange={(e) => {
              setselected_year(parseInt(e.target.value));
            }}
          >
            {" "}
            <option value={currentYear}>Select year {currentYear} </option>
            {prev_years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* select month */}
        <div className="w-full flex flex-col  lg:px-[3rem] px-[3%]  gap-[1rem]">
          <div className="w-full flex justify-between items-center ">
            <h1 className="neuer text-xl px-[1rem] ">Select month</h1>

            <button
              className="px-[1rem] py-[0.6rem] hover:bg-opacity-[40%] bg-[#CCFF00] rounded-[1rem] text-sm neuer"
              onClick={() => {
                setselected_month("");
              }}
            >
              View all
            </button>
          </div>

          <div className="w-full h-auto bg-white justify-center lg:rounded-[2.5rem] md:rounded-[1rem] py-[1.2rem] px-[1%] flex flex-wrap gap-[2%] ">
            {monthNames.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex justify-center h-[3rem] rounded-[0.7rem] mb-[1rem] bg-[#EEEEEE] w-[28%] md:text-[1vw] lg:text-xs cursor-pointer hover:bg-opacity-[40%] items-center neuer text-black"
                  style={{
                    backgroundColor: selected_month == e ? "#CCFF00" : "",
                  }}
                  onClick={() => {
                    setselected_month(e);
                  }}
                >
                  <p className="">{e}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
