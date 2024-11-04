"use client";

import { stripe } from "@/app/utils/stripe";
import { useState } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";

const Delete_tier_modal = ({
  setshow_delete_modal,
  tier_id,
  teir_name,
  teir_subscription_id,
}: any) => {
  const [isPublishing, setIsPublishing] = useState(false);

  // Initialize Firebase App and Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Function to archive subscription tier on Stripe and delete from Firestore
  const handleDeleteSubscriptionTier = async () => {
    setIsPublishing(true); // Show publishing indicator
    try {
      // Step 1: Deactivate the product on Stripe (archive it)
      await stripe.products.update(teir_subscription_id, { active: false });

      // Step 2: Delete the document from Firebase Firestore
      deleteDoc(doc(db, "tiers", tier_id))
        .then(() => {
          setshow_delete_modal(false); // Close the modal
        })
        .catch((error) => {
          console.error("Error removing document from Firebase: ", error);
        });
    } catch (error) {
      console.error("Error archiving subscription tier:", error);
      alert("There was an error archiving the subscription tier.");
    } finally {
      setIsPublishing(false); // Stop publishing indicator
    }
  };

  return (
    <>
      <div className="w-full h-full px-[5%] flex justify-center z-[1000] items-center fixed top-0 left-0 bg-black bg-opacity-[70%]">
        <div className="md:w-[30rem] p-[1.5rem] flex flex-col gap-[1rem] max-w-full w-full bg-white rounded-[0.5rem]">
          <p className="text-sm neuem">
            Are you sure you want to archive this tier:
            <span className="text-red-600"> {teir_name}</span>
          </p>

          <div className="w-full flex neuer text-sm gap-[1rem]">
            <button
              onClick={() => setshow_delete_modal(false)}
              className="w-full border duration-[0.4s] transition border-[red] text-[red] hover:bg-[grey] hover:border-[grey] rounded-[0.4rem] hover:text-white py-[0.7rem]"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubscriptionTier}
              className="w-full border duration-[0.4s] transition hover:bg-black bg-[red] text-white rounded-[0.4rem] py-[0.7rem]"
            >
              {isPublishing ? "Archiving" : "Archive"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delete_tier_modal;
