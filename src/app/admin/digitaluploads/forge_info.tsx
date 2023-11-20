"use client";

import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { EDGE_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants";
import Sub_user_profile from "@/app/admin_general_component/sub_user_profile";

const Forge_info = ({
  sethideforge_info,
  user_doc_id,
  product_id,
  info_download,
  info_title,
  info_avater,
}: any) => {
  const router = useRouter();

  const app = initializeApp(firebaseConfig);

  const [allitems_arr, setallitems_arr] = useState<any>([]);
  const [hideProfile, sethideProfile] = useState<any>(true);
  const [uuid, setuuid] = useState<any>("");

  // Initialize Firestore
  const db = getFirestore(app);

  const [latest_time, setlatest_time] = useState("");

  useEffect(() => {
    const fetchDownloadedUsersInfo = async () => {
      try {
        const itemsArray: any = []; // Create an array to store the fetched items

        // Step 1: Get library documents where productid equals the provided product_id
        const libraryCollectionRef = collection(db, "libray");
        const libraryQuery = query(
          libraryCollectionRef,
          where("downloaded", "==", true),
          where("productid", "==", product_id),
          orderBy("downloadedAt", "desc"),
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
              const name = userData.username + " " + userData.name;

              const downloadedAtTimestamp = libraryData.downloadedAt.toMillis();
              const relativeTime = formatDistanceToNow(downloadedAtTimestamp, {
                addSuffix: true,
              });

              // Push the item to the array
              itemsArray.push({
                userId,
                name: name,
                avater: userData.avatar_url,
                userData,
                username: userData.Username,
                time: relativeTime,
              });
            });
          }
        }

        // Set the state with the array of items
        setallitems_arr(itemsArray);
      } catch (error) {
        console.error("Error fetching downloaded users info:", error);
      }
    };

    fetchDownloadedUsersInfo();
  }, [product_id]);

  useEffect(() => {
    console.log(allitems_arr);
  }, [allitems_arr]);

  const example = ["", "", "", "", "", "", "", ""];
  return (
    <>
      <div
        className="w-full h-full sm:px-[5vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethideforge_info(true);
        }}
      >
        <div
          className="w-[40vw] sm:w-full  sm:rounded-[5vw] sm:h-[46vw] sm:gap-[4vw] h-[40vw] flex-col gap-[1.2vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="w-[6vw] h-[6vw] sm:w-[13vw] sm:h-[13vw] avater_bg  rounded-[100%] overflow-hidden"
            style={{ backgroundImage: `url(/cover.webp)` }}
          >
            <img
              src={info_avater}
              alt="user avater img"
              className="w-full h-full"
            />
          </div>

          <h1 className="text-[1.5vw] neuem sm:text-[5vw]">{info_title}</h1>

          <p className="text-black text-opacity-[40%] txt-[1vw]">
            Downloaded {info_download} Times
          </p>
          <p className="text-black text-opacity-[40%] txt-[1vw]">
            Last download {allitems_arr[0]?.time} by {allitems_arr[0]?.username}
          </p>

          <h1 className="text-[1.2vw] neuem sm:text-[5vw]">
            All profiles that downloaded
          </h1>

          <div className="w-full h-[0.1vw] bg-black bg-opacity-[30%]"></div>

          <div className="w-full h-[15vw] gap-[2vw] flex flex-col  items-center overflow-y-scroll">
            {allitems_arr.map((e: any, index: any) => {
              return (
                <div
                  className="w-full  px-[1vw] flex justify-between items-center"
                  key={index}
                >
                  {/* the cover imag */}
                  <div className="flex gap-[1vw] items-center">
                    <div
                      className="w-[6vw]  overflow-hidden   h-[5vw] avater_bg rounded-[1vw]"
                      style={{ backgroundImage: `url(/cover.webp)` }}
                    >
                      <img
                        src={e.avater}
                        alt="avater img"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="flex flex-col gap-[1vw] ">
                      <p className=" text-[1vw] neuem ">{e.username}</p>
                      <p className="text-[0.9vw] neuer text-black text-opacity-[50%]">
                        {e.time}
                      </p>
                    </div>
                  </div>

                  <button
                    className="bg-[#F5F5F5] text-[1vw] sm:text-[3.5vw] hover:text-black h-[2.5vw] rounded-[1vw] sm:rounded-[3vw] w-[10vw] flex justify-center items-center text-[#95B611] "
                    onClick={() => {
                      setuuid(e.userId);
                      sethideProfile(false);
                    }}
                  >
                    View profile <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {!hideProfile && (
        <Sub_user_profile sethideProfile={sethideProfile} uuid={uuid} />
      )}
    </>
  );
};

export default Forge_info;
