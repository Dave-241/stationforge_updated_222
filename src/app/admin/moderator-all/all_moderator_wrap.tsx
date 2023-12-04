"use client";

import { useEffect, useState } from "react";
import Moderator_header from "./left_header";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";
import Each_moderator from "./each_moderator";

const All_moderator_wrap = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [moderator_is_loading, setmoderator_is_loading] = useState(true);
  const [moderator_size, setmoderator_size] = useState(0);
  // Initialize Firestore
  const db = getFirestore(app);
  useEffect(() => {
    const fetchData = async () => {
      const userRef = collection(db, "users");
      const chatSessionsRef = collection(db, "chat_sessions");

      try {
        const moderatorsQuery = query(
          userRef,
          where("role", "==", "moderator"),
        );
        const moderatorsSnapshot = await getDocs(moderatorsQuery);

        const moderatorPromises = moderatorsSnapshot.docs.map(async (doc) => {
          const moderator = doc.data();
          const chatSessionsQuery = query(
            chatSessionsRef,
            where("Joinedmoderatorid", "==", moderator.userid),
          );
          const chatSessionsSnapshot = await getDocs(chatSessionsQuery);
          const chatSessionIds = chatSessionsSnapshot.docs.map((doc) => doc.id);

          return {
            moderator,
            chatSessionIds,
          };
        });

        const allModeratorData = await Promise.all(moderatorPromises);

        //  setModeratorData(allModeratorData);
        console.log(allModeratorData);
      } catch (error) {
        console.log("An error occurred", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = ["", "", "", "", "", "", ""];

  return (
    <>
      <div className=" fixed h-full w-[calc(100vw/3)] sm:border-none sm:w-full border-r-white border-opacity-[20%] border-r-[0.14vw] overflow-y-scroll scroll-container">
        {/* this is the header */}
        <Moderator_header
          moderator_size={moderator_size}
          moderator_is_loading={moderator_is_loading}
        />
        <div className="w-full flex flex-col px-[1vw] gap-[1.5vw] pb-[1vw]  mt-[1vw]">
          {items.map((e: any, index: any) => {
            return <Each_moderator key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default All_moderator_wrap;
