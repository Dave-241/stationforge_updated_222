import React from "react";
import Sheet from "react-modal-sheet";

type BottomFilterSheetPropTypes = {
  isOpen: boolean;
  setOpen: Function;
  sheetRef: any;
  allYears: number[];
  allMonths: string[];
  selectedMonth: string;
  setSelectedMonth: Function;
};

export default function BottomFilterSheet({
  isOpen,
  setOpen,
  sheetRef,
  allYears,
  allMonths,
  selectedMonth,
  setSelectedMonth,
}: BottomFilterSheetPropTypes) {
  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        disableDrag={false}
        // rootId="root"
        snapPoints={[1000, 700]}
        initialSnap={1}
      >
        <Sheet.Container>
          {/* <Sheet.Header /> */}
          <Sheet.Content
            style={{
              paddingBottom: sheetRef.current?.y,
              backgroundColor: "#D9D9D9",
            }}
          >
            <Sheet.Scroller draggableAt="both">
              <div className="px-5 flex mt-[2rem] items-start justify-start flex-col gap-10 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <p className="font-normal nueu text-black leading-[129%] text-[16px]">
                    Select year
                  </p>
                  <select
                    name=""
                    id=""
                    className="w-full h-[50px] rounded-[10px] px-[19px] bg-[#fff] border-none"
                  >
                    {allYears.map((y, i) => (
                      <option key={i} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-start gap-3 w-full">
                  <p className="font-normal nueu text-black leading-[129%] text-[16px]">
                    Select month
                  </p>
                  <div className="grid grid-cols-3 gap-[15px] w-full rounded-[20px] bg-[#fff] p-[24px]">
                    {allMonths.map((month, i) => (
                      <h4
                        key={i}
                        onClick={() => setSelectedMonth(month)}
                        className={`cursor-pointer text-[10px] lg:text-[12px] nueum font-medium w-[auto] h-[auto] py-[9px] px-[7px] flex items-center justify-center ${
                          selectedMonth == month
                            ? "bg-[#5f7700] text-white"
                            : "bg-[#EEE] text-[#000] "
                        } rounded-[12px]`}
                      >
                        {month}
                      </h4>
                    ))}
                  </div>
                </div>
              </div>

              {/* Some content here that makes the sheet content scrollable */}
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setOpen(false)} />
      </Sheet>
    </>
  );
}
