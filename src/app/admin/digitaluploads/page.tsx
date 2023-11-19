"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FadeInTransition } from "react-transitions-library";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import DigitalUploadsBase from "./dubase";
import {
  getDocs,
  collection,
  query,
  where
} from "firebase/firestore";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
    db
  }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [digitalSalesData, setDigitalSalesData] = useState<any>([]);

  useEffect(() => {
    // setpage_loader(false);
    setfrom("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  initializeApp(firebaseConfig);
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
    let dataLoaded = false;
    (async () => {
      if (!dataLoaded) {
      const allData = await getDocs(collection(db, 'users'));
      const dataArr: any = [];
  
      for (const item of allData.docs) {
        const { name, userid, avatar_url, allocations, subscription, Username, Email, step } = item.data();
        let d: {[key: string]: any } = {name, userid, avatar_url, allocations, subscription, Username, Email, step, forges: [] };
  
        const forges = query(collection(db, "forge"), where("userid", "==", userid));
        const forgeData = await getDocs(forges);
  
        forgeData.forEach(forge => {
          const forgeItem = forge.data();
          d.forges.push(forgeItem);
        });
  
        dataArr.push(d);
      }
      setDigitalSalesData((existingData:any) => [...existingData, ...dataArr]);
      dataLoaded = true;
    }
    })()
  }, [])


  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          <Header showModeratorBtn={false} />
          <FadeInTransition
            timeout={1500}
            from={0}
            to={1}
            in={true}
            style={{ width: "100%" }}
          >
            <DigitalUploadsBase digitalSalesData={digitalSalesData} />
          </FadeInTransition>

        </>
      ) : null}
    </>
  );
}
