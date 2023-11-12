"use client ";

import React, { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";

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
import { initializeApp } from "firebase/app";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Profile_dropdown = () => {
  const { show, setshow, setshow_setting_modal, setpage_loader }: any =
    useProfile_Context();
  //   const [opacity, setopacity] = useState(0);
  const ref = useRef<any>(null);

  initializeApp(firebaseConfig);

  // init authentication
  const auth = getAuth();

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (event.target.classList.contains("profile_btn")) {
          return;
        } else if (event.target.classList.contains("setting_modal")) {
          return;
        } else if (event.target.classList.contains("settings")) {
          return;
        } else {
          setshow(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlelogout = () => {
    signOut(auth)
      .then((e) => {
        // Sign-out successful.
        setshow(false);
      })
      .catch((error) => {
        // An error occurred during sign-out.
        console.error("Sign-out error:", error);
      });
  };
  const pathname = usePathname();
  return (
    <>
      {show ? (
        <>
          <div
            className="fixed top-[8vw] right-[5%] w-[12vw] h-[13vw]   z-[999]"
            ref={ref}
          >
            <div className="bg-white h-full w-full rounded-[1vw] flex flex-col">
              <div className="border-b-[lightgrey] border-b items-end flex pb-[0.5vw] px-[1vw] h-[28%]">
                <button className="neuem text-[1vw] hover:text-[lightgrey] font-[600]">
                  {" "}
                  <i className="bi bi-chat-dots"></i> Talk to us
                </button>
              </div>
              <div className="border-b-[lightgrey] flex flex-col border-b h-[44%] px-[1vw] justify-between py-[0.7vw] items-start">
                <Link
                  href={"/libary"}
                  onClick={() => {
                    if (pathname == "/libary") {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  className="neuem text-[1vw] hover:text-[lightgrey] font-[600]"
                >
                  {" "}
                  <i className="bi bi-phone"></i> Libary
                </Link>
                <button
                  className="neuem text-[1vw] hover:text-[lightgrey] font-[600]"
                  onClick={() => {
                    setshow_setting_modal(true);
                  }}
                >
                  <i className="bi bi-gear"></i> Settings
                </button>
              </div>
              <div className="h-[28%] flex  px-[1vw]  pt-[0.6vw] items-start">
                <button
                  className="neuem text-[1vw] hover:text-[lightgrey] font-[600]"
                  onClick={handlelogout}
                >
                  <i className="bi bi-box-arrow-left"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Profile_dropdown;
