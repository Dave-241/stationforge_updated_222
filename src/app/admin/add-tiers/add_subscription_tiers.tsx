"use client";

import { useProfile_Context } from "@/app/utils/profile_context";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import Link from "next/link";
import Stripe from "stripe";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

const Add_subscription_tiers = () => {
  const router = useRouter();
  const { setpage_loader }: any = useProfile_Context();

  const [value, setValue] = useState(""); // For HTML content
  const [plainTextValue, setPlainTextValue] = useState(""); // For plain text content
  const [tierName, setTierName] = useState("");
  const [seatLimit, setSeatLimit] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState("");
  const [hidden, sethidden] = useState(false);
  // const [discount, setDiscount] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  const onEditorInputChange = (newValue: any, editor: any) => {
    setValue(newValue);
    const plainText = editor.getContent({ format: "text" }); // Extract plain text
    setPlainTextValue(plainText);
    console.log("playtest", plainText);
  };

  // Function to create subscription tier on Stripe
  const handleCreateSubscriptionTier = async () => {
    setIsPublishing(true); // Show publishing indicator
    try {
      const product = await stripe.products.create({
        name: tierName,
        description: plainTextValue, // Use plain text for description
      });

      const monthlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: parseInt(pricePerMonth) * 100,
        currency: "usd",
        recurring: { interval: "month" },
      });

      // update the engagement collection
      const collection_ref = collection(db, "tiers");
      addDoc(collection_ref, {
        createdAt: serverTimestamp(),
        name: tierName,
        description: value,
        monthly_price: pricePerMonth,
        product_id: product.id,
        monthly_price_id: monthlyPrice.id,
        hidden: hidden,
        seat_limit: seatLimit,
      })
        .then(() => {
          // console.log("this is engagement");
          setTierName("");
          setSeatLimit("");
          setPricePerMonth("");
          setValue("");
          setPlainTextValue("");
          router.push("/admin/manage-tiers");
        })
        .catch((err) => {
          console.log("New error" + err);
          alert("There was an error creating the subscription tier.");

          setIsPublishing(false);
        });
    } catch (error) {
      console.error("Error creating subscription tier:", error);
      alert("There was an error creating the subscription tier.");
    } finally {
      setIsPublishing(false); // Stop publishing indicator
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[1.5rem]">
        <div className="relative sm:pb-[2rem]">
          <button
            className="text-base neuem"
            onClick={() => {
              router.back();
            }}
          >
            <i className="bi bi-chevron-left"></i> Back
          </button>
          <p
            style={{ whiteSpace: "nowrap" }}
            className="neueb absolute bottom-0 left-[50%] translate-x-[-50%]"
          >
            ADD SUBSCRIPTION TIER
          </p>
        </div>

        <div className="flex items-center gap-[1rem] w-[35rem] mx-auto text-[#353232] text-opacity-[50%] max-w-full">
          <i className="bi bi-exclamation-circle-fill"></i>
          <p className="neuem text-sm">
            From this viewpoint, you can set a tier name, category, access,
            license, pricing, and description. Early bird seat limit and pricing
            cannot be changed once set.
          </p>
        </div>

        <div className="w-full flex md:w-[60rem] max-w-full sm:w-full mx-auto neuem items-center flex-col gap-[2rem]">
          {/* Tier Name */}
          <div className="flex flex-col w-full gap-[0.5rem]">
            <label className="neueb">Tier name</label>
            <input
              type="text"
              value={tierName}
              onChange={(e) => setTierName(e.target.value)}
              className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%] bg-white"
              placeholder="Enter tier name *"
            />
          </div>

          {/* hide button */}
          <div className="w-full my-[-1rem]">
            <button
              onClick={() => {
                sethidden(!hidden);
              }}
              className=""
            >
              {!hidden ? (
                <i className="bi bi-eye-fill pr-[1rem]"></i>
              ) : (
                <i className="bi bi-eye-slash-fill pr-[1rem]"></i>
              )}

              {hidden ? "Click to Unhide" : "Click to Hide"}
            </button>{" "}
          </div>

          {/* Pricing */}
          <div className="flex flex-col pb-[1rem] w-full gap-[0.5rem]">
            <label className="neueb">Pricing*</label>
            <p className="neuem text-sm w-[15rem] pb-[2rem] text-[#353232] text-opacity-[50%] max-w-full">
              Select pricing option for this tier. Note prices cannot be changed
              after addition
            </p>
            <div className="w-full flex sm:flex-col gap-[1rem]">
              <div className="flex flex-col w-full gap-[0.5rem]">
                <label className="neuer text-base">Price per month ( $ )</label>
                <input
                  type="number"
                  value={pricePerMonth}
                  onChange={(e) => setPricePerMonth(e.target.value)}
                  className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%] bg-white"
                  placeholder="0$"
                />
              </div>

              {/* Seat Limit */}
              <div className="flex flex-col w-full gap-[0.5rem]">
                <label className="neuer">Set seat limit</label>
                <input
                  type="number"
                  value={seatLimit}
                  onChange={(e) => setSeatLimit(e.target.value)}
                  className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%] bg-white"
                  placeholder="Enter seat limit *"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col w-full gap-[0.5rem]">
            <label className="neueb">Description</label>
            <Editor
              apiKey={"o6poh8mrrg3olm60uzci8redu8zma5ystr23b8f78hku2msu"}
              onEditorChange={onEditorInputChange}
              value={value}
              initialValue={"Enter description *"}
            />
          </div>

          {/* Publish Button */}
          <button
            onClick={handleCreateSubscriptionTier}
            className="bg-[#CCFF00] cursor-pointer py-[1rem] sm:w-full sm:rounded-[0.5rem] hover:bg-opacity-[40%] neuer capitalize flex justify-center items-center text-sm rounded-[1rem] px-[5rem]"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_subscription_tiers;
