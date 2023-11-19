import React from "react";
import Image from "next/image";
import { ModalPropsTypes } from "@/app/types/modalPropTypes";

export default function AllForgesDownloadedModal({
  digitalSalesData,
  handleModalPopUp,
  userId,
}: ModalPropsTypes) {
  const data = digitalSalesData?.find((item) => item.userid == userId);

  return (
    <dialog
      id="all_forges_downloaded"
      className="modal bg-[rgba(0,0,0,0.80)] overflow-y-auto"
    >
      <div className="relative gap-9 bg-[#fff] mb-[2rem] w-[95%] dsm:w-[80%] md:w-[90%] lg:w-[auto] h-auto rounded-[30px] flex flex-col items-center p-[20px] dsm:p-[43px] lg:p-[70px] pt-[70px] pb-3 dsm:pb-3 lg:pb-3">
        <div className="w-full gap-9 flex items-center justify-between">
          <p className="nueum font-medium text-[10px] lg:text-[20px] text-[#000]">
            All forges downloaded
          </p>
          <p className="nueum font-medium text-[10px] lg:text-[20px] text-[#000]">
            {/* 345 */}
            {data?.forges?.length}
          </p>
        </div>
        <form method="dialog">
          <button className="shadow-none btn btn-sm border-none w-auto hover:bg-transparent outline-none bg-transparent font-light text-[2rem] text-[#000] absolute right-4 top-4">
            ✕
          </button>
        </form>
        <div className="gap-[30px] max-h-[460px] overflow-y-auto less_scrollbar grid grid-cols-3 items-center justify-center w-full lg:w-auto">
          {data?.forges?.map((item:any, i:number) => (
            <div
              key={i}
              className="min-w:[20rem] w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6"
            >
              <Image
                width="0"
                height="0"
                sizes="100vw"
                // src="/admin_section/general/grid_img.png"
                src={item.image}
                alt=""
                // user_img
                className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
              />
              <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
                Grimguard seargeant A
              </p>
            </div>
          ))}
        </div>
        {/* <div className="gap-[30px] max-h-[460px] overflow-y-auto less_scrollbar grid grid-cols-3 items-center justify-center w-full lg:w-auto">
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
          <div className="w-auto h-auto flex flex-col items-start justify-start gap-3 lg:gap-6">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              src="/admin_section/general/grid_img.png"
              alt=""
              className="lg:w-[198px] w-[100px] lg:h-[198px] h-[100px]"
            />
            <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000]">
              Grimguard seargeant A
            </p>
          </div>
        </div> */}
      </div>

      {/* <PunishmentTypeModal />
      <AmoutToReduceModal /> */}
    </dialog>
  );
}
