"use client ";

import React, { useState, useEffect } from "react";
import Each_subscriber from "./each_subscriber";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
const Subscribers_wrap = () => {
  const items = ["", "", "", ""];
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
          console.log(userId);
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
              return { userId, libraryData };
            },
          );

          userPromises.push(libraryPromise);
        });

        // Step 3: Wait for all library promises to resolve
        const results = await Promise.all(userPromises);

        // Step 4: Log the results
        console.log("Results:", results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className="w-full py-[3vw] px-[1.5vw]  flex gap-[1.3vw] rounded-[2vw] bg-white flex-col">
        <div className="w-full  flex justify-between items-center neuer py-[1vw] text-[1vw] font-[900]">
          <div className="w-[25%]  h-auto">Name</div>
          <div className="w-[20%]  h-auto">Join Date</div>
          <div className="w-[20%]  h-auto">Last Subscription</div>
          <div className="w-[20%]  h-auto">Number of forges downloaded</div>
          <div className="w-[15%]  h-auto">Days remaining for renewal </div>
        </div>

        {items.map((e: any, index: any) => {
          return (
            <>
              <Each_subscriber key={index} />

              <div className="w-full h-[0.15vw] bg-black bg-opacity-[12%]"></div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Subscribers_wrap;
