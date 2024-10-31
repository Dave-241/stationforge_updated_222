"use client";

import { useProfile_Context } from "@/app/utils/profile_context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const All_tiers = () => {
  const router = useRouter();

  const item = ["", ""];
  const { setpage_loader }: any = useProfile_Context();

  return (
    <>
      <div className="flex flex-col gap-[2rem]">
        <div className="relative sm:pb-[2rem]">
          <button
            className="text-base  neuem "
            onClick={() => {
              router.back();
            }}
          >
            {" "}
            <i className="bi bi-chevron-left"></i> Back
          </button>
          <p
            style={{ whiteSpace: "nowrap" }}
            className="neueb absolute bottom-0 left-[50%] translate-x-[-50%]"
          >
            ALL SUBSCRIBTION TIER
          </p>
        </div>

        {/* the unhidden tiers */}
        <div className="flex flex-col w-full items-center gap-[1rem]">
          {item.map((e: any, index: number) => {
            return (
              <div
                key={index}
                className="  md:w-[60rem] sm:flex-col md:max-w-full bg-white py-[1.2rem] sm:w-full flex sm:gap-[0.5rem] sm:px-[5%] md:justify-between items-center rounded-[20px] px-[3%]"
              >
                <p className="neuem text-xl">Merchant Tier</p>
                <div className="flex gap-[1rem]">
                  <button className="text-xl">
                    <i className="bi bi-eye-slash-fill"></i>
                  </button>{" "}
                  <button className="text-[#FF0000] text-xl">
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                  <button className="neuem text-sm">EDIT</button>
                  <Link
                    href={"/admin/add-tiers"}
                    onClick={() => {
                      setpage_loader(true);
                    }}
                    style={{ whiteSpace: "nowrap" }}
                    className="bg-[#F5F5F5] hover:bg-white border hover:border-[#95B611] hover:text-black cursor-pointer py-[1rem]  hover:bg-opacity-[40%] neuer flex justify-center text-[#95B611] items-center text-xs rounded-[1rem] px-[1rem]"
                  >
                    Manage release
                  </Link>
                </div>
              </div>
            );
          })}

          <Link
            href={"/admin/add-tiers"}
            onClick={() => {
              setpage_loader(true);
            }}
            style={{ whiteSpace: "nowrap" }}
            className="bg-[#CCFF00] cursor-pointer py-[1rem] sm:w-full sm:rounded-[0.5rem] hover:bg-opacity-[40%] neueb capitalize flex justify-center items-center text-sm rounded-[1rem] px-[2rem]"
          >
            Add subscription tier{" "}
          </Link>
        </div>

        {/* the idden  idden idden idden tiers */}
        <div className="flex flex-col w-full  pt-[2rem] items-center gap-[1rem]">
          <p className="text-xl neuer pb-[1rem]">
            {" "}
            <i className="bi bi-eye-slash-fill pr-[1rem]"></i>
            Hidden tiers
          </p>
          {item.map((e: any, index: number) => {
            return (
              <div
                key={index}
                className="  md:w-[60rem] sm:flex-col md:max-w-full bg-white py-[1.2rem] sm:w-full flex sm:gap-[0.5rem] sm:px-[5%] md:justify-between items-center rounded-[20px] px-[3%]"
              >
                <p className="neuem text-xl">Merchant Tier</p>
                <div className="flex gap-[1rem]">
                  <button className="text-xl">
                    <i className="bi bi-eye-fill"></i>
                  </button>{" "}
                  <button className="text-[#FF0000] text-xl">
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                  <button className="neuem text-sm">EDIT</button>
                  <Link
                    href={"/admin/forge-upload"}
                    onClick={() => {
                      setpage_loader(true);
                    }}
                    style={{ whiteSpace: "nowrap" }}
                    className="bg-[#F5F5F5] hover:bg-white border hover:border-[#95B611] hover:text-black cursor-pointer py-[1rem]  hover:bg-opacity-[40%] neuer flex justify-center text-[#95B611] items-center text-xs rounded-[1rem] px-[1rem]"
                  >
                    Manage release
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default All_tiers;
