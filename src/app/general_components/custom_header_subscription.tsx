"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useProfile_Context } from "../utils/profile_context";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import logo from "../../../public/logo.webp";
import mob_ham from "../../../public/mob_ham.png";
import mob_cart from "../../../public/mob_cart.png";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

initializeApp(firebaseConfig);

// init authentication
const auth = getAuth();

const Custom_subscription_Header = () => {
  const [loggedin, setloggedin] = useState(false);
  const [admin_loggedin, setadmin_loggedin] = useState(false);
  const [track_hide_download, settrack_hide_download] = useState(true);
  const [track_progress, settrack_progress] = useState<any>("0");
  const {
    toggleDropdown,
    downloadProgress,
    setpage_loader,
    setforge_loader,
    hide_download,
  }: any = useProfile_Context();
  const pathname = usePathname();
  const route = useRouter();
  const [links, setlinks] = useState([
    {
      txt: "Physical store",
      link: "/null",
    },
    {
      txt: " Digital store",
      link: "/",
    },
    {
      txt: "  Subscriptions",
      link: "/subscriptions",
    },
    {
      txt: "    Community",
      link: "/null333",
    },
    {
      txt: "    Support",
      link: "/support",
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        setloggedin(true);
        user.getIdTokenResult().then((idTokenResult) => {
          const isAdmin = idTokenResult.claims.admin === true;
          if (isAdmin) {
            setadmin_loggedin(true);
          } else {
            setadmin_loggedin(false);
          }
        });
      } else {
        setadmin_loggedin(false);
        setloggedin(false);
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("downloadProgress", "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const storedDownloadProgress = localStorage.getItem("downloadProgress");
      if (storedDownloadProgress == null) {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
      } else if (storedDownloadProgress == "0") {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
        return;
      } else {
        settrack_hide_download(false);
        settrack_progress(storedDownloadProgress);
      }
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="w-full h-[4.7vw] sm:h-[20vw]  bg-transparent absolute z-[99] top-[2.5vw] sm:top-0 flex justify-center left-0 px-[2vw] backdrop-blur-[3px]  ">
      <nav className="w-full px-[1vw]  h-full  bg-transparent  rounded-[1.06vw] flex justify-between  items-center ">
        {/* mobile design */}
        {/* mobile design */}
        {/* mobile design */}
        {/* mobile design */}
        {/* mobile design */}
        <div className="sm:block sm:w-fit  hidden">
          <button
            className="= w-[10vw] h-auto flex"
            // onClick={() => {
            //   if (pathname == "/") {
            //     setpage_loader(false);
            //   } else {
            //     setpage_loader(true);
            //   }
            // }}
          >
            <Image
              src={mob_ham}
              alt="StationForge Logo"
              className="w-full h-fit"
            />
          </button>
        </div>

        <div className="sm:block sm:w-fit  hidden">
          <Link
            href="/"
            aria-label="StationForge Home"
            className="= w-[30vw] h-auto flex"
            onClick={() => {
              if (pathname == "/") {
                setpage_loader(false);
              } else {
                setpage_loader(true);
              }
            }}
          >
            <Image
              src={logo}
              alt="StationForge Logo"
              className="w-full h-fit"
            />
          </Link>
        </div>

        <div className="sm:block sm:w-fit  hidden">
          <button
            className="= w-[10vw] h-auto flex"
            // onClick={() => {
            //   if (pathname == "/") {
            //     setpage_loader(false);
            //   } else {
            //     setpage_loader(true);
            //   }
            // }}
          >
            <Image
              src={mob_cart}
              alt="StationForge Logo"
              className="w-full h-fit"
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Custom_subscription_Header;
