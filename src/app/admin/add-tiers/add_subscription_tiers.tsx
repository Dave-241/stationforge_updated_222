"use client";

import { useProfile_Context } from "@/app/utils/profile_context";
import { useRouter } from "next/navigation";

const Add_subscription_tiers = () => {
  const router = useRouter();

  const item = ["", ""];
  const { setpage_loader }: any = useProfile_Context();

  return (
    <>
      <div className="flex flex-col gap-[1.5rem] ">
        <div className="relative  sm:pb-[2rem]">
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
        </div>{" "}
        <div className="flex items-center gap-[1rem] w-[35rem] mx-auto text-[#353232] text-opacity-[50%] max-w-full  ">
          <i className="bi bi-exclamation-circle-fill"></i>
          <p className="neuem text-sm">
            From this viewpoint , you can set a tier name, category, access,
            license, pricing and description early bed seat limit and pricing
            cannot be changed once set
          </p>
        </div>
        {/* the forms */}
        <div className="w-full flex md:w-[60rem] max-w-full sm:w-full mx-auto  neuem items-center  flex-col gap-[1.5rem]">
          <div className="flex flex-col  w-full gap-[0.5rem]">
            <label className="neueb">Tier name</label>
            <input
              type="text"
              className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%]  bg-white"
              placeholder="Enter tier name *"
            />
          </div>
          {/* hide button */}
          <div className="w-full">
            <button className="">
              <i className="bi bi-eye-slash-fill pr-[1rem]"></i>
              Hide
            </button>{" "}
          </div>

          {/* second input form */}
          <div className="flex flex-col  w-full gap-[0.5rem]">
            <label className="neueb">Set seat limit</label>
            <input
              type="number"
              className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%]  bg-white"
              placeholder="Enter seat limit *"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_subscription_tiers;
