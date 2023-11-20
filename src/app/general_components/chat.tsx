"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import { initializeApp } from "firebase/app";
import exit_modal from "../../../public/mob_ham_exit.webp";
import firebaseConfig from "../utils/fire_base_config";
import station_forge from "../../../public/chats/station_forge.webp";
import avatar from "../../../public/setings/avatar.jpg";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

const Chats_modal = () => {
  const [loading, setloading] = useState(false);

  const {
    show_chat_modal,
    setshow_chat_modal,
    sess_id,
    create_chat_session,
  }: any = useProfile_Context();
  const [hide, sethide] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chats = [
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
  ];

  const [uuid, setuuid] = useState("");
  // useEffect(() => {
  //   setconfirm_ImageWasChanged(ImageWasChanged);
  // }, [ImageWasChanged]);
  const ref_modal = useRef<any>(null);

  const router = useRouter();

  // firebase init
  // Initialize the data base connection
  initializeApp(firebaseConfig);

  // Initialize services

  // get authentication
  const auth: any = getAuth();

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuuid(user.uid);
        // User is authenticated, redirect to a protected route
        // Replace with your protected route
      } else {
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
        router.push("/login");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref_modal.current && !ref_modal.current.contains(event.target)) {
        setshow_chat_modal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sess_id == "") {
      return;
    } else if (sess_id != "") {
      create_chat_session(uuid);
    }
  }, [sess_id, uuid]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollHeight = scrollAreaRef.current.scrollHeight;
      scrollAreaRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const handlesubmit = (e: any) => {
    e.preventDefault();
    scrollToBottom();
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>

      <div
        className={`w-[30vw] sm:w-full fixed pt-[6.5vw] pb-[6vw]  h-[43vw] max-h-[96vh]  sm:py-[5vw] px-[1.5vw]  top-[50%] translate-y-[-50%]  z-[999999]  sm:gap-[4vw]  bg-[#111111] settings flex flex-col gap-[1.5vw] border-[#434343] overflow-hidden ${
          !show_chat_modal ? "right-[-50vw]" : "right-0"
        } border transition duration-[1.5s]`}
        ref={ref_modal}
        style={{ transition: "1.5s ease" }}
      >
        {/* this is for the top relative box  */}
        <div className="w-full fixed top-0 left-0 h-[5.5vw] bg-[#1F1E1E]  bg-opacity-[50%] flex justify-start items-center neuer px-[1.3vw] gap-[1vw] border-b-[0.2vw] border-white border-opacity-[60%]">
          <i
            className="bi bi-chevron-left cursor-pointer text-white text-[1.2vw]"
            onClick={() => {
              setshow_chat_modal(false);
            }}
          ></i>

          <div
            className=" h-[3.2vw] w-[3.2vw] rounded-[100%] avater_bg"
            style={{ backgroundImage: "url(/chats/station_forge.webp)" }}
          ></div>

          {/*the name of the moderator for now its  talk to support */}
          <div className="w-fit  flex-col flex gap-[0.5vw] ">
            <p className="text-[1vw] text-white ">Talk to support</p>
            <p className="text-[0.8vw] text-white  italic text-opacity-[50%]">
              24/7 Support line
            </p>
          </div>
        </div>

        {/* this is for the bottom input for sending messages relative box  */}
        <div className="w-full h-[5.5vw] fixed bottom-0 neuer left-0 bg-[#1F1E1E] rounded-t-[1.7vw]  bg-opacity-[50%] flex justify-center items-center px-[1.3vw]  ">
          <form
            onSubmit={handlesubmit}
            className="h-[3.2vw]   w-full relative "
          >
            <input
              type="text"
              className="w-full h-full pl-[1vw] pr-[5vw] text-white text-opacity-[85%]  bg-[#2C2C2C] bg-opacity-[56%] outline-none border-[0.14vw]  border-opacity-[30%] focus:border-opacity-[70%] border-white transition duration-[0.6s] rounded-[2vw]"
            />

            <button
              type="submit"
              className="absolute hover:bg-opacity-[80%] bg-[#CCFF00] px-[1vw] text-[0.9vw] py-[0.4vw] rounded-[2vw] right-[1vw] top-[50%] translate-y-[-50%]"
            >
              Send
            </button>
          </form>
        </div>
        {/* the date teh chat started  */}

        {/* this is for the chats */}
        <div
          className="w-full flex  overflow-y-scroll cover_scrollbar flex-col   h-full gap-[1.2vw] "
          ref={scrollAreaRef}
        >
          <div className="w-full flex justify-center h-[2vw]   neuer">
            <p className="text-white text-[0.9vw] h-full px-[1vw] py-[0.4vw] border-white border-[0.1vw] flex items-center rounded-[2vw] border-opacity-[50%] ">
              Today June 20
            </p>
          </div>
          {chats.map((e: any, index: any) => {
            return (
              <div
                className={`w-full flex ${
                  !e.user ? "justify-start" : "justify-end"
                }  h-auto bg-white"`}
                key={index}
              >
                <div
                  className={`w-fit rounded-[1.22vw] text-[0.9vw] py-[0.7vw] px-[0.8vw]  max-w-[12vw] h-auto border-[0.1vw] ${
                    !e.user
                      ? "border-white border-opacity-[50%] text-white"
                      : "border-[#CCFF00] bg-[#CCFF00] text-black "
                  }  h-[2vw]`}
                >
                  <p className={` `}>{e.msg}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Chats_modal;