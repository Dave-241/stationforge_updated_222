import React from "react";
import Image from "next/image";
import { ModalPropsTypes } from "@/app/types/modalPropTypes";

export default function ForgeInfoModal({ name, handleModalPopUp }: ModalPropsTypes) {
  return (
    <dialog
      id="forge_info"
      className="modal bg-[rgba(0,0,0,0.80)] overflow-y-auto"
    >
      <div className="relative gap-4 bg-[#fff] mb-[2rem] w-[95%] dsm:w-[80%] md:w-[50%] lg:w-[40%] h-auto rounded-[30px] flex flex-col items-center px-[11px] dsm:p-[13px] lg:px-[70px] pt-[50px] pb-3 dsm:pb-3 lg:pb-3">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="shadow-none btn btn-sm border-none w-auto hover:bg-transparent outline-none bg-transparent font-light text-[2rem] text-[#000] absolute right-4 top-4">
            ✕
          </button>
        </form>
        {/* <div className="gap-[30px] max-h-[460px] overflow-y-auto grid grid-cols-3 items-center justify-center w-full lg:w-auto"> */}
        <div className="gap-6 flex  max-h-[460px] overflow-y-auto less_scrollbar flex-col items-center w-full ">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            src="/admin_section/general/img1.png"
            alt=""
            className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px]"
          />
          <h3 className="text-center nueum font-medium text-[12px] lg:text-[24px] text-[#000]">
            Grimguard seargeant A
          </h3>
          <p className="opacity-[.4] text-center nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
            Downloaded 3454 Times
          </p>
          <h3 className="neuem text-[10px] lg:text-[20px] text-[#000] font-medium">
            All profiles that downloaded
          </h3>
          <p className="opacity-[.4] text-center nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
            Last download 4 mins ago by{" "}
            <span className="underline">Srehan James</span>
          </p>
          <div className="flex text-center flex-col gap-4 w-full">
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex items-center flex-row gap-4">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src="/admin_section/general/grid_img.png"
                  className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] rounded-[20px]"
                  alt="user"
                />
                <div className="flex flex-col items-start justify-between">
                  <h3 className="neuem text-[10px] lg:text-[20px] text-[#000] font-medium">
                    Sarah Adams
                  </h3>
                  <p className="opacity-[.4] text-center nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                    Downloaded 4 Days Ago
                  </p>
                </div>
              </div>
              <button
                // onClick={() => handleModalPopUp("all_forges_downloaded")}
                onClick={() => handleModalPopUp("my_modal_3")}
                className="bg-[#F5F5F5] hover:bg-[gray] hover:text-stone-50 border-none text-[12px] p-5 lg:text-[14px] w-[auto] h-[17px] gap-1 leading-[129%] rounded-[45px] text-[#95B611] flex fles-row items-center justify-center "
              >
                View profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="11"
                  viewBox="0 0 6 9"
                  fill="none"
                >
                  <path
                    d="M1 0.5L5 4.5L1 8.5"
                    stroke="#95B611"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex items-center flex-row gap-4">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src="/admin_section/general/grid_img.png"
                  className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] rounded-[20px]"
                  alt="user"
                />
                <div className="flex flex-col items-start justify-between">
                  <h3 className="neuem text-[10px] lg:text-[20px] text-[#000] font-medium">
                    Sarah Adams
                  </h3>
                  <p className="opacity-[.4] text-center nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                    Downloaded 4 Days Ago
                  </p>
                </div>
              </div>
              <button
                // onClick={() => handleModalPopUp("all_forges_downloaded")}
                onClick={() => handleModalPopUp("my_modal_3")}
                className="bg-[#F5F5F5] hover:bg-[gray] hover:text-stone-50 border-none text-[12px] p-5 lg:text-[14px] w-[auto] h-[17px] gap-1 leading-[129%] rounded-[45px] text-[#95B611] flex fles-row items-center justify-center "
              >
                View profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="11"
                  viewBox="0 0 6 9"
                  fill="none"
                >
                  <path
                    d="M1 0.5L5 4.5L1 8.5"
                    stroke="#95B611"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <div className="flex items-center flex-row gap-4">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src="/admin_section/general/grid_img.png"
                  className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] rounded-[20px]"
                  alt="user"
                />
                <div className="flex flex-col items-start justify-between">
                  <h3 className="neuem text-[10px] lg:text-[20px] text-[#000] font-medium">
                    Sarah Adams
                  </h3>
                  <p className="opacity-[.4] text-center nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                    Downloaded 4 Days Ago
                  </p>
                </div>
              </div>
              <button
                // onClick={() => handleModalPopUp("all_forges_downloaded")}
                onClick={() => handleModalPopUp("my_modal_3")}
                className="bg-[#F5F5F5] hover:bg-[gray] hover:text-stone-50 border-none text-[12px] p-5 lg:text-[14px] w-[auto] h-[17px] gap-1 leading-[129%] rounded-[45px] text-[#95B611] flex fles-row items-center justify-center "
              >
                View profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="11"
                  viewBox="0 0 6 9"
                  fill="none"
                >
                  <path
                    d="M1 0.5L5 4.5L1 8.5"
                    stroke="#95B611"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
