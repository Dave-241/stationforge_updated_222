"use client";

import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import firebaseConfig from "../../utils/fire_base_config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

const Forge_info = ({ sethideforge_info, user_doc_id, product_id }: any) => {
  const router = useRouter();

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  useEffect(() => {
    const fetchDownloadedUsersInfo = async () => {
      try {
        // Step 1: Get library documents where productid equals the provided productId
        const libraryCollectionRef = collection(db, "libray");
        const libraryQuery = query(
          libraryCollectionRef,
          where("productid", "==", product_id),
        );
        const librarySnapshot = await getDocs(libraryQuery);

        for (const libraryDoc of librarySnapshot.docs) {
          const libraryData = libraryDoc.data();
          const userId = libraryData.userid;

          // Step 2: Check if the document was downloaded
          if (libraryData.downloaded) {
            // Step 3: Get user information for the downloaded user
            const userQuery = query(
              collection(db, "users"),
              where("userid", "==", userId),
            );
            const userSnapshot = await getDocs(userQuery);

            userSnapshot.forEach((userDoc) => {
              const userData = userDoc.data();
              const downloadedAtTimestamp = libraryData.downloadedAt.toMillis();
              const relativeTime = formatDistanceToNow(downloadedAtTimestamp, {
                addSuffix: true,
              });

              console.log("Downloaded User Info:", {
                userId,
                username: userData.Username,
                downloadedAt: relativeTime,
              });
            });

            // Step 4: Check for the earliest download
            const earliestDownloadQuery = query(
              collection(db, "users"),
              where("userid", "==", userId),
              orderBy("downloadedAt", "desc"),
              limit(1),
            );
            const earliestDownloadSnapshot = await getDocs(
              earliestDownloadQuery,
            );

            earliestDownloadSnapshot.forEach((earliestDownloadDoc) => {
              const earliestDownloadUserData = earliestDownloadDoc.data();
              const earliestDownloadTimestampFormatted = formatDistanceToNow(
                earliestDownloadUserData.downloadedAt.toMillis(),
                { addSuffix: true },
              );

              console.log("Earliest Download Info:", {
                userId,
                username: earliestDownloadUserData.Username,
                downloadedAt: earliestDownloadTimestampFormatted,
              });
            });
          }
        }
      } catch (error) {
        console.error("Error fetching downloaded users info:", error);
      }
    };

    fetchDownloadedUsersInfo();
  }, [product_id]);
  return (
    <>
      <div
        className="w-full h-full sm:px-[5vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethideforge_info(true);
        }}
      >
        <div
          className="w-[25vw] sm:w-full sm:rounded-[5vw] sm:h-[46vw] sm:gap-[4vw] h-[13vw] flex-col gap-[1.2vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        ></div>
      </div>
    </>
  );
};

export default Forge_info;
