"use client ";

import React, { useState, useEffect } from "react";
import Each_subscriber from "./each_subscriber";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { format } from "date-fns";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Sub_user_profile from "@/app/admin_general_component/sub_user_profile";
const Subscribers_wrap = () => {
  const items = ["", "", "", ""];

  const [allusers, setallusers] = useState<any>([]);
  const [hideProfile, sethideProfile] = useState(true);
  const [uuid, setuuid] = useState("");
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get all documents from the 'users' collection
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);

        const userPromises: any = [];

        usersSnapshot.forEach((userDoc) => {
          const data = userDoc.data();
          const userId = data.userid;
          const avater = data.avatar_url;
          const username = data.Username;
          const name = data.name;
          const createdAt = data.createdAt;
          const timestampFromFirebase = new Date(createdAt.toMillis()); // Convert to JavaScript Date object

          const formattedDate = format(timestampFromFirebase, "do MMMM yyyy");

          // Step 2: Get documents from the 'library' collection where userId matches and downloaded is true
          const libraryCollectionRef = collection(db, "libray");
          const libraryQuery = query(
            libraryCollectionRef,
            where("userid", "==", userId),
            where("downloaded", "==", true),
          );

          const libraryPromise = getDocs(libraryQuery).then(
            (librarySnapshot) => {
              const libraryData = librarySnapshot.docs.map((doc) => doc.data());
              return {
                userId,
                avater,
                username,
                name,
                formattedDate,
                libraryData,
              };
            },
          );

          userPromises.push(libraryPromise);
        });

        // Step 3: Wait for all library promises to resolve
        const results = await Promise.all(userPromises);

        // Step 4: Log the results
        // console.log("Results:", results);
        setallusers(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  const showuser_profile = (e: string) => {
    setuuid(e);
    sethideProfile(false);
    // sethideProfile(false);
  };
  return (
    <>
      {!hideProfile && (
        <Sub_user_profile uuid={uuid} sethideProfile={sethideProfile} />
      )}

      <div className="w-full sm:overflow-x-scroll sm:py-[8vw]  sm:rounded-[4vw]  py-[3vw] px-[1.5vw]   rounded-[2vw] bg-white flex-col">
        <div className="w-full sm:w-[250vw]  sm:gap-[5vw] flex-col  flex gap-[1.3vw]">
          <div className="w-full sm:py-[3vw]  flex justify-between items-center neuer py-[1vw] text-[1vw] sm:text-[3.2vw] font-[900]">
            <div className="w-[25%]  h-auto">Name</div>
            <div className="w-[20%]  h-auto">Join Date</div>
            <div className="w-[20%]  h-auto">Last Subscription</div>
            <div className="w-[20%]  h-auto">Number of forges downloaded</div>
            <div className="w-[15%]  h-auto">Days remaining for renewal </div>
          </div>

          {allusers.map((e: any, index: any) => {
            return (
              <>
                <Each_subscriber
                  key={index}
                  userdata={e}
                  setuuid={setuuid}
                  sethideProfile={sethideProfile}
                  showuser_profile={showuser_profile}
                />

                <div className="w-full h-[0.15vw] sm:h-[1vw] bg-black bg-opacity-[12%]"></div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Subscribers_wrap;
