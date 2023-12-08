"use client";

import { useEffect, useState } from "react";
import Each_chat from "./each_chat";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import Moderator_each_chat_preloader from "./preloader";

const New_chats = () => {
  const items = ["", "", "", "", "", ""];
  const app = initializeApp(firebaseConfig);
  const [session_data, setsession_data] = useState<any>([]);
  const [session_data_is_loading, setsession_data_is_loading] = useState(true);

  const db = getFirestore(app); // Initialize your Firestore instance
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create a query for chat sessions where Endedsession is false
        const chatSessionsQuery = query(
          collection(db, "chat_sessions"),
          where("Endedsession", "==", false),
        );

        // Set up the snapshot listener
        const unsubscribe = onSnapshot(chatSessionsQuery, async (snapshot) => {
          const chatSessionsDataPromises = snapshot.docs.map(async (doc) => {
            // Retrieve data from each document
            const data = doc.data();
            const user_id = data.JoinedUserid;

            // Fetch user data using the user_id
            const user_query = query(
              collection(db, "users"),
              where("userid", "==", user_id),
            );
            const user_data = await getDocs(user_query);
            const user = user_data.docs[0].data();

            // Return an object with combined data
            return {
              id: doc.id,
              ...data,
              user: user,
            };
          });

          // Wait for all promises to resolve
          const chatSessionsData = await Promise.all(chatSessionsDataPromises);

          // Log the array containing all the data
          console.log(chatSessionsData);
          setsession_data(chatSessionsData);
          setsession_data_is_loading(false);
        });

        // Return the cleanup function to unsubscribe when the component unmounts
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Make sure to include an empty dependency array to run this effect only once

  return (
    <>
      {" "}
      <div className=" fixed h-full w-[calc(100vw/2.5)]  sm:border-none sm:w-full border-r-white border-opacity-[20%] border-r-[0.14vw] z-[99] bg-black overflow-y-scroll scroll-container">
        <div className="w-full justify-center  flex  sm:gap-[4vw] sm:pb-[5vw]  flex-col px-[3vw] sm:px-[2vw] gap-[1.5vw] pb-[1vw]  mt-[3vw] sm:mt-[15vw]">
          {session_data_is_loading
            ? items.map((e: any, index: any) => {
                return <Moderator_each_chat_preloader key={index} />;
              })
            : session_data.map((e: any, index: any) => {
                return <Each_chat key={index} data={e} />;
              })}
        </div>
      </div>
    </>
  );
};

export default New_chats;
