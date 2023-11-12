"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import img from "../../../public/subscription/post_1.webp";
import prev_img from "../../../public/showcase/prev.webp";
import next_img from "../../../public/showcase/next.webp";
import { useRouter } from "next/navigation";
import { useProfile_Context } from "../utils/profile_context";
import AddForgeModal from "./forge_add_modal";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../utils/fire_base_config";

const Showcase_body = (props: any) => {
  const {
    product_arr,
    cover_img_link,
    setcover_img_link,
    product_images,
    disable,
    userSTep,
    uuid,
    product_id,
  } = props;
  //   const [items, setitems] = useState(["", "", "", "", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const { page_loader, setpage_loader }: any = useProfile_Context();
  const router = useRouter();
  const [forgeerr, setforgeerr] = useState("");
  const [forge_text, setforge_text] = useState("Add to ");
  const [addForge_modal, setaddForge_modal] = useState(false);
  const [already_exist, setalready_exist] = useState(false);
  const [forgeTitle, setforgeTitle] = useState("");
  const [forgeUrl, setforgeUrl] = useState("");

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const handleLeftClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTranslateX(translateX + 100 / product_images.length); // Adjust 100 to your container width
    }
  };

  const handleRightClick = () => {
    if (currentIndex < product_images.length - 1) {
      // Adjust based on the number of product_images you want to show at once
      setCurrentIndex(currentIndex + 1);
      setTranslateX(translateX - 100 / product_images.length); // Adjust 100 to your container width
    }
  };

  const handleAddToForge = () => {
    if (disable) {
      setpage_loader(true);
      setforgeerr("");
      router.push("/login?ref=forge");
    } else if (userSTep <= product_arr.role) {
      setforgeerr(
        "Sorry, you don't permission to add this items to the forge. subscribe or upgrade for access",
      );

      setTimeout(() => {
        router.push("/");
      }, 6000);
    } else if (userSTep > product_arr.role) {
      setforgeerr("");
      addForge(
        cover_img_link,
        product_id,
        product_arr.title,
        uuid,
        setalready_exist,
      );
    }
  };

  const addForge = (
    image: any,
    productId: any,
    title: any,
    userId: any,
    setAlreadyExists: any,
  ) => {
    // Query for existing document with the same userId and productId
    const forgeRef = collection(db, "forge");
    const q = query(
      forgeRef,
      where("userid", "==", userId),
      where("productid", "==", productId),
    );

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // A document with the same userId and productId already exists
          setAlreadyExists(true);
          setforgeTitle(title);
          setforgeUrl(image);
          setaddForge_modal(true);
        } else {
          // No document exists, proceed with adding a new document

          return addDoc(forgeRef, {
            createdAt: serverTimestamp(),
            image: image,
            productid: productId,
            title: title,
            userid: userId,
          });
        }
      })
      .then((docRef) => {
        if (docRef) {
          // This check ensures that this code runs only if a document was added
          setforgeTitle(title);
          setforgeUrl(image);
          setaddForge_modal(true);
          setAlreadyExists(false); // Resetting alreadyExists in case it was previously set
        }
      })
      .catch((e) => {
        console.error("Error adding/checking forge item: ", e);
      });
  };

  return (
    <>
      <main className="w-full h-auto px-[8.5vw]  flex justify-between items-start">
        {/* for the images side  */}
        <div className="w-[39vw] overflow-hidden  border-[white] border-[0.15vw] border-opacity-[31%] rounded-[2vw] flex flex-col h-[57vw]">
          {/* main image */}
          <div className="w-full h-[68%]  overflow-hidden">
            <Image
              src={cover_img_link}
              unoptimized
              width="0"
              height="0"
              alt="product cover images"
              className="w-full h-full scale-[1.2]"
            />
          </div>
          <div
            className={`w-full h-[32%]  flex justify-around items-center relative overflow-hidden  `}
          >
            {/* Thumbnails */}
            {currentIndex > 0 && (
              <button
                onClick={handleLeftClick}
                className="absolute left-[0.8vw] z-[999]"
              >
                <Image
                  src={prev_img}
                  alt="prev icon"
                  className="w-[2.6vw] h-fit"
                />
              </button>
            )}

            {currentIndex < product_images.length - 1 && (
              <button
                onClick={handleRightClick}
                className="absolute right-[0.8vw] z-[999]"
              >
                <Image
                  src={next_img}
                  alt="prev icon"
                  className="w-[2.6vw] h-fit"
                />
              </button>
            )}

            <div
              className="absolute flex h-full w-auto  items-center gap-[2vw] px-[2vw]  top-0 left-0 "
              style={{
                transform: `translateX(${translateX}%)`,
                transition: "0.7s ease",
              }}
            >
              {product_images.map((e: any, index: any) => {
                return (
                  <>
                    <div
                      className="w-[10vw] h-[10vw]"
                      key={index}
                      onClick={() => {
                        setcover_img_link(e.link);
                      }}
                    >
                      {" "}
                      <Image
                        src={e.link}
                        unoptimized
                        width="0"
                        height="0"
                        alt="product cover images"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="h-full w-[0.15vw] bg-[white] bg-opacity-[31%]"></div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        {/* for the text and description side */}
        <div className="w-[36vw] flex flex-col text-white items-start justify-center gap-[3vw]  h-auto pt-[4vw]">
          <h1 className="neuem text-[2.5vw] w-[80%] ">{product_arr.title}</h1>
          <div className="flex gap-[3vw] items-center ">
            <button
              className="bg-[#CCFF00] text-black neuer text-[1.1vw] rounded-[3.2vw] py-[0.7vw] px-[3vw]"
              onClick={() => {
                handleAddToForge();
              }}
            >
              Add to forge{" "}
            </button>

            <p className="text-[red] text-[0.9vw] w-[20vw] neuer capitalize">
              {forgeerr}
            </p>
          </div>
          <div className="w-full flex flex-col justify-center gap-[1.7vw]">
            <h3 className="text-[1.3vw] neuer">DESCRIPTION</h3>

            <p className="text-[1.2vw] neuer">{product_arr.description}</p>
          </div>
        </div>
      </main>

      {addForge_modal && (
        <AddForgeModal
          setaddForge_modal={setaddForge_modal}
          product_id={product_id}
          forgeTitle={forgeTitle}
          forgeUrl={forgeUrl}
          already_exist={already_exist}
        />
      )}
    </>
  );
};

export default Showcase_body;
