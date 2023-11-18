import React from "react";
import { MonthlyForgeAllocationsTypes } from "@/app/types/monthlyforgeallocation";
import Image from "next/image";

const ForgeAllocations = ({ handleModalPopUp }: MonthlyForgeAllocationsTypes) => {
  return (
    <div className="bg-[#E7E6E8] z-50 w-full grid lg:pl-5 grid-cols-1 dsm:grid-cols-2 lg:grid-cols-3 gap-8 border-l-[1px] lg:border-l-black  lg:border-t-[1px] lg:border-t-black pt-5 mt-[3rem]">
      <div className="card card-compact m-auto w-[250px] xl:w-[350px] bg-[#E7E6E8] z-10 shadow-xl border border-[@000] ">
        <figure className="w-auto">
          <Image
            src="/admin_section/general/grid_img.png"
            alt="img"
            className="w-full  h-[250px] xl:h-[300px]"
            width="0"
            height="0"
            sizes="100vw"
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title text-start nueum w-full font-medium text-[16px] text-[#000]">
            Grimguard seargeant A
          </h2>
          <div className="w-full flex flex-row items-center justify-between">
            <button
              onClick={() => handleModalPopUp("forge_info")}
              className="w-[full] p-2  text-[10px] dsm:text-[11px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black  border-none outline-none bg-[#CF0] h-[auto] flex items-center justify-center rounded-[9px]"
            >
              View more details
            </button>
            <p className="nueum w-auto text-end font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
              Downloaded 3454 Times
            </p>
          </div>
        </div>
      </div>
      <div className="card card-compact m-auto w-[250px] xl:w-[350px] bg-[#E7E6E8] z-10 shadow-xl border border-[@000] ">
        <figure className="w-auto">
          <Image
            src="/admin_section/general/grid_img.png"
            alt="img"
            className="w-full  h-[250px] xl:h-[300px]"
            width="0"
            height="0"
            sizes="100vw"
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title text-start nueum w-full font-medium text-[16px] text-[#000]">
            Grimguard seargeant A
          </h2>
          <div className="w-full flex flex-row items-center justify-between">
            <button
              onClick={() => handleModalPopUp("forge_info")}
              className="w-[full] p-2  text-[10px] dsm:text-[11px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black  border-none outline-none bg-[#CF0] h-[auto] flex items-center justify-center rounded-[9px]"
            >
              View more details
            </button>
            <p className="nueum w-auto text-end font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
              Downloaded 3454 Times
            </p>
          </div>
        </div>
      </div>
      <div className="card card-compact m-auto w-[250px] xl:w-[350px] bg-[#E7E6E8] z-10 shadow-xl border border-[@000] ">
        <figure className="w-auto">
          <Image
            src="/admin_section/general/grid_img.png"
            alt="img"
            className="w-full  h-[250px] xl:h-[300px]"
            width="0"
            height="0"
            sizes="100vw"
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title text-start nueum w-full font-medium text-[16px] text-[#000]">
            Grimguard seargeant A
          </h2>
          <div className="w-full flex flex-row items-center justify-between">
            <button
              onClick={() => handleModalPopUp("forge_info")}
              className="w-[full] p-2  text-[10px] dsm:text-[11px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black  border-none outline-none bg-[#CF0] h-[auto] flex items-center justify-center rounded-[9px]"
            >
              View more details
            </button>
            <p className="nueum w-auto text-end font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
              Downloaded 3454 Times
            </p>
          </div>
        </div>
      </div>
      <div className="card card-compact m-auto w-[250px] xl:w-[350px] bg-[#E7E6E8] z-10 shadow-xl border border-[@000] ">
        <figure className="w-auto">
          <Image
            src="/admin_section/general/grid_img.png"
            alt="img"
            className="w-full  h-[250px] xl:h-[300px]"
            width="0"
            height="0"
            sizes="100vw"
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title text-start nueum w-full font-medium text-[16px] text-[#000]">
            Grimguard seargeant A
          </h2>
          <div className="w-full flex flex-row items-center justify-between">
            <button
              onClick={() => handleModalPopUp("forge_info")}
              className="w-[full] p-2  text-[10px] dsm:text-[11px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black  border-none outline-none bg-[#CF0] h-[auto] flex items-center justify-center rounded-[9px]"
            >
              View more details
            </button>
            <p className="nueum w-auto text-end font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
              Downloaded 3454 Times
            </p>
          </div>
        </div>
      </div>
      <div className="card card-compact m-auto w-[250px] xl:w-[350px] bg-[#E7E6E8] z-10 shadow-xl border border-[@000] ">
        <figure className="w-auto">
          <Image
            src="/admin_section/general/grid_img.png"
            alt="img"
            className="w-full  h-[250px] xl:h-[300px]"
            width="0"
            height="0"
            sizes="100vw"
          />
        </figure>
        <div className="card-body w-full">
          <h2 className="card-title text-start nueum w-full font-medium text-[16px] text-[#000]">
            Grimguard seargeant A
          </h2>
          <div className="w-full flex flex-row items-center justify-between">
            <button
              onClick={() => handleModalPopUp("forge_info")}
              className="w-[full] p-2  text-[10px] dsm:text-[11px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black  border-none outline-none bg-[#CF0] h-[auto] flex items-center justify-center rounded-[9px]"
            >
              View more details
            </button>
            <p className="nueum w-auto text-end font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
              Downloaded 3454 Times
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgeAllocations;
