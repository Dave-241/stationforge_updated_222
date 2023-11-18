import React from "react";

export default function PunishmentTypeModal() {
  return (
    <>
      <input
        type="checkbox"
        id="punishment_type_modal"
        className="modal-toggle"
      />
      <div className="modal bg-[rgba(0,0,0,0.80)] ">
        <div className="modal-box flex items-center justify-center flex-col py-[48px] px-[35px] w-[90%] dsm:w-[80%] bg-[#FFF] mb-[10rem]">
          <h3 className="font-medium nueum text-black text-[16px] lg:text-[18px]">
            Select punishment type
          </h3>
          <div className="w-full flex flex-row items-center justify-center mt-[25px] gap-[10px]">
            <button className="w-[50%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#F00] font-medium text-[#fff] btn border-none outline-none bg-[#F00] h-[54px] flex items-center justify-center rounded-[9px]">
              <label
                htmlFor="limit_forge"
                className="w-full h-full flex items-center justify-center "
              >
                Limit forge allocation
              </label>
            </button>
            <button className="w-[50%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black btn border-none outline-none bg-[#CF0] h-[54px] flex items-center justify-center rounded-[9px]">
              <label
                htmlFor="confirm_user_kickout"
                className="w-full h-full flex items-center justify-center "
              >
                Kick out of platform
              </label>
            </button>
            {/* open modal */}
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="punishment_type_modal"
        ></label>
      </div>
      <>
        <input
          type="checkbox"
          id="confirm_user_kickout"
          className="modal-toggle"
        />
        <div className="modal bg-[rgba(0,0,0,0.80)] ">
          <div className="modal-box flex items-center justify-center flex-col py-[48px] px-[35px] w-[90%] dsm:w-[80%] bg-[#FFF] mb-[10rem]">
            <h3
              className={`font-medium nueum w-[215px] text-center text-black text-[16px] lg:text-[18px]`}
            >
              Are you sure you want to kick this user out
            </h3>
            <div className="w-full flex flex-row items-center justify-center mt-[25px] gap-[10px]">
              <button className="w-[50%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#F00] font-medium text-[#fff] btn border-none outline-none bg-[#F00] h-[54px] flex items-center justify-center rounded-[9px]">
                Kick out
              </button>
              <div className="modal-action"></div>
              <button className="w-[50%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black btn border-none outline-none bg-[#CF0] h-[54px] flex items-center justify-center rounded-[9px]">
                <label
                  htmlFor="confirm_user_kickout"
                  className="w-full h-full flex items-center justify-center "
                >
                  Cancel
                </label>
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
