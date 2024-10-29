"use client";
import Image from "next/image";
import Header from "./general_components/header";
import React, { useState, useEffect } from "react";
import Profile_dropdown from "./general_components/profile_dropdown";
import { useProfile_Context } from "./utils/profile_context";
import Settings_modal from "./general_components/settings";
import Home_hero from "./homepage_components/hero";
import Loader from "./general_components/loader";
import Products from "./homepage_components/products";
import Fractions from "./homepage_components/factions";
import JsonSearch from "search-array";
import imageCompression from "browser-image-compression";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./utils/fire_base_config";
import Forge from "./general_components/forge";
import Product_preloader from "./homepage_components/right_preloader";
import Fractions_preloader from "./homepage_components/left_preloader";
import Mobile_factions from "./homepage_components/mobile_factions";
import Chats_modal from "./general_components/chat";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [left, setleft] = useState("150vw");
  const [right, setright] = useState("-80vw");
  const [product_is_loading, setproduct_is_loading] = useState(true);
  const [products, setproducts] = useState<any>([]);
  const [copy_products, setcopy_products] = useState([]);
  const [second_copy_products, setsecond_copy_products] = useState([]);
  const [faction_data, setfaction_data] = useState(null);
  const [sub_faction_arr, setsub_faction_arr] = useState([]);
  const [active_sub_faction, setactive_sub_faction] = useState(null);
  const [search_text, setsearch_text] = useState("");
  const [is_network_err, setis_network_err] = useState(false);
  // Use useEffect to set the animation
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    forge_loader,
    show_chat_modal,
    setshow_chat_modal,
  }: any = useProfile_Context();

  const [mobile_faction_active, setmobile_faction_active] = useState(false);

  const [faction_option, setfaction_option] = useState([
    { id: null, label: "New", sub: [] },
    { id: 1, label: "Humanoids", sub: ["h1", "h2", "h3", "h5"] },
    { id: 2, label: "Robots", sub: ["R1", "R2", "R3", "R5"] },
    { id: 3, label: "Aliens", sub: ["A1", "A2", "A3", "A5"] },
    { id: 4, label: "Chaos", sub: ["L1", "L2", "L3", "L5"] },
  ]);

  const [active_faction, setactive_faction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust based on your pagination needs
  useEffect(() => {
    setpage_loader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const auth = getAuth();
  useEffect(() => {
    setleft("0");
    setright("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setsearch_text("");

    if (active_faction == null) {
      setcopy_products(products);
      return;
    }

    // Custom search using filter
    const foundObjects = products.filter(
      (product: any) => product.factions === faction_data,
    );
    setsecond_copy_products(foundObjects);
    setcopy_products(foundObjects);
  }, [active_faction]);

  // //   this is for setting the  searching out the product from the title
  useEffect(() => {
    setactive_faction(null);
    setactive_sub_faction(null);

    if (search_text === "") {
      setcopy_products(products);
      return;
    }

    // Custom case-insensitive search using filter
    const foundObjects = products.filter((product: any) =>
      product.title.toLowerCase().includes(search_text.toLowerCase()),
    );

    setsecond_copy_products(foundObjects);
    setcopy_products(foundObjects);
  }, [search_text]);

  //   this is for setting the sub factions
  useEffect(() => {
    setsearch_text("");

    if (active_faction == null) {
      setsub_faction_arr([]);

      return;
    } else {
      const searcher = new JsonSearch(faction_option, {
        indice: {
          id: "id", // search the `title`
          // name: "author", // search the `author` but it's renamed as `name` in queries
        },
      });

      let foundObjects = searcher.query(active_faction);
      setactive_sub_faction(null);
      return setsub_faction_arr(foundObjects[0]?.sub);
    }
  }, [active_faction]);

  useEffect(() => {
    setsearch_text("");

    if (active_sub_faction == null) {
      // setsub_faction_arr([]);
      // setcopy_products(second_copy_products);
      return;
    } else {
      // Custom case-insensitive search using filter
      const foundObjects = products.filter((product: any) =>
        product.subfactions.includes(active_sub_faction),
      );

      setcopy_products(foundObjects);
      console.log(foundObjects);
      // return setsub_faction_arr(foundObjects[0]?.sub);
    }
  }, [active_sub_faction]);

  useEffect(() => {
    setcopy_products(products);
    // setsecond_copy_products(products);
  }, [products]);

  const fetchProductsBasedOnSubscription = async (userId: any) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const productsRef = collection(db, "products");

    // Create a query to find the user document where user_id == userId
    const userQuery = query(usersRef, where("userid", "==", userId));

    // Fetch the user's document
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      console.log("No such user!");
      return;
    }

    const userDoc = userSnapshot.docs[0];
    const subscriptionHistory = userDoc.data().subscription_history;
    let productsArray: any = [];

    // Check for products in the current month
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    );

    const currentMonthQuery = query(
      productsRef,
      orderBy("createdAt", "desc"),
      where("createdAt", ">=", startOfMonth),
      where("createdAt", "<=", endOfMonth),
    );

    const currentMonthSnapshot = await getDocs(currentMonthQuery);
    let currentMonthProducts = currentMonthSnapshot.docs.map((doc) => {
      const { cover_png, title, factions, subfactions } = doc.data();
      return {
        id: doc.id,
        cover_png,
        title,
        factions,
        subfactions,
      };
    });

    if (currentMonthProducts.length > 0) {
      // If products are found in the current month, fetch all products from subscription history up to the previous month of the current month
      productsArray = [...productsArray, ...currentMonthProducts];

      for (const timestamp of subscriptionHistory) {
        const date = new Date(timestamp.seconds * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();

        const startOfSubscriptionMonth = new Date(year, month, 1);
        const endOfSubscriptionMonth = new Date(year, month + 1, 0);

        const subscriptionMonthQuery = query(
          productsRef,
          orderBy("createdAt", "desc"),
          where("createdAt", ">=", startOfSubscriptionMonth),
          where("createdAt", "<=", endOfSubscriptionMonth),
        );

        const subscriptionMonthSnapshot = await getDocs(subscriptionMonthQuery);
        const subscriptionMonthProducts = subscriptionMonthSnapshot.docs.map(
          (doc) => {
            const { cover_png, title, factions, subfactions } = doc.data();
            return {
              id: doc.id,
              cover_png,
              title,
              factions,
              subfactions,
            };
          },
        );

        productsArray = [...productsArray, ...subscriptionMonthProducts];
      }
    } else {
      // If no products are found in the current month, fetch all products from the previous month
      const startOfPrevMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        1,
      );
      const endOfPrevMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        0,
      );

      const previousMonthQuery = query(
        productsRef,
        orderBy("createdAt", "desc"),
        where("createdAt", ">=", startOfPrevMonth),
        where("createdAt", "<=", endOfPrevMonth),
      );

      const prevMonthSnapshot = await getDocs(previousMonthQuery);
      const prevMonthProducts = prevMonthSnapshot.docs.map((doc) => {
        const { cover_png, title, factions, subfactions } = doc.data();
        return {
          id: doc.id,
          cover_png,
          title,
          factions,
          subfactions,
        };
      });

      productsArray = [...productsArray, ...prevMonthProducts];

      // Fetch all products from subscription history up to the previous month of the previous month
      for (const timestamp of subscriptionHistory) {
        const date = new Date(timestamp.seconds * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();

        const startOfSubscriptionMonth = new Date(year, month, 1);
        const endOfSubscriptionMonth = new Date(year, month + 1, 0);
        const prevMonth = startOfPrevMonth.getMonth();
        const prevYear = startOfPrevMonth.getFullYear();

        const subMonth = startOfSubscriptionMonth.getMonth();
        const subYear = startOfSubscriptionMonth.getFullYear();

        // Compare year and month
        if (prevYear === subYear && prevMonth === subMonth) {
          continue;
        }
        const subscriptionMonthQuery = query(
          productsRef,
          orderBy("createdAt", "desc"),
          where("createdAt", ">=", startOfSubscriptionMonth),
          where("createdAt", "<=", endOfSubscriptionMonth),
        );

        const subscriptionMonthSnapshot = await getDocs(subscriptionMonthQuery);
        const subscriptionMonthProducts = subscriptionMonthSnapshot.docs.map(
          (doc) => {
            const { cover_png, title, factions, subfactions } = doc.data();
            return {
              id: doc.id,
              cover_png,
              title,
              factions,
              subfactions,
            };
          },
        );

        console.log(
          "this is checked by me though",
          subscriptionMonthProducts,
          startOfSubscriptionMonth,
          startOfPrevMonth,
          endOfPrevMonth,
          endOfSubscriptionMonth,
        );

        productsArray = [...productsArray, ...subscriptionMonthProducts];
      }
    }

    // Set the products state with the fetched products
    setproducts(productsArray);
    setis_network_err(false);
    setproduct_is_loading(false);
  };

  const fetchProducts = async () => {
    const db = getFirestore();
    const productsRef = collection(db, "products");

    // Get the first and last day of the current month
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    );

    // Get the first and last day of the previous month
    const startOfPrevMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1,
    );
    const endOfPrevMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0,
    );

    // Create a query to filter products created within the current month
    const currentMonthQuery = query(
      productsRef,
      orderBy("createdAt", "desc"),
      where("createdAt", ">=", startOfMonth),
      where("createdAt", "<=", endOfMonth),
    );

    // Create a query to filter products created within the previous month
    const previousMonthQuery = query(
      productsRef,
      orderBy("createdAt", "desc"),
      where("createdAt", ">=", startOfPrevMonth),
      where("createdAt", "<=", endOfPrevMonth),
    );

    setis_network_err(true);
    setproduct_is_loading(true);

    try {
      const querySnapshot = await getDocs(currentMonthQuery);
      let productsArray = querySnapshot.docs.map((doc) => {
        const { cover_png, title, factions, subfactions } = doc.data();
        return {
          id: doc.id,
          cover_png,
          title,
          factions,
          subfactions,
        };
      });

      if (productsArray.length === 0) {
        // If no products for the current month, query for the previous month
        const prevQuerySnapshot = await getDocs(previousMonthQuery);
        productsArray = prevQuerySnapshot.docs.map((doc) => {
          const { cover_png, title, factions, subfactions } = doc.data();
          return {
            id: doc.id,
            cover_png,
            title,
            factions,
            subfactions,
          };
        });
      }

      setproducts(productsArray);
      setis_network_err(false);
    } catch (error) {
      console.error("Error getting products: ", error);
    } finally {
      setproduct_is_loading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated, fetch products based on subscription history
        setis_network_err(true);
        setproduct_is_loading(true);
        console.log(user.uid);
        await fetchProductsBasedOnSubscription(user.uid);
      } else {
        fetchProducts();
        // User is not authenticated, load only the products from this month. If this month is not available, then load the past month.
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {page_loader && <Loader />}
      {forge_loader && <Forge />}
      <Profile_dropdown />
      <div className="w-full h-fit z-[99] sm:h-[20vw]   fixed top-[-0.9vw] ">
        <Header />
      </div>

      {show_setting_modal && <Settings_modal />}

      {mobile_faction_active && (
        <div className="w-full h-full sm:block hidden sm:top sm:relative">
          <Mobile_factions
            faction_option={faction_option}
            setmobile_faction_active={setmobile_faction_active}
            setactive_faction={setactive_faction}
            active_faction={active_faction}
            setfaction_data={setfaction_data}
            sub_faction_arr={sub_faction_arr}
            active_sub_faction={active_sub_faction}
            setactive_sub_faction={setactive_sub_faction}
          />
        </div>
      )}
      <Home_hero />
      <div className="w-full h-[4vw] sm:h-[25vw]"></div>
      <div
        className="w-full h-auto sm:px-[3vw] flex transition duration-[2s] "
        style={{
          transform: `translateY(${left})`,
        }}
      >
        {!product_is_loading ? (
          <>
            <Fractions
              faction_option={faction_option}
              setactive_faction={setactive_faction}
              active_faction={active_faction}
              setfaction_data={setfaction_data}
              sub_faction_arr={sub_faction_arr}
              active_sub_faction={active_sub_faction}
              setactive_sub_faction={setactive_sub_faction}
            />
            <Products
              products={copy_products}
              setmobile_faction_active={setmobile_faction_active}
              setsearch_text={setsearch_text}
              is_network_err={is_network_err}
              search_text={search_text}
            />
          </>
        ) : (
          <>
            <Fractions_preloader />
            <Product_preloader />
          </>
        )}
      </div>

      {/* <button
        className="w-[100vw] h-[100vh]"
        onClick={() => {

          axios
            .delete(
              `https://pop-up-x6pg.onrender.com/banner/6595408b026be0da5721b3f4`,
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.error("Error deleting banner:", error);
            });
        }}
      >
        click me{" "}
      </button> */}
    </>
  );
}
