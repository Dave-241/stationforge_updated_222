import React from "react";
import Image from "next/image";

export default function LastDownloadModal({ name, handleModalPopUp }) {
  return (
    <dialog
      id="last_download"
      className="modal bg-[rgba(0,0,0,0.80)] overflow-y-auto"
    >
      <div className="relative gap-4 bg-[#fff] mb-[2rem] w-[95%] sm:w-[80%] md:w-[50%] lg:w-[40%] h-auto rounded-[30px] flex flex-col items-center p-[20px] sm:p-[43px] lg:p-[70px] pt-[70px] pb-3 sm:pb-3 lg:pb-3">
        <div className="w-full flex items-center justify-between">
          <p className="nueum font-medium text-[10px] lg:text-[20px] text-[#000]">
            Last download
          </p>
          <p className="nueum font-medium text-[10px] lg:text-[20px] text-[#000]">
            4 mins Ago
          </p>
        </div>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="shadow-none btn btn-sm border-none w-auto hover:bg-transparent outline-none bg-transparent font-light text-[2rem] text-[#000] absolute right-4 top-4">
            ✕
          </button>
        </form>
        {/* <div className="gap-[30px] max-h-[460px] overflow-y-auto grid grid-cols-3 items-center justify-center w-full lg:w-auto"> */}
        <div className="w-auto h-auto flex flex-col items-center justify-center gap-3 lg:gap-3">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            src="/admin_section/general/grid_img.png"
            alt=""
            className="lg:w-[400px] w-[100px] lg:h-[400px] h-[100px]"
          />
          <h3 className="text-center nueum font-medium text-[10px] lg:text-[20px] text-[#000]">
            Grimguard seargeant A
          </h3>
          <p className="opacity-[.4] text-center nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
            No 12 in Monthly allocation downloads
          </p>
          <div className="flex text-center flex-row gap-1">
            <button className="btn btn-circle btn-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M9.38086 2.61481L5.36019 6.63548C4.88536 7.11031 4.88536 7.88731 5.36019 8.36215L9.38086 12.3828"
                  stroke="black"
                  strokeWidth="1.11"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="btn btn-circle btn-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M5.67969 2.61481L9.70035 6.63548C10.1752 7.11031 10.1752 7.88731 9.70035 8.36215L5.67969 12.3828"
                  stroke="black"
                  strokeWidth="1.11"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <PunishmentTypeModal />
      <AmoutToReduceModal /> */}
    </dialog>
  );
}
