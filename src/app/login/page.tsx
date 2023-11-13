"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import Login_component from "./login";
import Header from "../general_components/header";
import { useProfile_Context } from "../utils/profile_context";
import Loader from "../general_components/loader";

export default function Login() {
  const { setpage_loader, page_loader }: any = useProfile_Context();
  useEffect(() => {
    setpage_loader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {page_loader && <Loader />}
      <div className="w-full h-fit z-[99] sm:h-[20vw]  fixed top-[0vw] ">
        <Header />
      </div>
      <Login_component />
    </>
  );
}
