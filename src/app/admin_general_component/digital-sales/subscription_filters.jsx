import { useState } from "react";
import Image from "next/image";
import { allYears, allMonths } from "../../utils/constants.ts";

const SubscriptionFilters = () => {
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const dateFilters = [
    "Yesterday",
    "Today",
    "This Week",
    "This Month",
    "Last Month",
    "This Year",
    "Last Year",
  ];
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ];

  const days = ["S", "M", "T", "W", "TH", "F", "S"];

  console.log(allYears);
  return (
    <div className="mt-5 flex items-start justify-start flex-col gap-[10px] w-[90%] lg:w-[90%]">
      <h2 className="text-[#000] text-[18px] lg:text-[20px] neuem leading-[129%]">
        Subscription Filter
      </h2>

      <div className="flex">
        <div className="dropdown dropdown-bottom dropdown-start w-auto">
          <label
            tabIndex={0}
            className="cursor-pointer text-[13px] rounded-[10px] flex flex-wrap flex-row w-auto items-center justify-center py-3 px-1 lg:px-2 gap-0 lg:gap-2 neuem leading-[129%] text-[#000]  m-1 bg-[#fff] hover:bg-[#fff] 5px] hover:border-[#A9A7A7]"
          >
            Start Date
            <div className="text-[10px] lg:text-[13px] flex flex-wrap flex-row w-auto py-2 px-2 gap-1 bg-[#F1F1F1] rounded-[10px]">
              10th Oct 2023
              <Image
                src="/admin_section/general/arrow.svg"
                width="0"
                height="0"
                className="transform rotate-90"
                alt="arrow"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="shadow-[0px_20px_69px_0px_rgba(0,0,0,0.12)] absolute w-[90vw] max-w-[28rem] lg:w-[28rem] mt-2 z-30 h-auto dropdown-content gap-[20px] flex flex-row items-start menu bg-[#fff] p-5 rounded-[10px]"
          >
            <div className="w-auto h-full">
              <h1 className="text-[12px] lg:text-[16px] neueb font-bold text-[#000]">
                Specify
              </h1>
              <div className="h-full flex flex-col justify-between border-r-[0.5px] border-r-[#A9A9A9] pr-2">
                {dateFilters.map((item, i) => (
                  <p
                    key={i}
                    className="text-[12px] lg:text-[16px] neuen font-normal text-[#292929] hover:bg-[gray] hover:text-white cursor-pointer p-1 lg:p-3 rounded-[10px]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="max-[320px]:w-full w-[65%] lg:w-auto flex flex-col items-start gap-3">
              <h1 className="text-[12px] lg:text-[16px] neueb font-bold text-[#000]">
                Select year
              </h1>
              <div className="flex flex-col items-start gap-3 w-full">
                <select
                  name=""
                  id=""
                  className="w-full h-[30px] lg:h-[50px] text-[#000] focus:border-none rounded-[20px] px-[19px] bg-[#EFEFEF] border-none"
                >
                  {allYears.map((y, i) => (
                    <option key={i} value={y} className="text-[#000]">
                      {y}
                    </option>
                  ))}
                </select>
                <p className="font-normal nueu text-black leading-[129%] text-[12px] lg:text-[16px] ">
                  Add month
                </p>
                <select
                  name=""
                  id=""
                  className="w-full h-[30px] lg:h-[50px] text-[#000] focus:border-none rounded-[20px] px-[19px] bg-[#EFEFEF] border-none"
                >
                  {allMonths.map((y, i) => (
                    <option key={i} value={y} className="text-[#000]">
                      {y}
                    </option>
                  ))}
                </select>
                <p className="font-normal nueu text-black leading-[129%] text-[12px] lg:text-[16px] ">
                  Add day
                </p>
                <div className="w-auto lg:w-full gap-[10px] grid grid-cols-7 p-1 lg:p-3 h-[auto] text-[#000] focus:border-none rounded-[20px] px-[19px] bg-[#EFEFEF] border-none">
                  {days.map((y, i) => (
                    <p key={i} className="text-[#000] m-auto">
                      {y}
                    </p>
                  ))}
                  {dates.map((date, i) => (
                    <p
                      onClick={() => setSelectedDate(date)}
                      className={`cursor-pointer text-[10px] text-[#000] m-auto lg:text-[12px] nueum font-normal w-[25px] h-[25px] flex items-center justify-center ${
                        selectedDate == date
                          ? "bg-[#000] text-white"
                          : "bg-[#EEE] text-[#000] hover:bg-[#CF0]"
                      } rounded-[100%]`}
                      key={i}
                    >
                      {date}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom dropdown-start w-auto">
          <label
            tabIndex={0}
            className="cursor-pointer text-[13px] rounded-[10px] flex flex-wrap flex-row w-auto items-center justify-center py-3 px-1 lg:px-2 gap-0 lg:gap-2 neuem leading-[129%] text-[#000]  m-1 bg-[#fff] hover:bg-[#fff] 5px] hover:border-[#A9A7A7]"
          >
            Start Date
            <div className="text-[10px] lg:text-[13px] flex flex-wrap flex-row w-auto py-2 px-2 gap-1 bg-[#F1F1F1] rounded-[10px]">
              10th Oct 2023
              <Image
                src="/admin_section/general/arrow.svg"
                width="0"
                height='0'
                className="transform rotate-90"
                alt="arrow"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="shadow-[0px_20px_69px_0px_rgba(0,0,0,0.12)] absolute w-[90vw] max-w-[28rem] lg:w-[28rem] mt-2 z-30 h-auto dropdown-content gap-[20px] flex flex-row items-start menu bg-[#fff] p-5 rounded-[10px]"
          >
            <div className="w-auto h-full">
              <h1 className="text-[12px] lg:text-[16px] neueb font-bold text-[#000]">
                Specify
              </h1>
              <div className="h-full flex flex-col justify-between border-r-[0.5px] border-r-[#A9A9A9] pr-2">
                {dateFilters.map((item, i) => (
                  <p
                    key={i}
                    className="text-[12px] lg:text-[16px] neuen font-normal text-[#292929] hover:bg-[gray] hover:text-white cursor-pointer p-1 lg:p-3 rounded-[10px]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="max-[320px]:w-full w-[65%] lg:w-auto flex flex-col items-start gap-3">
              <h1 className="text-[12px] lg:text-[16px] neueb font-bold text-[#000]">
                Select year
              </h1>
              <div className="flex flex-col items-start gap-3 w-full">
                <select
                  name=""
                  id=""
                  className="w-full h-[30px] lg:h-[50px] text-[#000] focus:border-none rounded-[20px] px-[19px] bg-[#EFEFEF] border-none"
                >
                  {allYears.map((y, i) => (
                    <option key={i} value={y} className="text-[#000]">
                      {y}
                    </option>
                  ))}
                </select>
                <p className="font-normal nueu text-black leading-[129%] text-[12px] lg:text-[16px] ">
                  Add month
                </p>
                <select
                  name=""
                  id=""
                  className="w-full h-[30px] lg:h-[50px] text-[#000] focus:border-none rounded-[20px] px-[19px] bg-[#EFEFEF] border-none"
                >
                  {allMonths.map((y, i) => (
                    <option key={i} value={y} className="text-[#000]">
                      {y}
                    </option>
                  ))}
                </select>
                <p className="font-normal nueu text-black leading-[129%] text-[12px] lg:text-[16px] ">
                  Add day
                </p>
                <div className="w-auto lg:w-full gap-[10px] grid grid-cols-7 p-1 lg:p-3 h-[auto] text-[#000] focus:border-none rounded-[20px] px-[19px] bg-[#EFEFEF] border-none">
                  {days.map((y, i) => (
                    <p key={i} className="text-[#000] m-auto">
                      {y}
                    </p>
                  ))}
                  {dates.map((date, i) => (
                    <p
                      onClick={() => setSelectedDate(date)}
                      className={`cursor-pointer text-[10px] text-[#000] m-auto lg:text-[12px] nueum font-normal w-[25px] h-[25px] flex items-center justify-center ${
                        selectedDate == date
                          ? "bg-[#000] text-white"
                          : "bg-[#EEE] text-[#000] hover:bg-[#CF0]"
                      } rounded-[100%]`}
                      key={i}
                    >
                      {date}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFilters;
