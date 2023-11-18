import React from "react";
import Image from "next/image";
import PunishmentTypeModal from "./punishment_type_modal";
import AmoutToReduceModal from "./amout_to_reduce_modal";
import { ModalPropsTypes } from "@/app/types/modalPropTypes";

export default function ProfileDetailsModal({ name, handleModalPopUp }: ModalPropsTypes) {
  return (
    <dialog
      id="my_modal_3"
      className="modal bg-[rgba(0,0,0,0.80)] overflow-y-auto"
    >
      <div className="relative bg-[#fff] mb-[2rem] w-[95%] dsm:w-[80%] md:w-[90%] lg:w-[auto] h-auto rounded-[30px] flex flex-col items-center p-[20px] dsm:p-[43px]">
        <p className="w-[auto] h-[auto] p-[7px] flex items-center justify-center border border-[#000] nueum font-bold text-[8px] lg:text-[16px] rounded-[35px] text-[#000] absolute left-4 top-4">
          Standard Tier
        </p>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="shadow-none btn btn-sm border-none w-auto hover:bg-transparent outline-none bg-transparent font-light text-[2rem] text-[#000] absolute right-4 top-4">
            ✕
          </button>
        </form>
        <div className="flex flex-col items-center w-full lg:w-auto">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            src="/admin_section/general/img1.png"
            alt=""
            className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px]"
          />
          <h3 className="font-medium nueum text-black text-[16px] lg:text-[32px] text-lg mt-[13px] lg:mt-[26px]">
            Sarah Adams
          </h3>
          <div className="flex items-start flex-row flex-wrap mt-[23px] lg:mt-[47px] gap-2">
            <p
              onClick={() => handleModalPopUp("last_download")}
              className="cursor-pointer underline text-[10px] lg:text-[17px] nueum font-medium opacity-[.7] text-center px-[16px] border-r border-r-[#D9D9D9]"
            >
              Last download 4 mins ago <br></br>grimguard sergeant
            </p>
            <p
              onClick={() => handleModalPopUp("all_forges_downloaded")}
              className="cursor-pointer underline text-[10px] lg:text-[17px] nueum font-medium opacity-[.7] text-center  px-[16px]  border-r border-r-[#D9D9D9]"
            >
              Downloaded <br></br>345 items
            </p>
            <p
              onClick={() => handleModalPopUp("renewed_subscriptions")}
              className="cursor-pointer underline text-[10px] lg:text-[17px] nueum font-medium opacity-[.7] text-center  px-[16px]  border-r border-r-[#D9D9D9]"
            >
              Renewed<br></br> subscription 6 times
            </p>
            <p
              onClick={() => handleModalPopUp("forges_wishlist")}
              className="cursor-pointer underline text-[10px] lg:text-[17px] nueum font-medium opacity-[.7] text-center  px-[16px]"
            >
              Added 343 items to<br></br> forge Wishlist
            </p>
          </div>
          <div className="flex items-center flex-col gap-[15px] dsm:gap-[31px] mt-[40px] dsm:mt-[67px]">
            <h3 className="text-black text-[12px] lg:text-[24px] nueum font-medium">
              Profile information
            </h3>
            <div className="flex flex-wrap dsm:grid grid-cols-3 gap-[10px] dsm:gap-[30px]">
              <div className="flex items-start flex-col gap-[10px]">
                <h1 className="text-[#151515] text-[8px] lg:text-[13px] nueum font-medium opacity-[.7]">
                  Public name
                </h1>
                <h4 className="text-[#000] text-[10px] lg:text-[16px] nueum font-medium py-[7px] px-[11px] flex items-center justify-center bg-[#F0F0F0] rounded-[33px]">
                  Raymond Jameson
                </h4>
              </div>
              <div className="flex items-start flex-col gap-rgba(0, 0, 0, 0.80);[10px]">
                <h1 className="text-[#151515] text-[8px] lg:text-[13px] nueum font-medium opacity-[.7]">
                  Public description
                </h1>
                <h4 className="text-[#000] text-[10px] lg:text-[16px] nueum font-medium py-[7px] px-[11px] flex items-center justify-center bg-[#F0F0F0] rounded-[33px]">
                  An avid collector of game art
                </h4>
              </div>
              <div className="flex items-start flex-col gap-[10px]">
                <h1 className="text-[#151515] text-[8px] lg:text-[13px] nueum font-medium opacity-[.7]">
                  Email
                </h1>
                <h4 className="text-[#000] text-[10px] lg:text-[16px] nueum font-medium py-[7px] px-[11px] flex items-center justify-center bg-[#F0F0F0] rounded-[33px]">
                  Rayjay@gmail.com
                </h4>
              </div>
              <div className="flex items-start flex-col gap-[10px]">
                <h1 className="text-[#151515] text-[8px] lg:text-[13px] nueum font-medium opacity-[.7]">
                  Username
                </h1>
                <h4 className="text-[#000] text-[10px] lg:text-[16px] nueum font-medium py-[7px] px-[11px] flex items-center justify-center bg-[#F0F0F0] rounded-[33px]">
                  Raymond Jameson02
                </h4>
              </div>
              <div className="flex items-start flex-col gap-[10px]">
                <h1 className="text-[#151515] text-[8px] lg:text-[13px] nueum font-medium opacity-[.7]">
                  Birthday
                </h1>
                <h4 className="text-[#000] text-[10px] lg:text-[16px] nueum font-medium py-[7px] px-[11px] flex items-center justify-center bg-[#F0F0F0] rounded-[33px]">
                  20th october 2023
                </h4>
              </div>
              <div className="flex items-start flex-col gap-[10px]">
                <h1 className="text-[#151515] text-[8px] lg:text-[13px] nueum font-medium opacity-[.7]">
                  Country
                </h1>
                <h4 className="text-[#000] text-[10px] lg:text-[16px] nueum font-medium py-[7px] px-[11px] flex items-center justify-center bg-[#F0F0F0] rounded-[33px]">
                  United states
                </h4>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-center mt-[25px] dsm:mt-[50px] gap-[10px]">
            <button
              onClick={() => handleModalPopUp("all_forges_downloaded")}
              className="w-[50%] dsm:w-[30%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black btn border-none outline-none bg-[#CF0] h-[54px] flex items-center justify-center rounded-[35px]"
            >
              See All Downloads
            </button>
            {/* open modal */}
            <button className="w-[50%] dsm:w-[30%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#F00] font-medium text-[#fff] btn border-none outline-none bg-[#F00] h-[54px] flex items-center justify-center rounded-[35px]">
              <label
                htmlFor="punishment_type_modal"
                className="w-full h-full flex items-center justify-center "
              >
                Penalize
              </label>
            </button>
          </div>
        </div>
      </div>

      <PunishmentTypeModal />
      <AmoutToReduceModal />
    </dialog>
  );
}
