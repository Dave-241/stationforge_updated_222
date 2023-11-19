import Image from "next/image";
import { MonthlyForgeAllocationsTypes } from "@/app/types/monthlyforgeallocation";

export default function Tiers({digitalSalesData}: Partial<MonthlyForgeAllocationsTypes>) {

  return (
    <>
      <div className="hidden lg:flex flex-row flex-wrap gap-[33px]  items-center justify-center xl:justify-between mt-[16px] w-[95%] lg:w-[90%] ">
        <div className="gap-[20px] flex flex-col items-center justify-center rounded-[20px] border border-[#A9A7A7] bg-[#fff] p-5">
          <h1 className={"neuem-medium text-[30px] text-[#000] leading-[129%]"}>
            Standard Tier
          </h1>
          <div className="flex flex-row gap-[50px] items-center">
            <div className="flex flex-col items-center gap-[26px]">
              <h2 className="text-[16px] neuem leading-[129%] text-[#000] opacity-[.5]">
                Total Subscribers
              </h2>
              <button className="bg-[#F1F1F1] p-1 w-[140px] min-h-[61px] h-auto rounded-[20px] border border-[#9F9F9F] text-[20px] text-[#000] neuem leading-[129%]">
              {digitalSalesData?.length}
              </button>
            </div>
            <div className="w-[1px] bg-[#D9D9D9] h-[66px]"></div>
            <div className="flex flex-col items-center gap-[26px]">
              <h2 className="text-[16px] neuem leading-[129%] text-[#000] opacity-[.5]">
                Total Amount Paid
              </h2>
              <button className="bg-[#F1F1F1] p-1 w-[140px] min-h-[61px] h-auto rounded-[20px] border border-[#9F9F9F] text-[20px] text-[#000] neuem leading-[129%]">
                $0
              </button>
            </div>
          </div>
        </div>
        <div className="gap-[20px] flex flex-col items-center justify-center rounded-[20px] border border-[#A9A7A7] bg-[#fff] p-5">
          <h1 className={"neuem-medium text-[30px] text-[#000] leading-[129%]"}>
            Merchant Tier
          </h1>
          <div className="flex flex-row gap-[50px] items-center">
            <div className="flex flex-col items-center gap-[26px]">
              <h2 className="text-[16px] neuem leading-[129%] text-[#000] opacity-[.5]">
                Total Subscribers
              </h2>
              <button className="bg-[#F1F1F1] p-1 w-[140px] min-h-[61px] h-auto rounded-[20px] border border-[#9F9F9F] text-[20px] text-[#000] neuem leading-[129%]">
              {digitalSalesData?.length}
              </button>
            </div>
            <div className="w-[1px] bg-[#D9D9D9] h-[66px]"></div>
            <div className="flex flex-col items-center gap-[26px]">
              <h2 className="text-[16px] neuem leading-[129%] text-[#000] opacity-[.5]">
                Total Amount Paid
              </h2>
              <button className="bg-[#F1F1F1] p-1 w-[140px] min-h-[61px] h-auto rounded-[20px] border border-[#9F9F9F] text-[20px] text-[#000] neuem leading-[129%]">
                $0
              </button>
            </div>
          </div>
        </div>
        <div className="gap-[20px] flex flex-col items-center justify-center rounded-[20px] border border-[#A9A7A7] bg-[#fff] p-5">
          <h1 className={"neuem-medium text-[30px] text-[#000] leading-[129%]"}>
            All Subscribers
          </h1>
          <div className="flex flex-row gap-[50px] items-center">
            <div className="flex flex-col items-center gap-[26px]">
              <h2 className="text-[16px] neuem leading-[129%] text-[#000] opacity-[.5]">
                Total Subscribers
              </h2>
              <button className="bg-[#F1F1F1] p-1 w-[140px] min-h-[61px] h-auto rounded-[20px] border border-[#9F9F9F] text-[20px] text-[#000] neuem leading-[129%]">
              {digitalSalesData?.length}
              </button>
            </div>
            <div className="w-[1px] bg-[#D9D9D9] h-[66px]"></div>
            <div className="flex flex-col items-center gap-[26px]">
              <h2 className="text-[16px] neuem leading-[129%] text-[#000] opacity-[.5]">
                Total Amount Paid
              </h2>
              <button className="bg-[#F1F1F1] p-1 w-[140px] min-h-[61px] h-auto rounded-[20px] border border-[#9F9F9F] text-[20px] text-[#000] neuem leading-[129%]">
                $0
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:hidden flex-row items-center justify-between mt-[36px] w-[95%] lg:w-[90%]">
        <div className="dropdown dropdown-bottom dropdown-hover">
          <label
            tabIndex={0}
            className="text-[13px] rounded-[10px] flex flex-wrap flex-row w-auto py-3 px-2 gap-2 neuem leading-[129%] text-[#000]  m-1 bg-[#fff] border-[0.25px] hover:bg-[#fff] hover:border-[0.25px] hover:border-[#A9A7A7]  border-[#A9A7A7]"
          >
            Standard Tier
            <img
              src="/admin_section/general/arrow.svg"
              className="transform"
              alt="arrow"
            />
          </label>
          <ul
            tabIndex={0}
            className="mt-2 z-30 shadow-[0px_4px_46p_x0px_rgba(0,0,0,0.25)] h-auto dropdown-content gap-[20px] flex flex-col items-center justify-center menu border-[0.25px] border-[#A9A7A7] bg-[#fff] p-5 rounded-[10px] w-auto"
          >
            <h1
              className={"neuem-medium text-[18px] text-[#000] leading-[129%]"}
            >
              Standard Tier
            </h1>
            <div className="flex flex-row gap-[30px] items-center h-auto">
              <div className="flex flex-col items-center gap-[18px]">
                <h2 className="text-[10px] neuem leading-[129%] text-[#000] opacity-[.5]">
                  Total Subscribers
                </h2>
                <button className="bg-[#F1F1F1] p-1 w-[100px] min-h-[50px] h-auto rounded-[20px] border border-[#9F9F9F] text-[15px] text-[#000] neuem leading-[129%]">
                {digitalSalesData?.length}
                </button>
              </div>
              <div className="w-[1px] bg-[#D9D9D9] h-[66px]"></div>
              <div className="flex flex-col items-center gap-[18px]">
                <h2 className="text-[10px] neuem leading-[129%] text-[#000] opacity-[.5]">
                  Total Amount Paid
                </h2>
                <button className="bg-[#F1F1F1] p-1 w-[100px] min-h-[50px] h-auto rounded-[20px] border border-[#9F9F9F] text-[15px] text-[#000] neuem leading-[129%]">
                  $328732
                </button>
              </div>
            </div>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom dropdown-hover dropdown-end ">
          <label
            tabIndex={0}
            className="text-[13px] rounded-[10px] flex flex-wrap flex-row w-auto py-3 px-2 gap-2 neuem leading-[129%] text-[#000]  m-1 bg-[#fff] border-[0.25px] hover:bg-[#fff] hover:border-[0.25px] hover:border-[#A9A7A7]  border-[#A9A7A7]"
          >
            Merchant Tier
            <img
              src="/admin_section/general/arrow.svg"
              className="transform"
              alt="arrow"
            />
          </label>
          <ul
            tabIndex={0}
            className="translate-x-20 mt-2 z-30 shadow-[0px_4px_46p_x0px_rgba(0,0,0,0.25)] h-auto dropdown-content gap-[20px] flex flex-col items-center justify-center menu border-[0.25px] border-[#A9A7A7] bg-[#fff] p-5 rounded-[10px] w-auto"
          >
            <h1
              className={"neuem-medium text-[18px] text-[#000] leading-[129%]"}
            >
              Merchant Tier
            </h1>
            <div className="flex flex-row gap-[30px] items-center h-auto">
              <div className="flex flex-col items-center gap-[18px]">
                <h2 className="text-[10px] neuem leading-[129%] text-[#000] opacity-[.5]">
                  Total Subscribers
                </h2>
                <button className="bg-[#F1F1F1] p-1 w-[100px] min-h-[50px] h-auto rounded-[20px] border border-[#9F9F9F] text-[15px] text-[#000] neuem leading-[129%]">
                  23452
                </button>
              </div>
              <div className="w-[1px] bg-[#D9D9D9] h-[66px]"></div>
              <div className="flex flex-col items-center gap-[18px]">
                <h2 className="text-[10px] neuem leading-[129%] text-[#000] opacity-[.5]">
                  Total Amount Paid
                </h2>
                <button className="bg-[#F1F1F1] p-1 w-[100px] min-h-[50px] h-auto rounded-[20px] border border-[#9F9F9F] text-[15px] text-[#000] neuem leading-[129%]">
                  $328732
                </button>
              </div>
            </div>
          </ul>
        </div>
        <div className="dropdown dropdown-bottom dropdown-hover dropdown-end">
          <label
            tabIndex={0}
            className="text-[13px] rounded-[10px] flex flex-wrap flex-row w-auto py-3 px-2 gap-2 neuem leading-[129%] text-[#000]  m-1 bg-[#fff] border-[0.25px] hover:bg-[#fff] hover:border-[0.25px] hover:border-[#A9A7A7]  border-[#A9A7A7]"
          >
            All Subscribers
            <img
              src="/admin_section/general/arrow.svg"
              className="transform"
              alt="arrow"
            />
          </label>
          <ul
            tabIndex={0}
            className="mt-2 z-30 shadow-[0px_4px_46p_x0px_rgba(0,0,0,0.25)] h-auto dropdown-content gap-[20px] flex flex-col items-center justify-center menu border-[0.25px] border-[#A9A7A7] bg-[#fff] p-5 rounded-[10px] w-auto"
          >
            <h1
              className={"neuem-medium text-[18px] text-[#000] leading-[129%]"}
            >
              All Subscribers
            </h1>
            <div className="flex flex-row gap-[30px] items-center h-auto">
              <div className="flex flex-col items-center gap-[18px]">
                <h2 className="text-[10px] neuem leading-[129%] text-[#000] opacity-[.5]">
                  Total Subscribers
                </h2>
                <button className="bg-[#F1F1F1] p-1 w-[100px] min-h-[50px] h-auto rounded-[20px] border border-[#9F9F9F] text-[15px] text-[#000] neuem leading-[129%]">
                  23452
                </button>
              </div>
              <div className="w-[1px] bg-[#D9D9D9] h-[66px]"></div>
              <div className="flex flex-col items-center gap-[18px]">
                <h2 className="text-[10px] neuem leading-[129%] text-[#000] opacity-[.5]">
                  Total Amount Paid
                </h2>
                <button className="bg-[#F1F1F1] p-1 w-[100px] min-h-[50px] h-auto rounded-[20px] border border-[#9F9F9F] text-[15px] text-[#000] neuem leading-[129%]">
                  $328732
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
