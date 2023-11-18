import React from "react";

type SideDatePickerTypes = {
  allYears: number[]
  allMonths: string[]
  selectedMonth: string
  setSelectedMonth: Function
};

export default function SideDatePicker({
  allYears,
  allMonths,
  selectedMonth,
  setSelectedMonth,
}: SideDatePickerTypes) {
  return (
    <>
      <div className="hidden px-5 lg:pt-5 mt-[3rem] lg:border-t-[1px] lg:border-t-black lg:flex items-start justify-start flex-col gap-10 w-[27%]">
        <div className="flex flex-col items-start gap-3 w-full">
          <p className="font-normal nueu text-black leading-[129%] text-[10px] lg:text-[20px]">
            Select year
          </p>
          <select
            name=""
            id=""
            className="w-full h-[50px] rounded-[10px] px-[19px] bg-[#fff] border-none"
          >
            {allYears.map((y, i) => (
              <option key={i} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start gap-3 w-full">
          <p className="font-normal nueu text-black leading-[129%] text-[10px] lg:text-[20px]">
            Select month
          </p>
          <div className="grid grid-cols-3 gap-[15px] w-[full] rounded-[20px] bg-[#fff] p-[24px]">
            {allMonths.map((month, i) => (
              <h4
                key={i}
                onClick={() => setSelectedMonth(month)}
                className={`cursor-pointer text-[10px] lg:text-[12px] nueum font-medium w-[auto] h-[auto] py-[9px] px-[7px] flex items-center justify-center ${
                  selectedMonth == month
                    ? "bg-[#5f7700] text-white"
                    : "bg-[#EEE] text-[#000] "
                } rounded-[12px]`}
              >
                {month}
              </h4>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
