"use client";

import { useEffect } from "react";

const Mobile_Filters = ({
  selected_month,
  setselected_month,
  selected_year,
  setselected_year,
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
  const years = [
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
  ]; // Add more years as needed
  const currentMonthName = monthNames[date.getMonth()];

  useEffect(() => {
    setselected_year(currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full hidden sm:flex h-full fixed top-0 left-0 bg-black bg-opacity-[70%]  justify-center items-end">
        <div
          className="w-full  h-[100vw] bg-[#D9D9D9] rounded-t-[5vw] py-[4vw] flex flex-col gap-[2vw] "
          style={{ transition: "1s ease" }}
        >
          <div className="w-full  px-[2vw] flex flex-col gap-[1vw]">
            <h1 className="neuer text-[4vw] px-[1vw] ">Select year</h1>

            <select
              className="w-full cursor-pointer h-[3.5vw] outline-none  text-[4vw] neuer px-[1vw] rounded-[3vw]"
              //   value={selectedYear}
              onChange={(e) => {
                setselected_year(parseInt(e.target.value));
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {/* select month */}
          <div className="w-full flex flex-col px-[3vw]  gap-[1vw]">
            <div className="w-full flex justify-between items-center ">
              <h1 className="neuer text-[1.2vw] px-[1vw] ">Select month</h1>

              <button
                className="w-[6vw] h-[3vw] hover:bg-opacity-[40%] bg-[#CCFF00] rounded-[1vw] text-[0.9vw] neuer"
                onClick={() => {
                  setselected_month("");
                }}
              >
                View all
              </button>
            </div>

            <div className="w-full h-auto bg-white justify-center rounded-[2.5vw] pt-[3vw] pb-[2vw] px-[2vw] flex flex-wrap gap-[1vw] ">
              {monthNames.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center h-[3vw] rounded-[0.7vw] mb-[1vw] bg-[#EEEEEE] w-[29%] text-[0.85vw] cursor-pointer hover:bg-opacity-[40%] items-center neuer text-black"
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
      </div>
    </>
  );
};

export default Mobile_Filters;
