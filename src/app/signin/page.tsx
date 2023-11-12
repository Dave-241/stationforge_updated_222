"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Signin_component from "./signin";
import Header from "../general_components/header";
import { useProfile_Context } from "../utils/profile_context";
import Loader from "../general_components/loader";

export default function Signin() {
  const { page_loader, setpage_loader }: any = useProfile_Context();

  useEffect(() => {
    setpage_loader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {page_loader && <Loader />}

      <Header />
      <Signin_component />
    </>
  );
}
