"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FadeInTransition } from "react-transitions-library";

const Comments_modal = (props: any) => {
  const { commentwrap, hide } = props;

  const ref = useRef<any>(null);
  useEffect(() => {
    function handleClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        hide(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This click handler is added to stop propagation of the click event when clicked inside the modal.
  function handleModalClick(event: any) {
    event.stopPropagation();
  }
  return (
    <>
      <div
        className="w-full flex justify-center items-center h-full fixed  top-0 left-0 bg-black bg-opacity-[30%] comment_wrap  z-[9999]"
        onClick={() => hide(false)}
      >
        <FadeInTransition
          timeout={1500}
          from={0}
          to={1}
          in={true}
          ref={ref}
          style={{
            width: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleModalClick}
        >
          <div className="bg-black relative rounded-[2vw] pb-[2vw] w-[34vw] gap-[1vw] h-[34vw] flex items-start justify-start flex-col overflow-hidden ">
            <div className="flex sticky top-0 justify-between border-b-[white] border-opacity-[20%] border-b-[0.1vw] items-center px-[2vw]  w-full  py-[1vw]  bg-black">
              <p className="text-white neuer text-[1.2vw]">
                Viewing {commentwrap.length} Comments
              </p>
              <i
                className="text-[1.6vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] text-white bi bi-x-circle"
                onClick={() => {
                  hide(false);
                }}
              ></i>
            </div>

            {/* the main comment section */}
            <div className="w-full  flex flex-col gap-[1.5vw]  overflow-y-scroll scroll-container px-[2vw] h-auto">
              {commentwrap.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-full flex  gap-[1vw] items-center h-auto "
                  >
                    <div
                      className="w-[3.4vw] h-[3vw] overflow-hidden avater_bg  rounded-[100%] "
                      style={{
                        backgroundImage: `url(${
                          e.avatar == " "
                            ? "https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*1fp3284*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODA5NzgyNC4zOC4xLjE2OTgxMDYzNjguMTcuMC4w"
                            : e.avatar
                        })`,
                      }}
                    >
                      <Image
                        src={e.avatar}
                        alt="comment images"
                        className="w-fit h-full"
                        unoptimized
                        width="0"
                        height="0"
                      />{" "}
                    </div>
                    <div className="w-full h-auto ">
                      <p className="text-[0.7vw] capitalize neuer text-white text-opacity-[90%]">
                        {e.name}
                      </p>
                      <p className="text-[1vw] neuer text-white text-opacity-[50%]">
                        {e.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInTransition>
      </div>
    </>
  );
};

export default Comments_modal;
