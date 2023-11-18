import React from 'react'
import Image from 'next/image';

type MfTopnavPropTypes = {
  setOpen: Function
}

export default function MfaTopnav({ setOpen }: MfTopnavPropTypes) {
  return (
    <div className="flex gap-2 flex-wrap flex-col lg:flex-row items-start dsm:items-center justify-between sticky top-1">
      <h1 className="w-full dsm:w-auto pb-[30px] flex justify-between items-center dsm:pb-0  font-bold nueub text-black leading-[129%] text-[24px] lg:text-[40px]">
        Digital Uploads
        <div className="flex dsm:hidden w-[44px] h-[44px] bg-[#cf0] rounded-full"></div>
      </h1>
      {/* border-l-[1px] lg:border-l-black */}
      <div className="border-t-[#000] border-t-[1px] pt-[30px] dsm:pt-0 dsm:border-none flex w-full lg:w-auto flex-col lg:flex-row items-start dsm:items-center justify-center gap-6">
        <h1 className="flex-wrap w-full lg:w-auto flex flex-row items-center justify-between font-medium nueum text-black leading-[129%] text-[9px] dsm:text-[18px] lg:text-[20px]">
          All Models Added This Month
          <span
            onClick={() => setOpen(true)}
            className="w-auto h-auto bg-[#D2D1D3] rounded-[50px] px-[6px] py-[8px] flex lg:hidden flex-row justify-center items-center gap-[10px]"
          >
            Select date
            <Image
              className="w-[13px] h-[13px]"
              src="/admin_section/general/settings_slider.svg"
              width="0"
              height="0"
              sizes="100vw"
              alt="btn"
            />
          </span>
        </h1>
        <div className="w-full lg:w-auto  items-center  flex justify-center  relative ">
          <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-2 lg:left-0 z-[13]">
            <Image
              src={"/admin_section/general/search_icon2.svg"}
              alt="Search icon image"
              className="w-[1vw] h-fit"
              width="0"
              height="0"
              sizes="100vw"
            />
          </div>
          <input
            type="text"
            placeholder="Search dashboard"
            className="h-[44px] lg:h-[3vw] w-full lg:w-[18vw] bg-[rgba(0,0,0,0.05)]  text-black neuer text-[1.4vw] outline-none focus:border-none transition duration-[0.8s] pl-[6vw] lg:pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px]  border-none"
          />
        </div>
        <div className="hidden lg:flex flex-row items-center justify-center  gap-[10px]">
          <button className="w-[auto] p-[10px] text-[8px] lg:text-[14px] neuem hover:opacity-[.7] hover:bg-[#f5f5f5] font-medium text-[#95B611] border-none outline-none bg-[#f5f5f5] h-[auto] flex items-center justify-center rounded-[9px]">
            Add a new forge
          </button>
          <button className="w-[auto] p-[10px] text-[8px] lg:text-[14px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black border-none outline-none bg-[#CF0] h-[auto] flex items-center justify-center rounded-[9px]">
            Add Monthly Allocations
          </button>
        </div>
      </div>
    </div>
  );
}
