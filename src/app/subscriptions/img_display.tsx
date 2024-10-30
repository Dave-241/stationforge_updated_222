"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FadeInTransition } from "react-transitions-library";
import logo from "../../../public/logo.webp";

const Image_display = (props: any) => {
  const {
    img_display_arr,
    setimg_display_arr,
    img_display,
    setimg_display,
    setimg_display_show,
    video,
    setvideo,
  } = props;
  const [items, setitems] = useState(["", "", "", "", "", ""]);

  const videoExtensions = [
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "flv",
    "wmv",
    "3gp",
    "mpeg",
    "ogv",
    "ogg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  // THIS IS FOR THE LEFT CLICK AND THE RIGHT CLIECK
  const handleLeftClick = (e: any) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTranslateX(translateX + 100 / img_display_arr.length); // Adjust 100 to your container width
    }
  };

  const handleRightClick = (e: any) => {
    e.stopPropagation();

    if (currentIndex < img_display_arr.length - 1) {
      // Adjust based on the number of img_display_arr you want to show at once
      setCurrentIndex(currentIndex + 1);
      setTranslateX(translateX - 100 / img_display_arr.length); // Adjust 100 to your container width
    }
  };
  return (
    <>
      {" "}
      <div
        className="w-full flex justify-center items-center h-full fixed  top-0 left-0 bg-black bg-opacity-[97%]  gap-[3vw] comment_wrap  z-[9999] py-[10vw]  "
        onClick={() => {
          setimg_display_show(false);
        }}
      >
        <div className="w-full h-[6vw] absolute px-[3vw] flex sm:top-[5vw] justify-between items-center sm:justify-end  top-0 left-0">
          <Image
            src={logo}
            alt="Station forge logo"
            className="w-[10vw] sm:hidden h-fit"
          />

          <i
            className="text-[2vw] sm:text-[7vw] h-fit hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] text-white bi bi-x-circle"
            onClick={() => {
              setimg_display_show(false);
            }}
          ></i>
        </div>

        {/* Thumbnails */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              handleLeftClick(e);
            }}
            className="absolute md:left-[2%] translate-y-[-50%] top-[50%] sm:left-[2vw] z-[9] bg-[black] bg-opacity-[39%] backdrop-blur-md md:rounded-[13px] sm:hidden md:px-[0.4rem] md:py-[0.6rem]"
          >
            <i className="bi bi-chevron-left text-white font-bold text-xl"></i>
          </button>
        )}

        {currentIndex < img_display_arr.length - 1 && (
          <button
            onClick={(e) => {
              handleRightClick(e);
            }}
            className="absolute md:right-[2%] translate-y-[-50%] top-[50%] sm:right-[2vw] z-[9] bg-[black] bg-opacity-[39%] backdrop-blur-md md:rounded-[13px] sm:hidden md:px-[0.4rem] md:py-[0.6rem]"
          >
            <i className="bi bi-chevron-right text-white font-bold text-xl"></i>
          </button>
        )}
        <FadeInTransition
          timeout={1500}
          from={0}
          to={1}
          in={true}
          //   ref={ref}
          style={{
            width: "auto",
            gap: "2rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
          //   onClick={handleModalClick}
        >
          {/* <div
            className="w-[40vw] max-h-[95vh] sm:max-h-[70vh]  sm:w-[80vw] h-full  overflow-hidden flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {video ? (
              <video
                src={img_display}
                playsInline
                controls
                className="w-full aspect-[16/9]"
              ></video>
            ) : (
              <Image
                src={img_display}
                width="0"
                height="0"
                alt="main display image"
                className="w-full h-fit"
                unoptimized
              />
            )}
          </div> */}

          <div
            className="relative border2 max-h-[90vh] h-[30rem] md:w-[30rem]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {img_display_arr.map((e: any, index: any) => {
              const isVideoLink = videoExtensions.some((ext) =>
                e.link.includes(`.${ext}`),
              );
              // if (isVideoLink) {
              //   return (
              //     <div
              //       key={index}
              //       className={`w-[5vw] h-[5vw] sm:w-[15vw] sm:h-[15vw] hover:scale-[1.07] transition duration-[0.6s]
              //       ${
              //         e.link == img_display
              //           ? "border-[0.3vw] sm:border-[1vw] border-opacity-[80%] border-[#CCFF00] "
              //           : " border-[0.1vw]  border-opacity-[20%] border-white "
              //       }
              //       overflow-hidden  cursor-pointer avater_bg rounded-[0.8vw]`}
              //       onClick={() => {
              //         setvideo(true);
              //         setimg_display(e.link);
              //       }}
              //       style={{
              //         backgroundImage: `url(/subscription/video_loader.webp)`,
              //       }}
              //     >
              //       {" "}
              //       <video
              //         src={e.link}
              //         playsInline
              //         className="aspect-[1/0.9] scale-y-[2.3] scale-x-[1.8] w-full"
              //       ></video>
              //     </div>
              //   );
              // } else {
              //   return (
              //     <div
              //       key={index}
              //       className={`w-[5vw] h-[5vw] sm:w-[15vw] sm:h-[15vw]  hover:scale-[1.07] transition duration-[0.6s]
              //        ${
              //          e.link == img_display
              //            ? "border-[0.3vw] sm:border-[1vw] border-opacity-[80%] border-[#CCFF00] "
              //            : " border-[0.1vw]  border-opacity-[20%] border-white "
              //        } cursor-pointer avater_bg rounded-[0.8vw] overflow-hidden `}
              //       onClick={() => {
              //         setvideo(false);
              //         setimg_display(e.link);
              //       }}
              //       // style={{ backgroundImage: `url(${e.link})` }}
              //     >
              //       <img
              //         src={e.link}
              //         alt={index + "bg images"}
              //         className="h-full w-full  cursor-pointer"
              //       />
              //     </div>
              //   );
              // }

              return (
                <div
                  key={index}
                  className={`  w-full ${
                    currentIndex == index ? "" : "opacity-0"
                  } top-[50%] translate-x-[-50%] left-[50%] absolute translate-y-[-50%]`}
                  // onClick={() => {
                  //   setvideo(false);
                  //   setimg_display(e.link);
                  // }}
                  // style={{ backgroundImage: `url(${e.link})` }}
                >
                  <img
                    src={e.link}
                    alt={index + "bg images"}
                    className=" w-full "
                  />
                </div>
              );
            })}
          </div>

          <p className="text-white">
            {currentIndex + 1}/ {img_display_arr.length}
          </p>
        </FadeInTransition>
      </div>
    </>
  );
};

export default Image_display;
