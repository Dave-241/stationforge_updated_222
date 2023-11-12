"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useProfile_Context } from "../utils/profile_context";
import Header from "./header";
import Home_hero_onboarding from "./hero";
import Fractions_onboarding from "./left_fractions";
import Products_onboarding from "./right_products";
import Step_four from "./step4";

// import Post_wrap from "./post_wrap";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
  }: any = useProfile_Context();

  useEffect(() => {
    // Add a class to the body element
    document.body.classList.add("add_onboarding");

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("add_onboarding");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <>
      <Header />
      <Step_four />
      <div className="w-full h-full  z-[0] overflow-hidden  fixed top left-0"></div>
      <Home_hero_onboarding />
      <div className="w-full h-auto  pt-[3vw] padding">
        <div className="w-full h-auto  flex ">
          <Fractions_onboarding />
          <Products_onboarding />
        </div>
      </div>
    </>
  );
}
