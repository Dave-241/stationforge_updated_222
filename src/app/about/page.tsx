"use client";
import Header from "@/app/general_components/header";
import Loader from "@/app/general_components/loader";
import Settings_modal from "@/app/general_components/settings";
import { useProfile_Context } from "@/app/utils/profile_context";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Subscription_Hero from "../subscriptions/hero";
import Profile_dropdown from "@/app/general_components/profile_dropdown";
import About_hero from "./about_hero";
import Welcome_pack from "./welcome_pack";
import Model_delivery from "./model_delivery";
import Pre_support from "./pre_support";
import Terms from "./terms";
import Thanks from "./thanks";
import { FadeInTransition } from "react-transitions-library";
import Forge from "../general_components/forge";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    forge_loader,
  }: any = useProfile_Context();

  useEffect(() => {
    setpage_loader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {page_loader && <Loader />}
      {forge_loader && <Forge />}

      <div className="w-full h-fit z-[99]  fixed top-[1vw] ">
        <Header />
      </div>
      <Profile_dropdown />
      {show_setting_modal && <Settings_modal />}

      <Subscription_Hero />
      <FadeInTransition
        timeout={1500}
        from={0}
        to={1}
        in={true}
        style={{ width: "100%" }}
      >
        <About_hero />
        <Welcome_pack />
        <Model_delivery />
        <Pre_support />
        <Terms />
        <Thanks />
      </FadeInTransition>
      <div className="w-full h-[30vw] "></div>
    </>
  );
}
