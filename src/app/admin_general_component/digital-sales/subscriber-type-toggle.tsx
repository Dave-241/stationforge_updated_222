import React, { useState } from "react";

const SubscriberTypeTggle = () => {
  const [subcriberType, setSubcriberType] = useState("standard");

  return (
    <div className="flex flex-wrap gap-[20px] flex-row items-center  lg:items-start w-full justify-between ">
      <div className="flex flex-col items-start gap-[10px] lg:gap-[20px] ">
        <div className="flex flex-row items-center gap-[10px] lg:gap-[30px]">
          <h1 className="neueb text-[12px] dsm:text-[16px] lg:text-[30px] text-[#000] leading-[129%] font-bold">
            Subscribers
          </h1>
          <div className="border-[0.2px] lg:border rounded-[6px] lg:rounded-[10px]border-[#A4A4A4] flex flex-row items-center justify-center px-[2px] lg:px-[9px] gap-[6px] dsm:gap-[10px] lg:gap-[18px] w-[auto] h-[35px] lg:h-[47px]">
            <p
              onClick={() => setSubcriberType("standard")}
              className={`cursor-pointer w-[50px] lg:w-[79px] h-[25px] lg:h-[33px] rounded-[10px] ${
                subcriberType == "standard" ? "bg-[#cf0]" : "opacity-[.4]"
              }  text-[#000] nueuem text-[9px] lg:text-[16px] flex items-center justify-center px-[4px] lg:px-[6px]`}
            >
              Standard
            </p>
            <p
              onClick={() => setSubcriberType("merchant")}
              className={`cursor-pointer w-[50px] lg:w-[79px] h-[25px] lg:h-[33px] rounded-[10px] ${
                subcriberType == "merchant" ? "bg-[#cf0]" : "opacity-[.4]"
              }  text-[#000] nueuem text-[9px] lg:text-[16px] flex items-center justify-center px-[4px] lg:px-[6px]`}
            >
              Merchant
            </p>
          </div>
        </div>
        <p className="text-[10px] dsm:text-[12px] lg:text-[20px] opacity-[.6] neuem font-medium leading-[129%]">
          Total Standard Tier Subscribers {26212}
        </p>
      </div>
      <h4 className="text-[#000] mt-[-10px] lg:mt-0 text-[10px] lg:text-[20px] neuem leading-[129%]">
        Total Subcribers {46546}
      </h4>
    </div>
  );
};

export default SubscriberTypeTggle;
