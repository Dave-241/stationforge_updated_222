"use client ";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import stan_1_old from "../../../public/subscription/stan_1.webp";
import stan_1 from "../../../public/subscription/mer_1.webp";

import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  manageSubscription,
  pay_standard_Subscriptions,
} from "../utils/stripe";
import { useProfile_Context } from "../utils/profile_context";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../utils/fire_base_config";
// Initialize Stripe once at the top of your module, outside of your function
const pusblishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = loadStripe(pusblishableKey);

const StandardPlan = ({
  currentplan,
  email,
  uuid,
  plan,
  current_subscription_plain,
  index,
  loading,
  setloading,
}: any) => {
  const { setpage_loader, Add_notification }: any = useProfile_Context();
  const [customer, setCustomer] = useState<string | null>(null);
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Reference to the collection in Firestore
        const collectionRef = collection(db, "user_subscription_webhook");

        // Create a query to find the document with the specified email and priceId
        const q = query(
          collectionRef,
          where("email", "==", email),
          where("price_id", "==", plan.monthly_price_id),
        );

        // Fetch the documents
        const querySnapshot = await getDocs(q);
        console.log(email, plan.monthly_price_id);
        // Check if the document exists and update state with the customer field
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data(); // Assuming only one match
          setCustomer(docData.customer); // Store the customer field in state

          console.log(docData);
        } else {
          console.log("No matching document found.");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    // Fetch customer data if email and priceId are provided
    if (email && plan.monthly_price_id) {
      fetchCustomerData();
    }
  }, [email, plan.monthly_price_id]);
  const router = useRouter();

  // Function to set individual loading state for an item
  const handleLoadingState = (index: number, state: boolean) => {
    const newLoadingState = [...loading];
    newLoadingState[index] = state;
    setloading(newLoadingState);
  };

  const paynow = async (index: number) => {
    if (!uuid || !email || !plan.product_id) {
      console.warn("UUID, Email, or Product ID missing.");
      handleLoadingState(index, false); // Set loading to false for this item
      return;
    }

    try {
      handleLoadingState(index, true); // Set loading to true for this item
      Add_notification("Initiated standard subscription");

      // Fetch the Stripe session URL using the product_id
      const session_url = await pay_standard_Subscriptions(
        plan.monthly_price_id,
        uuid,
        email,
        plan.product_id,
      );

      // Proceed only if session URL is successfully retrieved
      if (session_url.id) {
        const stripe = await stripePromise;
        const result = await stripe?.redirectToCheckout({
          sessionId: session_url.id,
        });

        // Handle result errors
        if (result && result.error) {
          console.error("Stripe redirection error:", result.error.message);
          throw new Error(result.error.message);
        }
      }
    } catch (error: any) {
      handleLoadingState(index, false); // Set loading to false for this item
      console.error("Error creating Checkout session:", error);
    } finally {
      handleLoadingState(index, false); // Set loading to false for this item
    }
  };

  const manage_subscription = async (index: number) => {
    if (!uuid || !email || !plan.product_id) {
      console.warn("UUID, Email, or Product ID missing.");
      handleLoadingState(index, false); // Set loading to false for this item
      return;
    }

    try {
      handleLoadingState(index, true); // Set loading to true for this item
      Add_notification("Initiated standard subscription");

      // Fetch the Stripe session URL using the product_id
      const session_url = await manageSubscription("cus_RAlhqOHiyFDBNt");

      // Proceed only if session URL is successfully retrieved
      if (session_url.url) {
        const stripe = await stripePromise;

        router.push(session_url.url);
      }
    } catch (error: any) {
      handleLoadingState(index, false); // Set loading to false for this item
      console.error("Error creating Checkout session:", error);
    } finally {
      handleLoadingState(index, false); // Set loading to false for this item
    }
  };

  const [isExpanded, setIsExpanded] = useState(false); // For read more functionality
  const trimmed_text = plan.description.slice(0, 200);
  return (
    <>
      <div className="md:w-[45%]  h-fit lg:w-[30%] sm:w-[80vw] sm:flex-shrink-0 sm:py-[10vw] md:h-auto md:py-[2rem] lg:py-[2rem] subscription_merchant_background_color  md:px-[1.2rem] sm:px-[6vw] flex flex-col justify-center items-center  bg-[#111111] md:rounded-[1.2rem] sm:border-l-[1.6vw] md:border-l-[0.5rem] md:gap-[2rem] sm:gap-[4vw] sm:rounded-[4vw]   border-[#CCFF00]">
        {/* first row div */}
        <div className="w-full flex justify-between items-center">
          <Image
            src={stan_1}
            className="md:w-[3rem] sm:w-[15vw] h-fit"
            alt="most popular image placeholder"
          />

          {/* <h3 className="neuer text-[1.2vw] sm:text-[3vw] sm:py-[2vw] sm:px-[4vw] sm:rounded-[4vw] text-black bg-white py-[0.7vw] px-[1.4vw] rounded-[2.7vw]">
            Most popular{" "}
          </h3> */}
        </div>
        {/* second row div */}
        <div className="w-full flex   flex-col gap-[0.4vw] sm:gap-[1vw] ">
          <h2 className="md:text-3xl text-black neuem sm:text-[6vw]">
            {plan.name}
          </h2>
          {/* <h3 className="text-white neuer text-opacity-[40%] sm:text-[2.7vw] text-[1vw]">
            Access to monthly releases <br className="sm:hidden" />
            (files <br className="sm:block hidden" /> are pre-supported)
          </h3> */}
        </div>

        {/* thired div  */}
        <div className="w-full">
          <h3 className="text-black md:text-3xl neuem sm:text-2xl ">
            ${plan.monthly_price}{" "}
            <span className="text-opacity-[60%] text-black  text-base">
              / month (plus VAT)
            </span>
          </h3>
        </div>

        <div className="flex flex-col">
          <div
            style={{ color: "black" }}
            className={` neuer md:container   text-black bg-transparent text-dark-blue dark:text-black 
            [&_p]:text-sm  [&_p]:text-[black] [&_p_md]:text-sm  [&_p]:leading-relaxed 
            [&_h1]:text-3xl [&_h1]:w-full [&_h1]:font-bold [&_h1]:mb-2 
            [&_h2]:text-2xl [&_h2]:w-full [&_h2_md]:text-3xl [&_h2_lg]:text-4xl [&_h2]:font-bold [&_h2]:mb-4 
            [&_h3]:text-xl [&_h3]:w-full [&_h3_md]:text-2xl [&_h3_lg]:text-3xl [&_h3]:font-bold [&_h3]:mb-4 
            [&_h4]:text-lg [&_h4]:w-full [&_h4_md]:text-xl [&_h4_lg]:text-2xl [&_h4]:font-bold [&_h4]:mb-4 
            [&_h5]:text-base [&_h5]:w-full [&_h5_md]:text-lg [&_h5_lg]:text-xl [&_h5]:font-bold [&_h5]:mb-4 
            [&_h6]:text-sm [&_h6]:w-full [&_h6_md]:text-base [&_h6_lg]:text-lg [&_h6]:font-bold [&_h6]:mb-4 
            [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-5
            [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-5
            [&_li]:mb-3
            [&_table]:w-full [&_table]:border-collapse [&_table]:border 
            [&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-black [&_th]:text-left 
            [&_td]:border [&_td]:px-4 [&_td]:py-2
            [&_img]:inline [&_img]:m-2
            [&_a]:underline [&_a]:underline-offset-[5px] [&_a]:text-[#440C0C]
            `}
            // dangerouslySetInnerHTML={{ __html: plan.description }}
            dangerouslySetInnerHTML={{
              __html: isExpanded ? plan.description : trimmed_text + "...",
            }}
          ></div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#677c11] mt-[1rem] underline-offset-4 text-sm text-left underline "
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* fivth div  also known as button */}
        <button
          className="w-full md:py-[1rem]  flex justify-center items-center sm:gap-[4vw] gap-[1vw] md:text-sm lg:text-xl neuem md:rounded-[3.7rem] sm:rounded-[5vw] transition duration-[0.2s] hover:bg-[#7e9426] bg-[#CCFF00] sm:text-[3.7vw] sm:h-[10vw] "
          onClick={() => {
            if (!uuid) {
              setpage_loader(true);
              router.push("/login?ref=subscription");
            } else if (!customer) {
              paynow(index);
            } else if (customer) {
              manage_subscription(index);
            }
          }}
        >
          {!customer && "Join"}
          {customer && "Manage Teir"}

          {loading[index] && (
            <div className="rounded-[100%] sm:h-[7vw] sm:border-t-[1vw] sm:w-[7vw] md:h-[2rem] md:w-[2rem] border-solid md:border-t-[0.3rem] border-[black] animate-spin"></div>
          )}
        </button>
      </div>{" "}
    </>
  );
};

export default StandardPlan;
