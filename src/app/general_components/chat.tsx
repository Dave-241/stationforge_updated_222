"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import { initializeApp } from "firebase/app";
import exit_modal from "../../../public/mob_ham_exit.webp";
import firebaseConfig from "../utils/fire_base_config";
import station_forge from "../../../public/chats/station_forge.webp";
import avatar from "../../../public/setings/avatar.jpg";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { fromUnixTime } from "date-fns";
import format from "date-fns/format";

const Chats_modal = () => {
  const [loading, setloading] = useState(false);
  const [btn_disabled, setbtn_disabled] = useState(false);
  const [create_new_sess, setcreate_new_sess] = useState(true);
  const [show_end_and_start_btn, setshow_end_and_start_btn] = useState(false);

  const [time_date, settime_date] = useState("Date");
  const [chat_session_id, setchat_session_id] = useState("");
  const [chat_text, setchat_text] = useState("");
  const [chat_data_arr, setchat_data_arr] = useState<any>([]);

  const {
    show_chat_modal,
    setshow_chat_modal,
    sess_id,
    create_chat_session,
  }: any = useProfile_Context();
  const [hide, sethide] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chats = [
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
  ];

  const [uuid, setuuid] = useState("");
  // useEffect(() => {
  //   setconfirm_ImageWasChanged(ImageWasChanged);
  // }, [ImageWasChanged]);
  const ref_modal = useRef<any>(null);

  const router = useRouter();

  // firebase init

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  // Initialize services

  // get authentication
  const auth: any = getAuth();

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuuid(user.uid);
        // User is authenticated, redirect to a protected route
        // Replace with your protected route
      } else {
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
        router.push("/login");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref_modal.current && !ref_modal.current.contains(event.target)) {
        sethide(true);
        setTimeout(() => {
          setshow_chat_modal(false);
        }, 1000);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (sess_id == "") {
  //     return;
  //   } else if (sess_id != "") {
  //     create_chat_session(uuid);
  //   }
  // }, [sess_id, uuid]);
  const currentUserUid = auth.currentUser?.uid;

  const create_new_session = () => {
    const chatSessionsRef = collection(db, "chat_sessions");
    const chatTextref = collection(db, "chat_text");

    addDoc(chatSessionsRef, {
      Endedsession: false,
      JoinedUserid: currentUserUid,
      SessioncreatedAt: serverTimestamp(),
      Joinedmoderatorid: "",
    })
      .then((doc) => {
        setcreate_new_sess(false);
        setshow_end_and_start_btn(true);
        addDoc(chatTextref, {
          createdAt: serverTimestamp(),
          from: "moderator",
          message:
            "Hello , how can we help you today. Please allow for sometime our customer support would be with you in a moment ",
          session_chat_id: doc.id,
        })
          .then(() => {
            setchat_session_id(doc.id);
            setbtn_disabled(false);
          })
          .catch((err) => {
            console.log("error whie creating new text" + err);
          });
      })
      .catch((err) => {
        console.log("Error creating a new chat session " + err);
      });
  };

  useEffect(() => {
    if (!currentUserUid) {
      // No user is authenticated, you might want to handle this case
      return;
    }

    const chatSessionsRef = collection(db, "chat_sessions");
    const chatSessionsQuery = query(
      chatSessionsRef,
      where("JoinedUserid", "==", currentUserUid),
      where("Endedsession", "==", false),
    );

    const unsubscribe = onSnapshot(chatSessionsQuery, (snapshot) => {
      if (snapshot.empty) {
        // Handle case when there are no documents
        if (create_new_sess) {
          console.log(create_new_sess);
          create_new_session();
        } else {
          return;
        }

        return;
      }

      snapshot.forEach((doc) => {
        // Handle each document
        const chatSessionData = doc.data();
        setchat_session_id(doc.id);
        setshow_end_and_start_btn(true);
        // Convert Firebase Timestamp to JavaScript Date

        // Assuming your timestamp field is named 'SessioncreatedAt'
        const timestampValue = doc.data().SessioncreatedAt;
        if (timestampValue) {
          // Convert Firebase Timestamp to JavaScript Date
          const date = fromUnixTime(timestampValue?.seconds);

          // Format the date using date-fns
          const formattedDate = format(date, "d MMMM, yyyy "); // Customize the format as needed

          settime_date(formattedDate);
        }

        scrollToBottom();
        console.log("Chat Session Data:", chatSessionData);
      });
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, [currentUserUid]); // Dependency on currentUserUid, so it re-subscribes when the user logs in or out

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollHeight = scrollAreaRef.current.scrollHeight;
      scrollAreaRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const handlesubmit = (e: any) => {
    e.preventDefault();
    setbtn_disabled(true);
    setchat_text("");
    setbtn_disabled(false);
    scrollToBottom();
    if (chat_text.length > 0 && chat_session_id) {
      const chatTextref = collection(db, "chat_text");

      addDoc(chatTextref, {
        createdAt: serverTimestamp(),
        from: "user",
        message: chat_text,
        session_chat_id: chat_session_id,
      })
        .then(() => {
          // setchat_session_id(doc.id);
          setchat_text("");
          setbtn_disabled(false);
          scrollToBottom();
        })
        .catch((err) => {
          console.log("error whie creating new text" + err);
          setbtn_disabled(false);
        });
    }
  };

  useEffect(() => {
    if (chat_session_id) {
      const chatTextRef = collection(db, "chat_text");
      const chatTextQuery = query(
        chatTextRef,
        where("session_chat_id", "==", chat_session_id),
        orderBy("createdAt", "asc"),
      );

      const unsubscribe = onSnapshot(chatTextQuery, (snapshot) => {
        if (snapshot.empty) {
          // Handle case when there are no documents
          //  create_new_session();
          return;
        }

        const chatTextDataArray: any = [];
        snapshot.forEach((doc) => {
          // Handle each document
          const chatTextData = doc.data();
          chatTextDataArray.push({
            chatTextId: doc.id,
            chatTextData: chatTextData,
          });
        });
        setchat_data_arr(chatTextDataArray);
        console.log(chatTextDataArray);
      });
      return () => {
        // Unsubscribe when the component unmounts
        unsubscribe();
      };
    }
  }, [chat_session_id]); // Dependency on chatid, so it re-subscribes when chatid changes

  const updateChatSessionEndedStatus = async () => {
    const chatSessionsRef = collection(db, "chat_sessions");
    const chatSessionDocRef = doc(chatSessionsRef, chat_session_id);
    setcreate_new_sess(false);
    try {
      await updateDoc(chatSessionDocRef, {
        Endedsession: true,
      });
      console.log(`Chat session with ID ${chat_session_id} marked as ended.`);
      setchat_text("");
      setchat_session_id("");
      setcreate_new_sess(false);

      setbtn_disabled(true);
    } catch (error) {
      console.error("Error updating chat session:", error);
      // Handle the error according to your requirements
    }
  };
  useEffect(() => {
    sethide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>

      <div
        className={`w-[33vw] sm:max-h-[100vh] sm:h-full sm:w-full fixed pt-[6.5vw] sm:pt-[25vw] pb-[6vw] rounded-l-[1vw]  h-[43vw] max-h-[96vh]  sm:py-[5vw] px-[1.5vw]  top-[50%] translate-y-[-50%]  z-[999]   sm:gap-[4vw]  bg-[#111111] settings flex flex-col gap-[1.5vw] border-[#434343] overflow-hidden ${
          hide ? "right-[-50vw] sm:right-[-110vw]" : "right-0 sm:right-0"
        } border transition duration-[1.5s]`}
        ref={ref_modal}
        style={{ transition: "1.5s ease" }}
      >
        {/* this is for the top relative box  */}
        <div className="w-full fixed top-0 left-0 h-[5.5vw] bg-[#1F1E1E]  sm:h-[22vw]  bg-opacity-[50%] flex justify-start items-center neuer px-[1.3vw] gap-[1vw]  sm:px-[2vw] border-b-[0.2vw] border-white border-opacity-[60%]">
          <div className="w-full flex gap-[1vw] h-full items-center sm:gap-[3vw]">
            <i
              className="bi bi-chevron-left cursor-pointer text-white text-[1.2vw] sm:text-[6vw]"
              onClick={() => {
                sethide(true);
                setTimeout(() => {
                  setshow_chat_modal(false);
                }, 1000);
              }}
            ></i>

            <div
              className=" h-[3.2vw] w-[3.2vw] sm:h-[10vw] sm:w-[10vw] rounded-[100%] avater_bg"
              style={{ backgroundImage: "url(/chats/station_forge.webp)" }}
            ></div>

            {/*the name of the moderator for now its  talk to support */}
            <div className="w-fit  flex-col flex gap-[0.5vw] sm:gap-[1.2vw] ">
              <p className="text-[1vw] text-white sm:text-[4vw] ">
                Talk to support
              </p>
              <p className="text-[0.8vw]  text-white  sm:text-[3vw] italic text-opacity-[50%]">
                24/7 Support line
              </p>
            </div>
          </div>

          {show_end_and_start_btn && (
            <button
              className="sm:w-[30vw] w-[10vw] h-[3vw] rounded-[1vw] hover:bg-opacity-[30%] bg-black text-white text-[1vw] sm:text-[3vw] sm:h-[10vw] sm:rounded-[3vw]  neuer   "
              style={{
                backgroundColor: chat_session_id.length ? "black" : "#CCFF00",
                color: chat_session_id.length ? "white" : "black",
              }}
              onClick={() => {
                if (!chat_session_id.length) {
                  create_new_session();
                  return;
                }
                setcreate_new_sess(false);

                updateChatSessionEndedStatus();
              }}
            >
              {chat_session_id.length ? "End session" : "Start chat"}
            </button>
          )}
        </div>

        {/* this is for the bottom input for sending messages relative box  */}
        <div className="w-full h-[5.5vw] sm:h-[20vw] sm:bg-opacity-[100%]  fixed bottom-0 neuer left-0 bg-[#1F1E1E] rounded-t-[1.7vw]  bg-opacity-[50%] flex justify-center items-center px-[1.3vw]  ">
          <form
            onSubmit={handlesubmit}
            className="h-[3.2vw] sm:h-[13vw]   w-full relative "
          >
            <input
              type="text"
              placeholder="Type text here"
              className="w-full h-full pl-[1vw] sm:pl-[3vw] sm:pr-[19vw] pr-[5vw] sm:rounded-[6vw] text-white text-opacity-[85%] text-[1vw] sm:text-[3.5vw] bg-[#2C2C2C] bg-opacity-[56%] outline-none border-[0.14vw]  border-opacity-[30%] focus:border-opacity-[70%] border-white transition duration-[0.6s] rounded-[2vw]"
              onChange={(e) => {
                setchat_text(e.target.value);
                setbtn_disabled(false);
              }}
              value={chat_text || ""}
            />

            <button
              type="submit"
              disabled={btn_disabled}
              className="absolute hover:bg-opacity-[80%] bg-[#CCFF00] px-[1vw] text-[0.9vw] py-[0.4vw] rounded-[2vw] right-[1vw] sm:text-[3.5vw] sm:px-[4vw] sm:py-[2vw] sm:rounded-[6vw] sm:right-[2vw] top-[50%] translate-y-[-50%]"
            >
              Send
            </button>
          </form>
        </div>
        {/* the date teh chat started  */}

        {/* this is for the chats */}
        <div
          className="w-full flex  overflow-y-scroll cover_scrollbar flex-col sm:px-[2vw] pb-[1vw] sm:pb-[18vw] sm:gap-[4vw] h-full gap-[0.6vw] "
          ref={scrollAreaRef}
        >
          <div className="w-full flex justify-center h-[2vw] sm:h-[9vw]  neuer">
            <p className="text-white text-[0.9vw] h-full px-[1vw] py-[0.4vw] border-white border-[0.1vw] flex items-center rounded-[2vw] border-opacity-[50%] sm:text-[4vw]  sm:px-[5vw] sm:rounded-[4vw] ">
              {time_date}
            </p>
          </div>
          {chat_data_arr.map((e: any, index: any) => {
            return (
              <div
                className={`w-full flex   ${
                  e.chatTextData.from != "user"
                    ? "justify-start"
                    : "justify-end"
                }  h-auto bg-white"`}
                key={index}
              >
                <div
                  className={`w-fit rounded-[1vw] text-[0.8vw] sm:text-[3vw] sm:max-w-[41vw] sm:py-[1.5vw] sm:px-[2vw] sm:rounded-[2.5vw] py-[0.7vw] px-[0.8vw]  max-w-[12vw] h-auto border-[0.1vw] ${
                    e.chatTextData.from != "user"
                      ? "border-white border-opacity-[50%] text-white"
                      : "border-[#CCFF00] bg-[#CCFF00] text-black "
                  }  h-[2vw]`}
                >
                  <p className={` `}>{e.chatTextData.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Chats_modal;
