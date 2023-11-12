"use client";

import React, { useState } from "react";

const Admin_edit_post_preloader = () => {
  const [options, setoptions] = useState([
    { id: 1, label: "Public" },
    { id: 2, label: "Subscribers" },
    { id: 3, label: "Standard Tier Subscribers" },
    { id: 4, label: "Merchant Tier Subscribers" },
  ]);
  return (
    <>
      {" "}
      <div className="w-full  h-auto px-[3.5vw] flex justify-start py-[0vw]  relative">
        <div className="w-[60vw] gap-[3vw] flex flex-col justify-center h-auto ">
          <div className="w-full h-[35vw] px-[5vw] flex flex-col gap-[1.5vw] justify-center items-center bg-white rounded-[2vw]">
            <div className=" flex w-full justify-center items-center flex-col gap-[2vw] ">
              <div className="w-full flex justify-center h-auto  gap-[1vw] flex-wrap ">
                {options.map((e: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="animate-pulse w-[47%] rounded-[1.2vw] bg-[#2d2d2d] h-[10vw]"
                    ></div>
                  );
                })}
              </div>
              <label
                htmlFor="mediaInput"
                className="cursor-pointer bg-[#CCFF00] animate-pulse  text-[#688200] h-[3vw] w-[25vw] rounded-[2vw]"
              ></label>
              <input
                type="file"
                id="mediaInput"
                multiple
                accept="image/*,video/*"
                className="hidden"
                // onChange={handleFileChange}
              />

              {/* {!isfilelaoded && (
                <p className="text-[1.2vw] text-center neuer w-[80%]">
                  Upload or simply drag and drop your media files. You can
                  upload up to 20 media items, including both images and videos{" "}
                </p>
              )} */}
            </div>
          </div>

          {/* now the text upload  */}

          <div className="w-full h-[40vw] relative px-[3vw] flex flex-col gap-[2vw] justify-center items-end bg-white rounded-[2vw]">
            <div className="w-full  flex flex-col gap-[0.5vw] ">
              <label
                htmlFor=""
                className="bg-[#2d2d2d] h-[1.7vw] w-[17vw]  animate-pulse rounded-[2vw]"
              ></label>
              <div className="w-full border-[#C8C8C8] duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] border-[0.1vw] neuer text-[1.2vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw] capitalize bg-[#2d2d2d]  animate-pulse ">
                {" "}
              </div>
            </div>
            <div className="w-full  flex flex-col gap-[0.5vw] ">
              <label
                htmlFor=""
                className="bg-[#2d2d2d] h-[1.7vw] w-[24vw]  animate-pulse rounded-[2vw]"
              ></label>
              <div className="w-full border-[#C8C8C8] duration-[0.6s] transition neuer focus:outline-none focus:border-[#CCFF00] resize-none border-[0.1vw] rounded-[1.1vw] h-[10vw] py-[1vw] text-[1.2vw] px-[1.3vw] bg-[#2d2d2d]  animate-pulse "></div>
            </div>

            <div className="w-full  flex flex-col gap-[0.5vw] ">
              <label
                htmlFor=""
                className="bg-[#2d2d2d]  animate-pulse  h-[1.7vw] w-[10vw] rounded-[2vw]"
              ></label>
              <div className="w-full text-[1.2vw] border-[#C8C8C8] duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] neuer border-[0.1vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw] bg-[#2d2d2d]  animate-pulse ">
                {" "}
              </div>
            </div>

            <button className="w-[10vw] h-[3vw] neuem text-[1.2vw]  text-black mt-[1vw] hover:bg-opacity-[40%] transition duration-[0.6s] rounded-[1.4vw] bg-[#CCFF00]  animate-pulse "></button>

            <p className="absolute neuer w-[30vw] text-[#FF0000]  text-[1vw]  left-[3vw] bottom-[3vw]"></p>
          </div>

          {/* now the sticky bar  */}

          <div className="w-[30vw] z-[99] py-[2vw] px-[2vw] bg-white h-[35vw] rounded-[2vw] fixed right-[3.5vw] top-[10vw] flex flex-col justify-start ">
            <h2 className="h-[2vw] rounded-[2vw]  w-[21vw] bg-[#2d2d2d]  animate-pulse mb-[1.4vw]"></h2>
            <ul className=" flex flex-col gap-[2vw] ">
              {options.map((option) => (
                <li
                  key={option.id}
                  className="flex justify-start cursor-pointer  py-[0.2vw] gap-[2vw] items-center"
                >
                  <div className="w-[2vw] bg-[#2d2d2d]  animate-pulse  h-[2vw]  border-[0.1vw] rounded-[0.4vw]"></div>
                  <p className="h-[2vw] rounded-[2vw]  w-[17vw] bg-[#2d2d2d]  animate-pulse"></p>
                </li>
              ))}
            </ul>

            <button className="absolute bottom-[-4vw] translate-x-[-50%] left-[50%] animate-pulse h-[3vw] w-[20vw] bg-[red] rounded-[2vw]"></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_edit_post_preloader;
