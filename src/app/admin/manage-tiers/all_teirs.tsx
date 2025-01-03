"use client";

import { useEffect, useState } from "react";
import { useProfile_Context } from "@/app/utils/profile_context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore"; // Use onSnapshot for real-time updates
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import TailwindLoader from "./tailwind_loader";
import Delete_tier_modal from "./delete_tier_modal";
import Stripe from "stripe";

const All_tiers = () => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

  const router = useRouter();
  const { setpage_loader }: any = useProfile_Context();
  // Initialize Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // State to hold the tiers
  const [tiers, setTiers] = useState<any>([]);
  const [hiddenTiers, setHiddenTiers] = useState<any>([]);
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    const db = getFirestore(); // Initialize Firestore
    const tiersCollection = collection(db, "tiers"); // Replace "tiers" with your collection name

    // Real-time listener using onSnapshot
    const unsubscribe = onSnapshot(tiersCollection, (snapshot) => {
      setpage_loader(true); // Show loader

      const allTiers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Separate hidden and unhidden tiers
      const visibleTiers: any = allTiers.filter((tier: any) => !tier.hidden); // Assuming 'hidden' is a boolean field in your Firestore documents
      const hiddenTiers: any = allTiers.filter((tier: any) => tier.hidden);

      setTiers(visibleTiers);
      setHiddenTiers(hiddenTiers);
      setpage_loader(false); // Hide loader
      setisloading(false);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [setpage_loader]);

  const update_hidden = async (id: any, status: any, stripe_id: any) => {
    // Update the subscription to pause it
    console.log(stripe_id);
    await stripe.products.update(stripe_id, {
      active: !status,
    });

    // Step 6: Update parent document (tiers)
    await updateDoc(doc(db, "tiers", id), {
      hidden: status,
    });
  };

  const [show_delete_modal, setshow_delete_modal] = useState(false);
  const [tier_id, settier_id] = useState("");
  const [teir_name, setteir_name] = useState("");
  const [teir_subscription_id, setteir_subscription_id] = useState("");
  return (
    <>
      <div className="flex flex-col gap-[2rem]">
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
            ALL SUBSCRIPTION TIERS
          </p>
        </div>

        {isloading ? (
          <TailwindLoader />
        ) : (
          <>
            {/* the unhidden tiers */}
            <div className="flex flex-col w-full items-center gap-[1rem]">
              {tiers.map((tier: any) => (
                <div
                  key={tier.id}
                  className="md:w-[60rem] sm:flex-col md:max-w-full bg-white py-[1.2rem] sm:w-full flex sm:gap-[0.5rem] sm:px-[5%] md:justify-between items-center rounded-[20px] px-[3%]"
                >
                  <p className="neuem text-xl">
                    {tier.name || "No Name Found"}
                  </p>
                  <div className="flex gap-[1rem]">
                    <button
                      onClick={() => {
                        update_hidden(tier.id, true, tier.product_id);
                      }}
                      className="text-xl hover:text-[#95B611]"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    <button
                      onClick={() => {
                        setteir_name(tier.name);
                        settier_id(tier.id);
                        setteir_subscription_id(tier.product_id);
                        setshow_delete_modal(true);
                      }}
                      className="text-[#FF0000] hover:text-black text-xl"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                    <Link
                      href={`/admin/add-tiers/${tier.id}`}
                      className="neuem flex items-center hover:text-green-700 text-sm"
                    >
                      EDIT
                    </Link>
                    <Link
                      href={`/admin/manage-tiers/${tier.id}`}
                      onClick={() => {
                        setpage_loader(true);
                      }}
                      style={{ whiteSpace: "nowrap" }}
                      className="bg-[#F5F5F5] hover:bg-white border hover:border-[#95B611] hover:text-black cursor-pointer py-[1rem] hover:bg-opacity-[40%] neuer flex justify-center text-[#95B611] items-center text-xs rounded-[1rem] px-[1rem]"
                    >
                      Manage release
                    </Link>
                  </div>
                </div>
              ))}

              <Link
                href={"/admin/add-tiers"}
                onClick={() => {
                  setpage_loader(true);
                }}
                style={{ whiteSpace: "nowrap" }}
                className="bg-[#CCFF00] cursor-pointer py-[1rem] sm:w-full sm:rounded-[0.5rem] hover:bg-opacity-[40%] neueb capitalize flex justify-center items-center text-sm rounded-[1rem] px-[2rem]"
              >
                Add subscription tier{" "}
              </Link>
            </div>

            {/* the hidden tiers */}
            <div className="flex flex-col w-full pt-[2rem] items-center gap-[1rem]">
              <p className="text-xl neuer pb-[1rem]">
                <i className="bi bi-eye-slash-fill pr-[1rem]"></i>
                Hidden tiers
              </p>
              {hiddenTiers.map((tier: any) => (
                <div
                  key={tier.id}
                  className="md:w-[60rem] sm:flex-col md:max-w-full bg-white py-[1.2rem] sm:w-full flex sm:gap-[0.5rem] sm:px-[5%] md:justify-between items-center rounded-[20px] px-[3%]"
                >
                  <p className="neuem text-xl">
                    {tier.name || "No Name Found"}
                  </p>
                  <div className="flex gap-[1rem]">
                    <button
                      onClick={() => {
                        update_hidden(tier.id, false, tier.product_id);
                      }}
                      className=" hover:text-[#95B611] text-xl"
                    >
                      <i className="bi bi-eye-slash-fill"></i>
                    </button>
                    <button
                      onClick={() => {
                        setteir_name(tier.name);
                        settier_id(tier.id);
                        setshow_delete_modal(true);
                      }}
                      className="text-[#FF0000] hover:text-black text-xl"
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                    <Link
                      href={`/admin/add-tiers/${tier.id}`}
                      className="neuem flex items-center hover:text-green-700 text-sm"
                    >
                      EDIT
                    </Link>{" "}
                    <Link
                      href={`/admin/manage-tiers/${tier.id}`}
                      onClick={() => {
                        setpage_loader(true);
                      }}
                      style={{ whiteSpace: "nowrap" }}
                      className="bg-[#F5F5F5] hover:bg-white border hover:border-[#95B611] hover:text-black cursor-pointer py-[1rem] hover:bg-opacity-[40%] neuer flex justify-center text-[#95B611] items-center text-xs rounded-[1rem] px-[1rem]"
                    >
                      Manage release
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {show_delete_modal && (
        <Delete_tier_modal
          tier_id={tier_id}
          teir_name={teir_name}
          teir_subscription_id={teir_subscription_id}
          setshow_delete_modal={setshow_delete_modal}
        />
      )}
    </>
  );
};

export default All_tiers;
