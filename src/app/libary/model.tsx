"use client ";

import React, { useEffect, useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import searchimg from "../../../public/support/search_icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProfile_Context } from "../utils/profile_context";
import Link from "next/link";
import Download_modal from "./download_modal";

const Models_in_libary = (props: any) => {
  const route = useRouter();
  const {
    products,
    setshow_download_modal,
    setdownloadmodal_png_link,
    setdownloadmodal_pngwith_model,
    libraryItems,
    setdownload_text,
    setcurrently_downloading_id,
  } = props;
  const [opacity, setopacity] = useState(0.5);
  useEffect(() => {
    localStorage.setItem("downloadid", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { toggleDropdown, setpage_loade, download_product_id }: any =
    useProfile_Context();
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[date.getMonth()];
  const [local_product_id, setlocal_product_id] = useState("");

  const [items, setitems] = useState([
    {
      img: "/onboarding/1.webp",
      txt: "Grimguard seargeant A",
      price: "343",
    },
    {
      img: "/onboarding/2.webp",
      txt: "Grimguard officer",
      price: "343",
    },
    {
      img: "/onboarding/3.webp",
      txt: "Grimguard priest",
      price: "343",
    },
    {
      img: "/onboarding/4.webp",
      txt: "Orkaz Strappaz Front",
      price: "343",
    },
    {
      img: "/onboarding/5.webp",
      txt: "Orkaz Strappaz Sideback",
      price: "343",
    },
    {
      img: "/onboarding/6.webp",
      txt: "Orkaz Strappaz Side",
      price: "343",
    },
    {
      img: "/onboarding/7.webp",
      txt: "Orkaz Strappaz Face",
      price: "343",
    },
    {
      img: "/onboarding/8.webp",
      txt: "Vaskar Orkaz Hunter Front",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
    {
      img: "/onboarding/5.webp",
      txt: "Orkaz Strappaz Sideback",
      price: "343",
    },
    {
      img: "/onboarding/6.webp",
      txt: "Orkaz Strappaz Side",
      price: "343",
    },
    {
      img: "/onboarding/7.webp",
      txt: "Orkaz Strappaz Face",
      price: "343",
    },
    {
      img: "/onboarding/8.webp",
      txt: "Vaskar Orkaz Hunter Front",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
  ]);
  const handledownload = (png: any, model: any, title: any, id: any) => {
    setdownloadmodal_png_link(png);
    setdownload_text(title);
    setdownloadmodal_pngwith_model(model);
    setcurrently_downloading_id(id);
    setshow_download_modal(true);
  };

  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const storedDownloadProgressid = localStorage.getItem("downloadid");

      if (storedDownloadProgressid == null) {
        setlocal_product_id("");
      } else if (storedDownloadProgressid == "0") {
        setlocal_product_id("");
        return;
      } else {
        setlocal_product_id(storedDownloadProgressid);
      }
      // console.log("this is runin");
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-[68%]  h-auto pb-[1vw] pt-[2.26vw]  border-r-[white] border-r-[0.1vw]  border-l-[white] border-l-[0.13vw] border-opacity-[10%]  flex flex-col gap-[1vw]">
        <div className="w-full flex justify-between items-center pb-[1vw] px-[2vw]">
          <h3 className="neuer text-[2.2vw] text-white ">All Models</h3>
          <div className="w-auto relative z-[999999999]">
            <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
              <Image
                src={searchimg}
                unoptimized
                width="0"
                height="0"
                alt="Search icon image"
                className="w-[1.3vw]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Search model"
              className="h-[3vw] w-[23vw] placeholder:text-white text-white neuer text-[1.1vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
            />
          </div>
        </div>
        <div className="h-[0.1vw] bg-white  bg-opacity-[10%] w-full"></div>

        <div className="w-full flex flex-wrap justify-start px-[1.8vw] gap-[1.7vw]">
          {libraryItems.map((e: any, index: any) => {
            // if (index == 9 ) {

            // }
            return (
              <>
                <div
                  key={index}
                  //   scroll={true}
                  className="w-[19.7vw]  border-white  border border-opacity-[30%] overflow-hidden cursor-pointer hover:scale-[1.008] transition duration-[0.6s] h-auto flex flex-col gap-[1.3vw] rounded-[2vw]"
                >
                  <div className="w-full avater_bg h-[20vw] overflow-hidden">
                    <Image
                      src={e.coverImage}
                      alt={e.title}
                      unoptimized
                      width="0"
                      height="0"
                      className="w-full h-full scale-[1.2]"
                    />
                  </div>
                  <div className="w-full px-[1vw] flex justify-between  items-center">
                    <p className="neuem text-[1.2vw] text-white">{e.title}</p>
                  </div>
                  <div className="w-full  flex px-[1vw]  mb-[1vw] justify-between items-center ">
                    <button
                      className="bg-[#CCFF00] hover:bg-opacity-[70%]   rounded-[1.2vw] py-[0.5vw] px-[1.8vw] neuer text-black w-fit h-fit  text-[1vw]"
                      style={{
                        backgroundColor: e.downloaded ? "#111111" : "#CCFF00",
                        color: e.downloaded ? "#B7B7B7" : "black",
                      }}
                      disabled={e.downloaded}
                      onClick={() => {
                        if (e.download) {
                          return;
                        } else if (e.id == local_product_id) {
                          return;
                        } else {
                          handledownload(
                            e.downloadPngLink,
                            e.downloadPngModelLink,
                            e.title,
                            e.id,
                          );
                        }
                      }}
                    >
                      {e.downloaded
                        ? "Downloaded "
                        : e.id == local_product_id
                        ? "Downloading"
                        : "Download"}
                    </button>

                    <p className="text-[1vw] text-white text-opacity-[50%] neuer">
                      In Library
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Models_in_libary;
