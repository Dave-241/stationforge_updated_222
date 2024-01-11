"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import { initializeApp } from "firebase/app";
import exit_modal from "../../../public/mob_ham_exit.webp";
import firebaseConfig from "../utils/fire_base_config";
import { v4 as uuidv4 } from "uuid"; // Import the v4 function from the uuid module

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
import { getAuth } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { useAdmin_context } from "../utils/admin_context";
// import axios from "axios";

const Notification_modal = () => {
  const [settings_is_opac, setsettings_is_opac] =
    useState<any>("bg-opacity-[0%]");
  const [mob_ham_opac, setmob_ham_opac] = useState(false);
  const [loading, setloading] = useState(false);
  const [shift_modal, setshift_modal] = useState("translate-x-[40vw]");
  const [up_modal, setup_modal] = useState("translate-y-[200vw]");
  const { notification, setnotification }: any = useAdmin_context();
  const [start_hiding, setstart_hiding] = useState(false);

  // useEffect(() => {
  //   setconfirm_ImageWasChanged(ImageWasChanged);
  // }, [ImageWasChanged]);
  const ref_modal = useRef<any>(null);

  const router = useRouter();

  // firebase init
  // Initialize the data base connection
  initializeApp(firebaseConfig);

  // Initialize services
  const db = getFirestore();

  // define collection reference
  const colRef = collection(db, "users");

  // get authentication
  const auth: any = getAuth();

  useEffect(() => {
    setshift_modal("translate-x-[0]");
    setmob_ham_opac(true);
    setup_modal("translate-y-[0]");
    setsettings_is_opac(() => {
      const width_oh = globalThis.innerWidth;

      if (width_oh >= 650) {
        return "bg-opacity-[80%]";
      } else if (width_oh < 650) {
        return "bg-opacity-[90%]";
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref_modal.current && !ref_modal.current.contains(event.target)) {
        // Delay hiding the component by 2000 milliseconds (2 seconds)
        setstart_hiding(true);
        setmob_ham_opac(false);
        setshift_modal("translate-x-[40vw]");
        setup_modal("translate-y-[200vw]");
        setsettings_is_opac("bg-opacity-[0%]");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (start_hiding) {
      const timer = setTimeout(() => {
        // Code to be executed after the delay
        setnotification(false);
        setstart_hiding(false);
      }, 1500);

      // Clear the timer if the component unmounts or the effect is re-executed.
      return () => clearTimeout(timer);
    }
  }, [start_hiding]);

  const items = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

  const [notificationsData, setNotificationsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const db = getFirestore();
        const notificationsCollection = collection(db, "notifications");
        const notificationsSnapshot = await getDocs(notificationsCollection);
        // console.log(notificationsSnapshot.docs[0].data());

        const dataPromises = notificationsSnapshot.docs.map(async (doc) => {
          const notificationData = doc.data();
          const userId = notificationData.user_id;

          // Retrieve user information using where clause
          const usersCollection = collection(db, "users");
          const userQuery = query(
            usersCollection,
            where("userid", "==", userId),
          );
          const userSnapshot = await getDocs(userQuery);

          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();

            return {
              id: doc.id,
              notificationData,
              userData,
            };
          } else {
            console.warn(`User not found for notification with ID ${doc.id}`);
            return null;
          }
        });
        const combinedData = await Promise.all(dataPromises);
        console.log(combinedData);
        setNotificationsData(combinedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this useEffect runs only once on component mount

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <div
        className={`w-full min-h-full bg-black ${settings_is_opac} fixed top-0 left-0 z-[9999] transition duration-[1s] setting_modal sm:items-end flex justify-end items-start pt-[7vw] sm:py-0 sm:px-0 px-[2vw] overflow-hidden`}
      >
        <Image
          src={exit_modal}
          alt="exit ham"
          className="sm:block hidden w-[10vw] h-fit absolute top-[5vw] right-[3vw] "
          style={{ opacity: mob_ham_opac ? 1 : 0, transition: "1s ease" }}
        />
        <div
          className={`w-[32vw] sm:h-[85vh] sm:w-full  h-[62vw] max-h-[80vh]  sm:py-[5vw] sm:px-[2vw] relative sm:gap-[4vw] rounded-[2.2vw] bg-[#111111] settings flex flex-col  border-[#434343] overflow-hidden ${
            globalThis.innerWidth > 650 ? shift_modal : up_modal
          } border transition duration-[1.5s]`}
          ref={ref_modal}
        >
          <div className="h-[6vw] sm:h-[15vw]  px-[2vw] w-full  flex justify-between items-center">
            <p className="text-[1.2vw] neuem text-white sm:text-[6vw]">
              Notifications
            </p>

            <div className="flex justify-center items-center sm:w-[10vw] sm:h-[8vw] sm:text-[3.5vw] sm:font-bold bg-[#CCFF00] w-[3.2vw] h-[2.6vw] rounded-[2.3vw] sm:rounded-[7vw] text-[1vw] text-black">
              123
            </div>
          </div>
          <div className="h-[90%]   overflow-y-scroll scroll-container ">
            <div className=" w-full sm:py-[4vw] h-auto flex items-center flex-col gap-[2vw] sm:gap-[6vw]">
              {items.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-[31vw]  px-[1vw] sm:px-[2vw]  flex items-center justify-between sm:w-full    "
                  >
                    {/* the first section the iamge and the names  */}
                    <div className="w-auto gap-[1vw] sm:gap-[4vw] flex justify-start items-center">
                      <div className="w-[4vw] h-[4vw] sm:h-[16vw] sm:w-[16vw]  bg-white rounded-[100%]"></div>
                      <div className="flex flex-col gap-[0.5vw] sm:gap-[1vw]">
                        <p className="text-[1vw] sm:text-[3.2vw] sm:font-medium font-semibold text-white">
                          Goldie john just subscribed{" "}
                        </p>
                        <p className="text-[0.8vw] capitalize sm:text-[3vw] text-[#CCFF00]">
                          standard <br />
                          <span className="text-white sm:text-[2.6vw]  text-[0.75vw] text-opacity-[50%] ">
                            20th september 20223 , 1pm saturday
                          </span>
                        </p>
                      </div>
                    </div>

                    <button className="w-[7vw] sm:w-[20vw] sm:h-[10vw] sm:border-[0.5vw] hover:bg-white hover:text-black text-white text-[0.9vw] sm:text-[2.8vw] h-[2.5vw] rounded-[2vw] border-opacity-[50%] border-[#CCFF00] border-[0.15vw]  ">
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification_modal;
