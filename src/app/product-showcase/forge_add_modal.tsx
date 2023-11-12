"use client";

import { useEffect, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import test from "../../../public/subscription/post_1.webp";

const AddForgeModal = (props: any) => {
  const { setaddForge_modal, forgeTitle, forgeUrl, already_exist } = props;
  const { setforge_loader, forge_loader }: any = useProfile_Context();
  const [comeup, setcomeup] = useState(false);

  // Function to hide the forge
  const hideaddedForge = () => {
    // setforge_loader(false);
    setcomeup(false);
    setTimeout(() => {
      setaddForge_modal(false);
    }, 400);
  };

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setcomeup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set up the timeout
    const timer = setTimeout(() => {
      setaddForge_modal(false);
    }, 6000); // Delay in milliseconds
    const comeup_timer = setTimeout(() => {
      setcomeup(false);
    }, 5500); // Delay in milliseconds

    // Clean up function
    return () => {
      // Clear the timeout to prevent it from running if the component unmounts
      clearTimeout(comeup_timer);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-[50%] flex  z-[999999] justify-end items-end  pr-[8vw] pb-[4vw] "
        onClick={hideaddedForge} // Hide forge when clicking on the background
      >
        <div
          className={`  z-[1000] h-auto px-[2vw] py-[3vw] w-[25vw] absolute bg-[#111111]  ${
            comeup ? "translate-y-[0vw]" : "translate-y-[30vw]"
          }  overflow-hidden flex flex-wrap flex-col gap-[2vw] relative rounded-[1vw] justify-center items-center`}
          onClick={modalClick}
          style={{ transition: "0.8s ease" }}
        >
          {/* model added to forge section */}
          <div className="flex justify-between w-full items-center">
            <p className="neuer text-white text-[1.2vw]">
              {already_exist
                ? "Model Already exists in forge"
                : "Model added to forge"}
            </p>

            <i
              className="bi bi-x-circle text-white text-opacity-[70%] hover:text-opacity-[100%] cursor-pointer "
              onClick={hideaddedForge}
            ></i>
          </div>

          {/* then for the images */}
          <div className="flex justify-start items-center w-full px-[1vw] border-white border-opacity-[50%] border-[0.1vw] rounded-[1vw] py-[0.7vw] gap-[1.4vw]">
            <Image
              src={forgeUrl}
              unoptimized
              width="0"
              height="0"
              alt="forge image added"
              className="w-[3vw] h-[3vw] "
            />
            <p className="neuer text-[0.9vw] text-white">{forgeTitle}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddForgeModal;
