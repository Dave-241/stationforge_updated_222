"use client";

import { useEffect, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import test from "../../../public/subscription/post_1.webp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { initializeApp } from "firebase/app";
const Forge = (props: any) => {
  const { setforge_loader, forge_loader }: any = useProfile_Context();
  const [comeup, setcomeup] = useState(false);
  const [go_right, setgo_right] = useState(false);
  const [go_width, setgo_width] = useState(false);
  const [is_loading_allocation, setis_loading_allocation] = useState(true);
  const [is_loading_forge, setis_loading_forge] = useState(true);
  const [uid, setuid] = useState("");
  const [allocation_number, setallocation_number] = useState(0);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth: any = getAuth();

  // const {} = props
  // Function to hide the forge
  const hideForge = () => {
    setforge_loader(false);
  };

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuid(user.uid);
      } else {
        setuid;
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setcomeup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Trigger the slide-up effect after the component is mounted
    const timer = setTimeout(() => {
      setgo_right(true);
    }, 500); // Start the animation shortly after the component mounts

    // Optional: Clean up the timeout if the component unmounts before the animation starts
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Trigger the slide-up effect after the component is mounted
    const timer = setTimeout(() => {
      setgo_width(true);
    }, 1000); // Start the animation shortly after the component mounts

    // Optional: Clean up the timeout if the component unmounts before the animation starts
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Create a reference to the 'forge' collection filtered by 'userid'
    const forgeRef = collection(db, "forge");
    const q = query(forgeRef, where("userid", "==", uid));

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const forgeItems: any = [];
        querySnapshot.forEach((doc) => {
          forgeItems.push({ id: doc.id, ...doc.data() });
        });
        setitems(forgeItems);
        setis_loading_forge(false);
        // Store the items in state
      },
      (error) => {
        // Handle errors, such as lack of permissions
        console.error("Error fetching forge items: ", error);
      },
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [uid]); // Rerun the effect if userId changesuu

  const [items, setitems] = useState([]);
  const [preload_forge_arr, setpreload_forge_arr] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const logUserAllocation = (userUid: any) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userid", "==", userUid));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Assuming there's only one document with this userId
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setis_loading_allocation(false);
          setallocation_number(userData.allocations);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  };

  // get the allocation document
  useEffect(() => {
    if (uid.length > 1) {
      logUserAllocation(uid);
    }
  }, [uid]);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  // Handler for deleting an item
  const handleDelete = (itemId: any) => {
    const docRef = doc(db, "forge", itemId);
    deleteDoc(docRef)
      .then(() => {})
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  };

  return (
    <>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-[50%] flex  z-[999999] justify-center items-center "
        onClick={hideForge} // Hide forge when clicking on the background
      >
        <div
          className={` ${
            go_width ? "w-[46vw]" : "w-[21vw]"
          } z-[1000] h-[30vw]  ${
            comeup ? "translate-y-[0vw]" : "translate-y-[100vw]"
          }  overflow-hidden flex flex-wrap relative rounded-[2vw]`}
          onClick={modalClick}
          style={{ transition: "1s ease" }}
        >
          {/* the first section */}

          <div className="w-[21vw] z-[700] h-full bg-[#111111] flex justify-between items-center flex-col py-[2vw] px-[1vw] gap-[1.8vw]">
            {uid.length < 5 && (
              <p className="absolute top-[0.5vw] capitalize neuer text-white text-[1vw]">
                login to view forge
              </p>
            )}

            {/* the logo */}
            {!is_loading_allocation ? (
              <>
                <Image
                  src={logo}
                  alt="station forge logo"
                  className="w-[12vw] h-fit"
                />

                {/* the allocation information */}
                {/* monthly allocations */}
                <div className="w-full h-auto flex flex-col gap-[4vw]">
                  {/* holde the first two  */}
                  <div className="w-full h-auto flex flex-col gap-[1vw]">
                    <div className="w-full p-[1vw] flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]">
                      <p className="neuer text-white text-[1vw]">
                        This months allocation
                      </p>
                      <p className="neuer text-white text-[1vw] opacity-[50%]">
                        30
                      </p>
                    </div>
                    <div className="w-full p-[1vw] flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]">
                      <p className="neuer text-white text-[1vw]">Remaining</p>
                      <p className="neuer text-white text-[1vw] opacity-[50%]">
                        {allocation_number}
                      </p>
                    </div>
                  </div>

                  {/* hold the last two  */}
                  <div className="w-full h-auto flex flex-col gap-[1vw]">
                    <div className="w-full p-[1vw] flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]">
                      <p className="neuer text-white text-[1vw]">
                        Total Selected
                      </p>
                      <p className="neuer text-white text-[1vw] opacity-[50%]">
                        2
                      </p>
                    </div>
                    <button className="w-full h-[3vw] neuer text-[1.1vw] rounded-[1.2vw] bg-[#CCFF00]">
                      Confirm to your forge library
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-[12vw] h-[4vw] mt-[1vw] rounded-[1vw] bg-black animate-pulse"></div>

                {/* the allocation information */}
                {/* monthly allocations */}
                <div className="w-full h-auto flex flex-col gap-[4vw]">
                  {/* holde the first two  */}
                  <div className="w-full h-auto flex flex-col gap-[1vw]">
                    <div className="w-full h-[3.2vw] bg-black animate-pulse flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"></div>
                    <div className="w-full h-[3.2vw] bg-black animate-pulse flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"></div>
                  </div>

                  {/* hold the last two  */}
                  <div className="w-full h-auto flex flex-col gap-[1vw]">
                    <div className="w-full h-[3.2vw] bg-black animate-pulse flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"></div>
                    <button className="w-full h-[3vw] neuer text-[1.1vw] rounded-[1.2vw] bg-[#CCFF00] animate-pulse"></button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* now this is the second section  */}
          <div
            className={`w-[25vw] absolute top-0 py-[2vw]   gap-[1.8vw] flex flex-col justify-start items-start right-0 h-full ${
              go_right ? "translate-x-[0vw]" : "translate-x-[-30vw]"
            }  bg-[black]`}
            style={{
              transition: "1s ease",
            }}
          >
            {!is_loading_forge ? (
              <>
                <h2 className="neuem text-[2vw] text-white px-[1vw]">Forge</h2>

                {!items.length && (
                  <p className="neuem text-[1.3vw] opacity-[70%] text-white px-[1vw]">
                    There are no items in your forge
                  </p>
                )}
                <div className="w-full flex flex-col px-[1vw] justify-start gap-[1.6vw] scroll-container overflow-y-scroll">
                  {" "}
                  {items.map((e: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="w-full p-[1vw] flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"
                      >
                        <div className="w-auto flex items-center gap-[1vw]">
                          <Image
                            src={e.image}
                            unoptimized
                            width="0"
                            height="0"
                            alt="Forge iamges"
                            className="w-[3vw] h-[3vw]"
                          />
                          <p className="neuer text-white text-[1vw]">
                            {e.title}
                          </p>
                        </div>

                        <div className="flex items-center gap-[1vw]">
                          <div
                            className="text-[1.3vw] cursor-pointer opacity-[50%] text-white"
                            onClick={() => handleDelete(e.id)}
                          >
                            <i className="bi bi-dash-lg"></i>
                          </div>
                          <div className="w-[1vw] h-[1vw] cursor-pointer rounded-[100%] border-white border-opacity-[50%] border-[0.15vw]"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h2 className="neuem text-[2vw] text-white mx-[1vw] w-[14vw] rounded-[1vw] h-[3vw] bg-[#111111]  animate-pulse"></h2>

                <div className="w-full flex flex-col px-[1vw] justify-start gap-[1.6vw] scroll-container overflow-y-scroll">
                  {" "}
                  {preload_forge_arr.map((e: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="w-full py-[2vw] flex border-[0.1vw] bg-[#111111]  animate-pulse border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"
                      ></div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forge;
