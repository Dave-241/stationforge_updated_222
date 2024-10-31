"use client";
import React, { useState, useEffect } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";

import { useAdmin_context } from "@/app/utils/admin_context";
import Admin_Settings_modal from "@/app/admin_general_component/admin_settings";
import Notification_modal from "@/app/admin_general_component/notifications";

export default function Home() {
  const { page_loader, setpage_loader, setfrom }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);

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

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    setpage_loader(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        const user_ref = collection(db, "users");
        const user_query = query(user_ref, where("userid", "==", user.uid));

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;

              if (snap == "admin") {
                setshowdash(true);
                setpage_loader(false);
              } else {
                setshowdash(false);
                route.push("/");
              }
            } else {
              setshowdash(false);
              route.push("/");
            }
          })
          .catch(() => {
            console.log("error while getting user");
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

  const { show_setting, setshow_setting, notification }: any =
    useAdmin_context();

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          {" "}
          <Header />
          {show_setting && <Admin_Settings_modal />}
          {notification && <Notification_modal />}
          <div className="w-full h-[10rem] sm:h-[27vw]"></div>
        </>
      ) : null}
    </>
  );
}
