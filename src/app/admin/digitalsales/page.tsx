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
import DigitalSalesBase from './dsbase'

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
  }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  useEffect(() => {
    // setpage_loader(false);
    setfrom("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  initializeApp(firebaseConfig);DigitalSalesBase
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

  /**
   * A function that converts px to vw
  */
  // function ctvw(pxVal:number){
  //   return  (100 * pxVal)/document.documentElement.clientWidth}
  // }

  function handleModalPopUp(id: string, index = null) {
    // console.log(index);
    // document.getElementById(id).showModal();
    const modalElement = document.getElementById(
      id
    ) as HTMLDialogElement | null;

    if (modalElement) {
      modalElement.showModal();
    }
  }


  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          <Header showModeratorBtn={false}/>
          <FadeInTransition
            timeout={1500}
            from={0}
            to={1}
            in={true}
            style={{ width: "100%" }}
          >
            <DigitalSalesBase handleModalPopUp={handleModalPopUp}/>
          </FadeInTransition>
        </>
      ) : null}
    </>
  );
}
