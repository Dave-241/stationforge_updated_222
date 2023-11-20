"use client";

import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import firebaseConfig from "../utils/fire_base_config";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";

const Penalty_kickout = ({ sethide_penalty_kickout, user_doc_id }: any) => {
  const router = useRouter();

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  const deleteuser = () => {
    const user_ref = doc(db, "users", user_doc_id);
    deleteDoc(user_ref)
      .then(() => {
        window?.location?.reload();
      })
      .catch((err) => {
        console.log("Error deleting user" + err);
      });
    // router.replace();
  };
  return (
    <>
      <div
        className="w-full h-full sm:px-[5vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethide_penalty_kickout(true);
        }}
      >
        <div
          className="w-[25vw] sm:w-full sm:rounded-[5vw] sm:h-[46vw] sm:gap-[4vw] h-[13vw] flex-col gap-[1.2vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1 className="text-[1.2vw] sm:text-[4.5vw] text-center neuem">
            Are you sure you want to <br /> kick this user out
          </h1>

          <div className="w-full flex justify-between gap-[1.5vw] items-center">
            <button
              className="h-[3.5vw] sm:h-[13vw] sm:text-[3.5vw] w-full bg-[#FF0000] neuer text-white hover:bg-opacity-[80%] text-[0.9vw] rounded-[1vw] sm:rounded-[3vw]"
              onClick={() => {
                deleteuser();
              }}
            >
              Kick out
            </button>
            <button
              className="h-[3.5vw] sm:h-[13vw] sm:text-[3.5vw] w-full bg-[#CCFF00] neuer text-black hover:bg-opacity-[80%] text-[0.9vw] rounded-[1vw] sm:rounded-[3vw]"
              onClick={() => {
                sethide_penalty_kickout(true);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Penalty_kickout;