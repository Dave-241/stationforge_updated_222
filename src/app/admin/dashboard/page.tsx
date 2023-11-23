"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import Dashboard_hero_section from "./dashboard_hero";
import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
  }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [downloadsData, setDownloadsData] = useState([]);
  const [currentWeekDownloads, setCurrentWeekDownloads] = useState(0);
  const [previousMonthDownloads, setPreviousMonthDownloads] = useState(0);
  const [currentMonthDownloads, setCurrentMonthDownloads] = useState(0);

  const [previousWeekDownloads, setPreviousWeekDownloads] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  useEffect(() => {
    // setpage_loader(false);
    setfrom("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  const auth: any = getAuth();
  const route = useRouter();
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        // router.push("/"); // Replace with your protected route
        user.getIdTokenResult().then((idTokenResult) => {
          const isAdmin = idTokenResult.claims.admin === true;
          if (isAdmin) {
            setshowdash(true);
          } else {
            setshowdash(false);
            route.push("/");
          }
        });
      } else {
        setpage_loader(false);
        setpage_loader(true);
        route.push("/"); // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("useEffect started");

    const fetchData = async () => {
      console.log("Fetching data...");

      try {
        // Initialize Firestore
        const db = getFirestore();

        // Define the 'library' collection
        const libraryCollection = collection(db, "libray");

        // Define the current month's start and end timestamps
        const currentDate = new Date();
        const currentMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        );
        const currentMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23,
            59,
            59,
          ),
        );

        // Define the previous month's start and end timestamps
        const previousMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
        const previousMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0,
            23,
            59,
            59,
          ),
        );

        // Define the queries for the current and previous months
        const currentMonthQuery = query(
          libraryCollection,
          where("createdAt", ">=", currentMonthStart),
          where("createdAt", "<=", currentMonthEnd),
          where("downloaded", "==", true),
        );
        const previousMonthQuery = query(
          libraryCollection,
          where("createdAt", ">=", previousMonthStart),
          where("createdAt", "<=", previousMonthEnd),
          where("downloaded", "==", true),
        );

        // Fetch data for the current month
        const currentMonthSnapshot = await getDocs(currentMonthQuery);
        const currentMonthData = currentMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setCurrentMonthDownloads(currentMonthData.length);

        // Fetch data for the previous month
        const previousMonthSnapshot = await getDocs(previousMonthQuery);
        const previousMonthData = previousMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setPreviousMonthDownloads(previousMonthData.length);

        // Calculate percentage change
        const percentageChangeValue =
          currentMonthData.length !== 0
            ? ((currentMonthData.length - previousMonthData.length) /
                currentMonthData.length) *
              100
            : 0;
        setPercentageChange(percentageChangeValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    console.log("useEffect completed");
  }, []); // The empty dependency array ensures that this useEffect only runs once on component mount

  useEffect(() => {
    console.log("Setting currentMonthDownloads:", currentMonthDownloads);
    console.log("Setting previousMonthDownloads:", previousMonthDownloads);
    console.log("Setting percentageChange:", percentageChange);
  }, [previousMonthDownloads, currentMonthDownloads, percentageChange]); // Add states as dependencies

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          <div className="w-full h-[40vw] px-[2vw] sm:h-[190vw] flex fixed top-[1vw] left-0 ">
            <div className=" w-full  bg-[#000002] drop-shadow-2xl sm:rounded-[4vw] rounded-[2vw] relative h-full">
              <Header position={"absolute"} padding={"0"} top={"0"} />

              <Dashboard_hero_section />

              <div className="w-full sm:h-[15vw]"></div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
