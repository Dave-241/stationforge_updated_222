"use client";
import Image from "next/image";
import Header from "./../general_components/header";
import React, { useState, useEffect } from "react";
import Profile_dropdown from "./../general_components/profile_dropdown";
import { useProfile_Context } from "./../utils/profile_context";
import JsonSearch from "search-array";

import Settings_modal from "./../general_components/settings";
import Loader from "./../general_components/loader";
// import Products from "./homepage_components/products";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./../utils/fire_base_config";
import Forge from "./../general_components/forge";
import Models_in_libary from "./model";
import Allocations from "./allocations";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Allocations_preloader from "./left_preloader";
import Models_in_libary_prelaoder from "./right_prelaoder";
import Download_modal from "./download_modal";

export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth: any = getAuth();
  const router = useRouter();

  const [left, setleft] = useState("150vw");
  const [right, setright] = useState("-80vw");
  const [products, setproducts] = useState([]);
  const [trimmed_product, settrimmed_product] = useState([]);
  const [trimmed_text, settrimmed_text] = useState("");
  const [libraryItems, setlibraryItems] = useState<any>([]);
  const [libary_is_loading, setlibary_is_loading] = useState(true);
  const [downloadmodal_png_link, setdownloadmodal_png_link] = useState("");
  const [downloadmodal_pngwith_model, setdownloadmodal_pngwith_model] =
    useState("");
  const [download_text, setdownload_text] = useState("");
  const [currently_downloading_id, setcurrently_downloading_id] = useState("");
  const [show_download_modal, setshow_download_modal] = useState(false);

  const [uid, setuid] = useState("");
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuid(user.uid);
      } else {
        router.push("/login?ref=libray");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Reference to the user's library in the 'library' collection
    const libraryRef = collection(db, "libray");
    const q = query(libraryRef, where("userid", "==", uid));

    // Real-time listener for the user's library
    // Real-time listener for the user's library
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postArray: any = [];
      querySnapshot.forEach((change) => {
        setlibary_is_loading(true);

        const libraryData = change.data();
        const productRef = doc(db, "products", libraryData.productid);
        setlibary_is_loading(true);
        const libray_collections: any = {
          // Data from the product collection
          month: "",
          id: change.id,
          coverImage: "",
          title: "",
          downloadPngLink: "",
          downloadPngModelLink: "",
          // Data from the library collection
          downloaded: false,
        };

        getDoc(productRef)
          .then((productDoc) => {
            if (productDoc.exists()) {
              const productData = productDoc.data();
              //   libray_collections.id = productDoc.id;
              libray_collections.coverImage = productData.cover_png;
              libray_collections.title = productData.title;
              libray_collections.downloadPngLink = productData.png_file;
              libray_collections.downloadPngModelLink =
                productData.png_model_file;
              libray_collections.downloaded = libraryData.downloaded;
              libray_collections.month = libraryData.month;

              setlibary_is_loading(false);
            } else {
              console.log("No matching product found");
            }
          })
          .catch((error) => {
            console.error("Error fetching product data:", error);
          });

        postArray.push(libray_collections);

        // Move setlibraryItems inside the loop
        // settrimmed_product(postArray)
        setlibraryItems(postArray);
      });
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [uid]);

  // Use useEffect to set the animation
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    forge_loader,
  }: any = useProfile_Context();

  useEffect(() => {
    setpage_loader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setleft("0");
    setright("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs only on mount

  useEffect(() => {
    if (trimmed_text == "") {
      return settrimmed_product(libraryItems);
    } else {
      const searcher = new JsonSearch(libraryItems, {
        indice: {
          month: "month", // search the `title`
          // name: "author", // search the `author` but it's renamed as `name` in queries
        },
      });

      let foundObjects = searcher.query(trimmed_text);
      return settrimmed_product(foundObjects);
    }
  }, [trimmed_text, libraryItems]);
  return (
    <>
      {page_loader && <Loader />}
      {forge_loader && <Forge />}
      <div className="w-full h-fit z-[99]  fixed top-[0vw] ">
        <Header />
      </div>

      <Profile_dropdown />
      {show_setting_modal && <Settings_modal />}
      {show_download_modal && (
        <Download_modal
          pnglink={downloadmodal_png_link}
          modellink={downloadmodal_pngwith_model}
          download_text={download_text}
          setshow_download_modal={setshow_download_modal}
          currently_downloading_id={currently_downloading_id}
        />
      )}
      <div className="w-full h-[10vw]"></div>
      <div
        className="w-full h-auto  flex transition duration-[2s] "
        style={{
          transform: `translateY(${left})`,
        }}
      >
        {!libary_is_loading ? (
          <>
            <Allocations
              settrimmed_text={settrimmed_text}
              trimmed_text={trimmed_text}
            />
            <Models_in_libary
              products={trimmed_product}
              setshow_download_modal={setshow_download_modal}
              libraryItems={trimmed_product}
              setdownload_text={setdownload_text}
              setdownloadmodal_png_link={setdownloadmodal_png_link}
              setdownloadmodal_pngwith_model={setdownloadmodal_pngwith_model}
              setcurrently_downloading_id={setcurrently_downloading_id}
            />
          </>
        ) : (
          <>
            <Allocations_preloader />
            <Models_in_libary_prelaoder />
          </>
        )}
      </div>
    </>
  );
}
