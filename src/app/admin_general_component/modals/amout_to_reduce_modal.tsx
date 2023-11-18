import React, { useState } from "react";

export default function AmoutToReduceModal() {
  const [selectedLimit, setSelectedLimit] = useState(0);
  const forgeLimits = [5, 10, 15, 20, 25];

  return (
    <>
      <input type="checkbox" id="limit_forge" className="modal-toggle" />
      <div className="modal bg-[rgba(0,0,0,0.80)] ">
        <div className="modal-box flex items-center justify-center flex-col py-[25px] px-[35px] w-[90%] dsm:w-[80%] bg-[#FFF] mb-[10rem]">
          <h3 className="font-medium nueum w-[237px] text-center text-black text-[20px]">
            Select forge amount to reduce to
          </h3>
          <div className="flex flex-row items-center justify-center flex-wrap gap-[20px] w-[90%] xs:w-[50%] dsm:w-[60%] md:w-[70%] xl:w-[80%] mt-[68px]">
            {forgeLimits.map((limit, i) => (
              <h4
                key={i}
                onClick={() => setSelectedLimit(limit)}
                className={`cursor-pointer text-[10px] lg:text-[16px] nueum font-medium py-[7px] px-[11px] flex items-center justify-center ${
                  selectedLimit == limit
                    ? "bg-[gray] text-white"
                    : "bg-[#F0F0F0] text-[#000] "
                } rounded-[33px]`}
              >
                {limit} Forges
              </h4>
            ))}
          </div>
          <div className="mt-[68px] w-full flex flex-row items-center justify-center gap-[10px]">
            <button
              disabled={!selectedLimit ? true : false}
              className="w-[50%] disabled:text-[gray] disabled:cursor-not-allowed text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black btn border-none outline-none bg-[#CF0] h-[54px] flex items-center justify-center rounded-[9px]"
            >
              <label
                htmlFor="confirm_user_forge_reduction"
                className="w-full h-full flex items-center justify-center "
              >
                Select
              </label>
            </button>
            {/* open modal */}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="limit_forge"></label>
      </div>
      <>
        <input
          type="checkbox"
          id="confirm_user_forge_reduction"
          className="modal-toggle"
        />
        <div className="modal bg-[rgba(0,0,0,0.80)] ">
          <div className="modal-box flex items-center justify-center flex-col py-[48px] px-[35px] w-[90%] dsm:w-[80%] bg-[#FFF] mb-[10rem]">
            <h3
              className={`font-medium nueum text-center text-black text-[16px] lg:text-[18px]`}
            >
              Are you sure you want to Limit this users allocation to{" "}
              {selectedLimit}
            </h3>
            <div className="w-full flex flex-row items-center justify-center mt-[25px] gap-[10px]">
              <button className="w-[50%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#F00] font-medium text-[#fff] btn border-none outline-none bg-[#F00] h-[54px] flex items-center justify-center rounded-[9px]">
                Yes
              </button>
              <div className="modal-action"></div>
              <button className="w-[50%] text-[10px] dsm:text-[13px] lg:text-[16px] neuem hover:opacity-[.7] hover:bg-[#CF0] font-medium text-black btn border-none outline-none bg-[#CF0] h-[54px] flex items-center justify-center rounded-[9px]">
                <label
                  htmlFor="confirm_user_forge_reduction"
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
