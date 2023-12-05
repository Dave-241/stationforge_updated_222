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
import {
  Timestamp,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Add_moderator_header from "@/app/admin_general_component/add_moderator_header";
import axios from "axios";
import All_moderator_wrap from "./all_moderator_wrap";
import All_chats_wrap from "./chats_wrap";
import Mob_All_chats_wrap from "./mob_chats_wrap";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
  }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [moderator_is_loading, setmoderator_is_loading] = useState(true);
  const [moderator_size, setmoderator_size] = useState(0);
  const [show_mobile_chats, setshow_mobile_chats] = useState(false);

  const [stage, setstage] = useState(1);

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
    setpage_loader(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        const user_ref = collection(db, "users");
        const user_query = query(user_ref, where("userid", "==", user.uid));
        const moderators_query = query(
          user_ref,
          where("role", "==", "moderator"),
        );

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;
              if (snap == "admin") {
                setshowdash(true);
                setpage_loader(false);
                // getDocs(moderators_query).then((res) => {
                //   setmoderator_is_loading(false);
                //   setmoderator_size(res.size);
                // });

                const unsubscribeModerators = onSnapshot(
                  moderators_query,
                  (snapshot) => {
                    setmoderator_is_loading(false);
                    setmoderator_size(snapshot.size);
                  },
                );

                return () => unsubscribeModerators();
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

  const handleuser_update = () => {
    axios
      .get("/api/moderator_edit")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          {stage > 0 && (
            <All_moderator_wrap
              setstage={setstage}
              setshow_mobile_chats={setshow_mobile_chats}
            />
          )}
          {stage > 1 && <All_chats_wrap />}
          {show_mobile_chats && (
            <Mob_All_chats_wrap setshow_mobile_chats={setshow_mobile_chats} />
          )}
        </>
      ) : null}
    </>
  );
}
