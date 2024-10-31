"use client";

import { useProfile_Context } from "@/app/utils/profile_context";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import Link from "next/link";

const Add_subscription_tiers = () => {
  const router = useRouter();

  const item = ["", ""];
  const { setpage_loader }: any = useProfile_Context();

  //   THIS IS FOR THE TINY MCE EDITOR
  //   THIS IS FOR THE TINY MCE EDITOR
  //   THIS IS FOR THE TINY MCE EDITOR
  //   THIS IS FOR THE TINY MCE EDITOR
  const [value, setValue] = useState("");

  const onEditorInputChange = (newValue: any, editor: any) => {
    setValue(newValue);

    console.log("new value");
    // setText(editor.getContent());
  };
  return (
    <>
      <div className="flex flex-col gap-[1.5rem] ">
        <div className="relative  sm:pb-[2rem]">
          <button
            className="text-base  neuem "
            onClick={() => {
              router.back();
            }}
          >
            {" "}
            <i className="bi bi-chevron-left"></i> Back
          </button>
          <p
            style={{ whiteSpace: "nowrap" }}
            className="neueb absolute bottom-0 left-[50%] translate-x-[-50%]"
          >
            ADD SUBSCRIBTION TIER
          </p>
        </div>{" "}
        <div className="flex items-center gap-[1rem] w-[35rem] mx-auto text-[#353232] text-opacity-[50%] max-w-full  ">
          <i className="bi bi-exclamation-circle-fill"></i>
          <p className="neuem text-sm">
            From this viewpoint , you can set a tier name, category, access,
            license, pricing and description early bed seat limit and pricing
            cannot be changed once set
          </p>
        </div>
        {/* the forms */}
        <div className="w-full flex md:w-[60rem] max-w-full sm:w-full mx-auto  neuem items-center  flex-col gap-[2rem]">
          <div className="flex flex-col  w-full gap-[0.5rem]">
            <label className="neueb">Tier name</label>
            <input
              type="text"
              className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%]  bg-white"
              placeholder="Enter tier name *"
            />
          </div>
          {/* hide button */}
          <div className="w-full my-[-1rem]">
            <button className="">
              <i className="bi bi-eye-slash-fill pr-[1rem]"></i>
              Hide
            </button>{" "}
          </div>

          {/* second input form */}
          <div className="flex flex-col  w-full gap-[0.5rem]">
            <label className="neueb">Set seat limit</label>
            <input
              type="number"
              className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%]  bg-white"
              placeholder="Enter seat limit *"
            />
          </div>

          {/* this is for pricing */}
          <div className="flex flex-col pb-[1rem]  w-full gap-[0.5rem]">
            <label className="neueb">Pricing*</label>
            <p className="neuem text-sm  w-[15rem] pb-[2rem]  text-[#353232] text-opacity-[50%] max-w-full">
              Select pricing option for this tier. Note prices cannot be changed
              after addition
            </p>{" "}
            <div className="w-full flex sm:flex-col gap-[1rem]">
              <div className="flex flex-col w-full gap-[0.5rem]">
                <label className="neuer text-base">Price per month</label>
                <input
                  type="number"
                  className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%]  bg-white"
                  placeholder=" 0$"
                />
              </div>
              <div className="flex flex-col w-full gap-[0.5rem]">
                <label className="neuer text-base">Price per year</label>
                <input
                  type="number"
                  className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%]  bg-white"
                  placeholder=" 0$"
                />
              </div>
              <div className="flex flex-col w-full gap-[0.5rem]">
                <label className="neuer text-base">Discount</label>
                <input
                  type="number"
                  className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%]  bg-white"
                  placeholder=" 0%"
                />
              </div>
            </div>
          </div>
          {/* Description on here*/}
          <div className="flex flex-col  w-full gap-[0.5rem]">
            <label className="neueb">Description</label>
            {/* this is for the editor  */}
            <Editor
              apiKey={"o6poh8mrrg3olm60uzci8redu8zma5ystr23b8f78hku2msu"} // your api key here
              onEditorChange={(newValue, editor) =>
                onEditorInputChange(newValue, editor)
              }
              value={value}
              initialValue={"Enter description *"}
            />{" "}
          </div>

          <button
            onClick={() => {}}
            style={{ whiteSpace: "nowrap" }}
            className="bg-[#CCFF00] cursor-pointer py-[1rem] sm:w-full sm:rounded-[0.5rem] hover:bg-opacity-[40%] neuer capitalize flex justify-center items-center text-sm rounded-[1rem] px-[5rem]"
          >
            Publish{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_subscription_tiers;
