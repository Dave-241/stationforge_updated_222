"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../../public/logo.webp";
import { usePathname } from "next/navigation";
import searchimg from "../../../public/support/search_icon.png";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../utils/fire_base_config";
import axios from "axios";
import { useProfile_Context } from "../utils/profile_context";

const Header = () => {
  const [nav_array, setnav_array] = useState([
    {
      link: "/admin/dashboard",
      txt: "Dashboard",
    },
    {
      link: "/n2",
      txt: "Digital sales",
    },
    {
      link: "/n3",
      txt: "Digital Uploads",
    },
    {
      link: "/admin/postinsight",
      txt: "Posts & Insights",
    },
  ]);

  initializeApp(firebaseConfig);
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();

  // init authentication
  const auth: any = getAuth();
  const pathname = usePathname();

  // // Use useEffect to check if the user is already authenticated
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is authenticated, redirect to a protected route
  //       // router.push("/"); // Replace with your protected route
  //       console.log(user);
  //       user.getIdTokenResult().then((idTokenResult) => {
  //         const isAdmin = idTokenResult.claims.admin === true;
  //         if (isAdmin) {
  //           console.log("The user is an admin." + idTokenResult.claims.admin);
  //         } else {
  //           console.log("The user is not an admin.");
  //         }
  //       });
  //     } else {
  //       console.log("not logged in"); // User is not authenticated, you can keep them on the current page or redirect them to a login page
  //     }
  //   });

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const handlecustomclaim = async () => {};

  return (
    <>
      <div className="w-full fixed top-[1vw] right-0 h-auto px-[2vw] z-[999]">
        <nav className="w-full bg-[#000002] drop-shadow-2xl rounded-[2vw] flex items-center justify-between h-[6vw] px-[2vw]">
          {/* logo */}
          <Link
            href={"/"}
            onClick={() => {
              if (pathname == "/") {
                setpage_loader(false);
              } else {
                setpage_loader(true);
              }
            }}
          >
            <Image
              src={logo}
              alt="Stationforge logo"
              className="w-[10vw] h-fit"
            />
          </Link>

          {/* the linking options */}
          <div className="w-auto flex justify-center  items-center gap-[2vw] ">
            {nav_array.map((e: any, index: any) => {
              return (
                <Link
                  key={index}
                  onClick={() => {
                    if (pathname == "/admin/postinsight") {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  href={e.link}
                  className={`text-[0.9vw]   transition duration-[0.3s] hover:text-opacity-[100%] h-full ${
                    pathname == e.link
                      ? "text-white text-opacity-[100%]  bg-[#161515] py-[0.5vw] px-[1vw] rounded-[1.2vw] "
                      : "text-white text-opacity-[40%]"
                  } `}
                >
                  {e.txt}
                </Link>
              );
            })}
          </div>

          {/* the search , moderator and other actions */}
          <div className="w-auto flex items-center justify-center  gap-[1vw] ">
            {/* this is the input field  */}
            <div className="w-auto  items-center  flex justify-center  relative ">
              <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
                <Image
                  src={searchimg}
                  alt="Search icon image"
                  className="w-[1.3vw]  h-fit"
                />
              </div>
              <input
                type="text"
                placeholder="Search dashboard"
                className="h-[3vw] w-[23vw]  text-white neuer text-[0.9vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-transparent  border-white border-opacity-[30%] border-[0.1vw]"
              />
            </div>

            <Link
              href={"/"}
              className="text-white border-[0.1vw] border-white border-opacity-[30%] rounded-[1.6vw] py-[0.8vw] px-[1.6vw] hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black  text-[0.8vw]"
            >
              Add a moderator
            </Link>

            <button
              className="w-[2.5vw] h-[2.5vw] border-[0.1vw] border-white border-opacity-[30%] flex justify-center items-center hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black    text-white text-[1.2vw] rounded-[100%]"
              onClick={handlecustomclaim}
            >
              {" "}
              <i className="bi bi-bell"></i>
            </button>
            <button className="w-[2.5vw] h-[2.5vw] border-[0.1vw] border-white border-opacity-[30%] flex justify-center hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black    items-center  text-white text-[1.2vw] rounded-[100%]">
              <i className="bi bi-chat-dots"></i>
            </button>
            <div
              className="w-[3vw] h-[3vw]  rounded-[100%] avater_bg "
              style={{
                backgroundImage:
                  "url(https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*18pfgon*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODU4MTA5Ny40OC4xLjE2OTg1ODExNDEuMTYuMC4w)",
              }}
            ></div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
