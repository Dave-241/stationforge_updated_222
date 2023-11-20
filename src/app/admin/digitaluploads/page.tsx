"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import { FadeInTransition } from "react-transitions-library";
import success from "../../../../public/admin_section/post_upload/success.webp";
import Link from "next/link";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  runTransaction,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
} from "firebase/firestore";
import Admin_Product_wrap from "./admin_product_wrap";
import Filters from "./filter";

export default function Home() {
  const { page_loader, setpage_loader, setfrom }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [selected_month, setselected_month] = useState("");
  const [selected_year, setselected_year] = useState("");
  const [productStats_copy, setproductStats_copy] = useState<any>([]);
  const [productStats_copy_filter, setproductStats_copy_filter] = useState<any>(
    [],
  );

  initializeApp(firebaseConfig);
  const auth: any = getAuth();
  const route = useRouter();
  // firebase init
  // Initialize the data base connection
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  // Initialize Firebase storage and Firestore
  const storage = getStorage();
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    setpage_loader(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        // router.push("/"); // Replace with your protected route
        user.getIdTokenResult().then((idTokenResult) => {
          const isAdmin = idTokenResult.claims.admin === true;
          if (isAdmin) {
            setshowdash(true);
            setpage_loader(false);
          } else {
            setshowdash(false);
            route.push("/");
          }
        });
      } else {
        setfrom("/admin/postupload");
        route.push("/login"); // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect for filtering based on selected_month
  // useEffect(() => {
  //   if (selected_month !== "") {
  //     const lowerCaseSelectedMonth = selected_month.toLowerCase();
  //     const filteredMonths = productStats_copy_filter.filter((month) =>
  //       month.toLowerCase().includes(lowerCaseSelectedMonth),
  //     );
  //     console.log("Filtered Months:", filteredMonths);
  //   }
  // }, [selected_month]);

  // useEffect for filtering based on selected_year
  // useEffect for filtering based on selected_year
  useEffect(() => {
    if (selected_year !== "") {
      const lowerCaseSelectedYear = selected_year.toString().toLowerCase();
      // Assuming 'data' is your data structure
      const filteredData = productStats_copy.filter((data: any) =>
        data.year.toString().includes(lowerCaseSelectedYear),
      );
      console.log("Filtered Data:", filteredData);
      setproductStats_copy_filter(filteredData);
    }
  }, [selected_year]);

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          {" "}
          <Header />
          <div className="w-full h-[10vw]"></div>
          {/* this is for the digital sales record  */}
          <div className="w-full  flex justify-center  px-[2vw] py-[2vw]   h-auto">
            {/* this is for the factions */}
            <div className="w-[30%]  h-[10vw]">
              <Filters
                setselected_month={setselected_month}
                selected_month={selected_month}
                selected_year={selected_year}
                setselected_year={setselected_year}
              />
            </div>
            {/* this is for teh product */}
            <div className="w-[70%] h-auto   ">
              <Admin_Product_wrap
                setproductStats_copy={setproductStats_copy}
                productStats_copy={productStats_copy}
                setproductStats_copy_filter={setproductStats_copy_filter}
                productStats_copy_filter={productStats_copy_filter}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
