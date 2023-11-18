import React from "react";
import Image from "next/image";
import { ModalPropsTypes } from "@/app/types/modalPropTypes";


const RenewedSubscriptionsModal = ({ name, handleModalPopUp }: ModalPropsTypes) => {
  return (
    <dialog
      id="renewed_subscriptions"
      className="modal bg-[rgba(0,0,0,0.80)] overflow-y-auto"
    >
      <div className="relative gap-2 lg:gap-4 bg-[#fff] mb-[2rem] w-[95%] dsm:w-[80%] md:w-[90%] lg:w-[auto] h-auto rounded-[30px] flex flex-col items-center p-[20px] dsm:p-[43px] lg:p-[70px] pt-[70px] pb-3 dsm:pb-3 lg:pb-3">
        <div className="w-full flex items-center justify-between">
          <p className="nueum font-medium text-[20px] lg:text-[30px] text-[#000]">
            Renewed Subscription
          </p>
          <p className="nueum font-medium text-[8px] lg:text-[18px] text-[#000] opacity-[.5]">
            6times subscribed
          </p>
        </div>
        <form method="dialog">
          <button className="shadow-none btn btn-sm border-none w-auto hover:bg-transparent outline-none bg-transparent font-light text-[2rem] text-[#000] absolute right-4 top-4">
            ✕
          </button>
        </form>
        <div className="flex flex-col gap-[30px] max-h-[460px] overflow-y-auto items-center justify-center w-full lg:w-auto">
          <div className="py-2 w-full h-auto grid grid-cols-3  gap-10 border-b-2  border-b-[#D9D9D9] ">
            <div className="flex flex-col gap-5 items-start justify-start">
              <h3 className="text-start nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                Subscription type
              </h3>
              <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
                Standard Tier
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start">
              <h3 className="text-start nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                Subscription date
              </h3>
              <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
                23 June 2023
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start">
              <h3 className="text-start nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                Forges downloaded
              </h3>
              <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
                24 of 30
              </p>
            </div>
          </div>
          <div className="py-2 w-full h-auto grid grid-cols-3  gap-10 border-b-2  border-b-[#D9D9D9] ">
            <div className="flex flex-col gap-5 items-start justify-start">
              <h3 className="text-start nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                Subscription type
              </h3>
              <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
                Standard Tier
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start">
              <h3 className="text-start nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                Subscription date
              </h3>
              <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
                23 June 2023
              </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-start">
              <h3 className="text-start nueum w-full font-medium text-[9px] lg:text-[18px] text-[#000]">
                Forges downloaded
              </h3>
              <p className="text-start nueum w-full font-medium text-[7px] lg:text-[14px] text-[#000] opacity-[.4]">
                24 of 30
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default RenewedSubscriptionsModal;
