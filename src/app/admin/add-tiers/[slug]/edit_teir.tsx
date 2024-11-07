"use client";

import { useProfile_Context } from "@/app/utils/profile_context";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Stripe from "stripe";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";
import TailwindLoader from "../../manage-tiers/tailwind_loader";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

const Edit_teir = ({ id }: any) => {
  const router = useRouter();
  const { setpage_loader }: any = useProfile_Context();

  const [value, setValue] = useState("");
  const [value_copy, setValue_copy] = useState("");
  const [plainTextValue, setPlainTextValue] = useState("");

  // Initializing the editor key with 0 to force re-render when updated
  const [editorKey, setEditorKey] = useState(0);
  const [tierName, setTierName] = useState("");
  const [seatLimit, setSeatLimit] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState<any>("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [stripeProductId, setStripeProductId] = useState("");
  const [isloading, setisloading] = useState(true);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Fetch tier data from Firestore
  useEffect(() => {
    if (id) {
      const docRef = doc(db, "tiers", id);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setTierName(data.name || "");
          setValue(data.description || "");
          setValue_copy(data.description || "");
          console.log(data.description);

          // Trigger editor re-render after data is loaded
          setEditorKey((prevKey) => prevKey + 1);

          setSeatLimit(data.seat_limit || "");
          setPricePerMonth(data.pricePerMonth || "");
          setStripeProductId(data.product_id || "");
        }
      });

      return () => unsubscribe();
    }
  }, [id]);

  // Fetch Stripe monthly price and update form field
  useEffect(() => {
    const fetchStripePrice = async () => {
      if (stripeProductId) {
        try {
          const prices = await stripe.prices.list({
            product: stripeProductId,
          });
          const monthlyPrice = prices.data.find(
            (price) => price.recurring?.interval === "month",
          );
          console.log(monthlyPrice, stripeProductId, prices);
          if (monthlyPrice) {
            setPricePerMonth((monthlyPrice.unit_amount || 0) / 100);
          }

          setisloading(false);
        } catch (error) {
          console.error("Error fetching Stripe price:", error);
        }
      }
    };
    fetchStripePrice();
  }, [stripeProductId]);

  const onEditorInputChange = (newValue: any, editor: any) => {
    setValue(newValue);
    const plainText = editor.getContent({ format: "text" });
    setPlainTextValue(plainText);
  };

  const handleCreateSubscriptionTier = async () => {
    setIsPublishing(true);
    try {
      await stripe.products.update(stripeProductId, {
        name: tierName,
        description: plainTextValue,
      });

      const collection_ref = doc(db, "tiers", id);
      await updateDoc(collection_ref, {
        name: tierName,
        description: value,
      });

      router.push("/admin/manage-tiers");
    } catch (error) {
      console.error("Error creating subscription tier:", error);
      alert("There was an error creating the subscription tier.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      {isloading ? (
        <TailwindLoader />
      ) : (
        <div className="flex flex-col gap-[1.5rem]">
          <div className="relative sm:pb-[2rem]">
            <button className="text-base neuem" onClick={() => router.back()}>
              <i className="bi bi-chevron-left"></i> Back
            </button>
            <p className="neueb absolute bottom-0 left-[50%] translate-x-[-50%]">
              EDIT SUBSCRIPTION TIER
            </p>
          </div>

          <div className="flex items-center gap-[1rem] w-[30rem] mx-auto text-[#353232] text-opacity-[50%] max-w-full">
            <i className="bi bi-exclamation-circle-fill"></i>
            <p className="neuem text-sm">
              From this viewpoint, you can edit a tier name, and description.
              seat limit and pricing cannot be changed.
            </p>
          </div>

          <div className="w-full flex md:w-[60rem] max-w-full sm:w-full mx-auto neuem items-center flex-col gap-[2rem]">
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

            <div className="flex flex-col pb-[1rem] w-full gap-[0.5rem]">
              <label className="neueb">Pricing*</label>
              <div className="w-full flex sm:flex-col gap-[1rem]">
                <div className="flex flex-col w-full gap-[0.5rem]">
                  <label className="neuer text-base">Price per month ($)</label>
                  <input
                    type="number"
                    value={pricePerMonth}
                    disabled
                    className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%] bg-white"
                    placeholder="0$"
                  />
                </div>

                <div className="flex flex-col w-full gap-[0.5rem]">
                  <label className="neuer">Set seat limit</label>
                  <input
                    type="number"
                    disabled
                    value={seatLimit}
                    className="outline-none border-none rounded-[15px] focus:border border-black w-full h-[4.5rem] px-[3%] bg-white"
                    placeholder="Enter seat limit *"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-[0.5rem]">
              <label className="neueb">Description</label>
              <Editor
                apiKey="o6poh8mrrg3olm60uzci8redu8zma5ystr23b8f78hku2msu"
                onEditorChange={onEditorInputChange}
                value={value}
                key={editorKey} // Re-renders the editor after data loads
                init={{
                  placeholder: "Enter description *",
                  height: 300,
                }}
              />
            </div>

            <button
              onClick={handleCreateSubscriptionTier}
              className="bg-[#CCFF00] cursor-pointer py-[1rem] sm:w-full sm:rounded-[0.5rem] hover:bg-opacity-[40%] neuer capitalize flex justify-center items-center text-sm rounded-[1rem] px-[5rem]"
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit_teir;
