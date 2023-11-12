"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import Header from "@/app/admin_general_component/header";
import { FadeInTransition } from "react-transitions-library";
import Link from "next/link";
import Admin_Post_wrap from "./admin_post_wrap";
import Admin_edit_post_wrap from "./admin_edit_post_wrap";

export default function Home() {
  const [options, setoptions] = useState([
    { id: 1, label: "Public" },
    { id: 2, label: "Subscribers" },
    { id: 3, label: "Standard Tier Subscribers" },
    { id: 4, label: "Merchant Tier Subscribers" },
  ]);
  const { page_loader, setpage_loader, setfrom }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);

  initializeApp(firebaseConfig);
  const auth: any = getAuth();
  const route = useRouter();
  // firebase init
  // Initialize the data base connection
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

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
        // setfrom("/admin/postupload");
        route.push("/login"); // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          <Header />
          <div className="w-full h-[10vw] "></div>
          <FadeInTransition
            timeout={1500}
            from={0}
            to={1}
            in={true}
            style={{ width: "100%" }}
          >
            <Admin_Post_wrap />
          </FadeInTransition>

          <div className="w-full h-[15vw] "></div>
        </>
      ) : null}
    </>
  );
}
