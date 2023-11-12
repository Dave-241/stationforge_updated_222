"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useProfile_Context } from "../utils/profile_context";
import Loader from "../general_components/loader";
import Header from "../general_components/header";
import Settings_modal from "../general_components/settings";
import Profile_dropdown from "../general_components/profile_dropdown";
import Subscription_Hero from "./hero";
import Subscription_Plans from "./subscription_plans";
import { FadeInTransition } from "react-transitions-library";
import Post_wrap from "./post_wrap";
import Forge from "../general_components/forge";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
    forge_loader,
  }: any = useProfile_Context();

  useEffect(() => {
    setpage_loader(false);
    setfrom("");
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
        <Subscription_Plans />
        <Post_wrap />
      </FadeInTransition>

      <div className="w-full h-[15vw] "></div>
    </>
  );
}
