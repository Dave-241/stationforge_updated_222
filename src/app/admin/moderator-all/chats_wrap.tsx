"use client";

import { useEffect, useState } from "react";
import Moderator_header from "./left_header";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";
import Each_moderator from "./each_moderator";
import Each_moderator_preloader from "./all_moderator_preloader";
import Each_chat from "./each_chat";
import Each_chat_preloader from "./each_chat_preloader";

const All_chats_wrap = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [moderator_is_loading, setmoderator_is_loading] = useState(true);
  const [allmoderator_is_loading, setallmoderator_is_loading] = useState(true);
  const [moderator_size, setmoderator_size] = useState(0);
  const [move_right, setmove_right] = useState(false);
  const [moderatorData, setmoderatorData] = useState<any>([]);
  // Initialize Firestore
  const db = getFirestore(app);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // 1. Fetch chat session data
  //       const chatSessionIds = [
  //         "TTtFe2L637LFliEh6RcX",
  //         "p8r8MBYMQCspxjm9WvYD",
  //         "b0gAa6NlpNAmaOQMVGiZ",
  //       ];

  //       const chatSessionsData = await Promise.all(
  //         chatSessionIds.map(async (chatSessionId) => {
  //           // console.log(chatSessionId);
  //           const chatSessionDocRef = doc(
  //             collection(db, "chat_sessions"),
  //             chatSessionId,
  //           );
  //           const chatSessionDoc = await getDoc(chatSessionDocRef);
  //           return chatSessionDoc.data();
  //         }),
  //       );

  //       // 2. Fetch user data for each chat session
  //       const userDataPromises = chatSessionsData.map(async (chatSession) => {
  //         console.log("don22se");
  //         // console.log(chatSession);
  //         const userDocRef = query(
  //           collection(db, "users"),
  //           where("userid", "==", chatSession?.JoinedUserid),
  //         );
  //         // const userDocRef = doc(
  //         //   collection(db, "users"),
  //         //   chatSession?.JoinedUserid,
  //         // );
  //         console.log("done");

  //         const userDoc = await getDocs(userDocRef);

  //         const userData = await userDoc.docs.map((e) => {
  //           return e.data();
  //         });
  //         return userData;
  //       });

  //       // 3. Fetch chat text data for each chat session
  //       const chatTextPromises = chatSessionIds.map(async (chatSession) => {
  //         console.log(chatSession);
  //         const chatTextQuery = query(
  //           collection(db, "chat_text"),
  //           where("session_chat_id", "==", chatSession),
  //           where("from", "==", "user"),
  //           orderBy("createdAt", "asc"),
  //         );
  //         const chatTextSnapshot = await getDocs(chatTextQuery);
  //         const chatTextData = chatTextSnapshot.docs.map((doc) => doc.data());
  //         return chatTextData;
  //       });

  //       const [userData, chatTextData] = await Promise.all([
  //         Promise.all(userDataPromises),
  //         Promise.all(chatTextPromises),
  //       ]);

  //       // Combine all data for each chat session
  //       const finalChatSessionData = chatSessionIds.map((id, index) => ({
  //         chatSessionId: id,
  //         chatSessionData: chatSessionsData[index],
  //         userData: userData[index],
  //         chatTextData: chatTextData[index],
  //       }));

  //       // Log the result
  //       console.log(finalChatSessionData);

  //       // Set the state with the fetched data
  //       // setChatSessionData(finalChatSessionData);
  //     } catch (error) {
  //       console.error("An error occurred", error);
  //     }
  //   };

  //   fetchData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // Make sure to include moderatorData as a dependency

  const items = ["", "", "", "", "", ""];

  useEffect(() => {
    setmove_right(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className={`fixed h-full w-[calc(100vw/3)] left-[calc(100vw/3)] sm:hidden cover_scrollbar overflow-hidden ${
          move_right ? "translate-x-0" : "translate-x-[calc(-100vw/3)]"
        } `}
        style={{ transition: "1.5s ease " }}
      >
        <div className="w-full h-full sm:border-none sm:w-full border-r-white overflow-y-scroll scroll-container border-opacity-[20%] border-r-[0.14vw]  sm:hidden">
          {/* this is the header */}
          <div
            className={` ${
              move_right ? "left-0" : "left-[calc(-100vw/3)]"
            } fixed h-[6vw] w-[calc(100vw/3.05)] backdrop-blur-[14px] bg-opacity-[30%] z-[99999] bg-black  pl-[2vw] top-0 flex items-center`}
            style={{ transition: "1.2s ease " }}
          >
            <h2 className="text-white text-[1.4vw] ">Goldie John Chats</h2>
          </div>
          <div className="w-full justify-center flex  sm:gap-[4vw] sm:pb-[5vw]  flex-col px-[2vw] sm:px-[2vw] gap-[1.5vw] pb-[1vw]  mt-[7vw] sm:mt-[21vw]">
            {/* {allmoderator_is_loading
            ? items.map((e: any, index: any) => {
                return <Each_moderator_preloader key={index} />;
              })
            : moderatorData.map((e: any, index: any) => {
                return <Each_moderator key={index} data={e} />;
              })} */}

            {items.map((e: any, index: any) => {
              return <Each_chat key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default All_chats_wrap;
