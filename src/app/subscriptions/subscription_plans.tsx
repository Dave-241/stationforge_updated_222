"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import StandardPlan from "./standard_plan";
import bg_image from "../../../public/login/login.webp";
import mob_bg from "../../../public/subscription/mob_bg_sub.webp";
import firebaseConfig from "../utils/fire_base_config";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSearchParams } from "next/navigation";

const Subscription_Plans = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  const [uuid, setuuid] = useState("");
  const [email, setemail] = useState("");
  const [customer, setcustomer] = useState("");
  const [currentplan, setcurrentplan] = useState(0);
  const [current_subscription_plain, setcurrent_subscription_plain] =
    useState("");
  const [standard_isloading, setstandard_isloading] = useState(false);
  const [plans, setPlans] = useState<any>([]); // Store plans with release dates due and hidden == false

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuuid(user.uid);
      } else {
        setuuid("");
        setcustomer("");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are 0-based in JS, so add 1
    const currentYear = today.getFullYear();
    console.log(currentMonth, currentYear);

    // Firestore query to get all documents where hidden is false
    const tiersCollectionRef = collection(db, "tiers");
    const tiersQuery = query(tiersCollectionRef, where("hidden", "==", false));

    const unsubscribe = onSnapshot(tiersQuery, (querySnapshot) => {
      querySnapshot.docs.map((d) => {
        console.log(d);
      });
      const availablePlans = querySnapshot.docs
        .map((doc: any) => ({ id: doc.id, ...doc.data() })) // Get document data and ID
        .filter(
          (plan) => plan.month == currentMonth && plan.year == currentYear,
        );

      console.log("Filtered plans:", availablePlans); // Log filtered plans
      setPlans(availablePlans); // Set state with filtered plans
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [db]);

  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  return (
    <>
      <div className="w-full h-auto justify-center flex flex-col items-center sm:pb[6vw] md:pb-[3rem] relative">
        <div className="w-auto md:py-[2.5rem] sm:rounded-[2.6vw] sm:py-[5vw] sm:px-[5vw] md:px-[4rem] md:rounded-[0.8rem] md:border-[0.1rem] border-opacity-[40%] border-white flex flex-col md:gap-[0.7rem] z-[9] bg-black">
          <h1 className="md:text-3xl sm:text-[5vw] neuem text-white text-center">
            Choose a plan
          </h1>
          <h2 className="text-white sm:text-[3vw] md:text-xl text-center neuem text-opacity-[30%]">
            We have a two-part subscription plan that gives you the best fit
          </h2>
        </div>
        <div className="w-full justify-center flex flex-col items-center z-[9] sm:pt-[7vw] md:pt-[3rem]">
          <p className="md:text-5xl neuem text-white sm:text-[7vw]">
            StationForge
          </p>
          {/* Pricing plans */}
          <div className="h-auto cover_scrollbar sm:flex w-full sm:relative sm:overflow-x-scroll">
            <div className="sm:w-auto md:w-[100rem] md:max-w-full md:mx-auto sm:px-[4vw] md:pt-[3rem]  sm:pt-[6.5vw] md:justify-center items-start sm:items-center flex md:gap-[5%] sm:gap-[5vw]">
              {plans.map((plan: any, index: any) => (
                <StandardPlan
                  key={index}
                  plan={plan}
                  email={email}
                  uuid={uuid}
                  currentplan={currentplan}
                  customer={customer}
                  current_subscription_plain={current_subscription_plain}
                  standard_isloading={standard_isloading}
                  setstandard_isloading={setstandard_isloading}
                />
              ))}
            </div>
          </div>
        </div>
        <Image
          src={bg_image}
          alt="background image"
          className="absolute w-full h-full object-cover sm:hidden top-0 left-0 z-[5]"
        />
        <Image
          src={mob_bg}
          alt="background image"
          className="absolute w-full h-full hidden object-cover sm:block top-0 left-0 z-[5]"
        />
      </div>
    </>
  );
};

export default Subscription_Plans;
