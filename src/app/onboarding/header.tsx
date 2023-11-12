"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useProfile_Context } from "../utils/profile_context";
import logo from "../../../public/logo.webp";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { useOnboarding_Context } from "../utils/onboarding_context";
import Step_one from "./step1";

const Header = () => {
  const [opacity, setopacity] = useState(0.5);

  const [links, setlinks] = useState([
    {
      txt: "Physical store",
      link: "/null",
    },
    {
      txt: " Digital store",
      link: "/null22",
    },
    {
      txt: "  Subscriptions",
      link: "/subscriptions",
    },
    {
      txt: "    Community",
      link: "/null333",
    },
    {
      txt: "    Support",
      link: "/support",
    },
  ]);

  initializeApp(firebaseConfig);
  const { step }: any = useOnboarding_Context();

  return (
    <header className="w-full z-[100]  h-[4.7vw] bg-transparent fixed  top-[2.5vw] flex justify-center ">
      <nav className="w-[90%] h-full pr-[1.3vw]  bg-[#0A0B0B] border-[#CCFF00] border-opacity-[5%] border rounded-[1.06vw] flex justify-between relative items-center backdrop-blur-[14px] bg-opacity-[30%] ">
        {/* logo image */}
        <div className="" style={{ opacity: opacity }}>
          <div
            aria-label="StationForge Home"
            className="= w-[10vw] h-auto flex"
          >
            <Image
              src={logo}
              alt="StationForge Logo"
              className="w-full h-fit"
            />
          </div>
        </div>

        {/* nav array list  */}
        <div
          style={{ opacity: opacity }}
          className="neuer  flex items-center gap-[1.8vw] capitalize text-[1vw]"
        >
          {links.map((e: any, index: any) => {
            return (
              <>
                <div
                  key={index}
                  className={`  text-opacity-[70%] transition duration-[0.3s]  h-full ${
                    e.link == "/"
                      ? "text-black bg-white py-[0.5vw] px-[1vw] rounded-[1.2vw] text-opacity-[100%]"
                      : "text-white"
                  } `}
                >
                  {e.txt}
                </div>
              </>
            );
          })}
        </div>

        {/* navigation list  */}
        <div className="text-white  flex gap-[0.9vw] text-[1vw] items-center justify-center">
          <div
            style={{ opacity: step == 1 ? "" : opacity }}
            className=" py-[0.7vw] border-white border neuem px-[0.9vw] rounded-[0.8vw]  hover:bg-[#CCFF00] hover:bg-opacity-[30%] transition duration-[0.3s] "
          >
            {" "}
            <i className="bi bi-bag-fill"></i> Forge
          </div>{" "}
          <button
            className="  py-[0.7vw]  px-[0.9vw]  border-transparent border rounded-[0.8vw] text-black bg-white hover:bg-[#CCFF00] hover:text-white hover:bg-opacity-[30%] transition duration-[0.3s] profile_btn font-[600]"
            style={{ opacity: opacity }}
          >
            Profile
          </button>
        </div>
      </nav>
      <Step_one />
    </header>
  );
};

export default Header;
