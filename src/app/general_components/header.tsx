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

const Header = () => {
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
    <header className="w-full h-[4.7vw] sm:h-[20vw]  bg-transparent absolute z-[99] top-[2.5vw] sm:top-0 flex justify-center ">
      <nav className="w-[90%] sm:w-[100%] sm:px-[5%] h-full pr-[1.3vw] bg-[#0A0B0B] sm:bg-[black] border-[#CCFF00] sm:bg-opacity-[50%] border-opacity-[5%] sm:border-none border rounded-[1.06vw] flex justify-between  items-center backdrop-blur-[14px]  bg-opacity-[30%]">
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

        {/* destop designs */}
        {/* destop designs */}
        {/* destop designs */}
        {/* destop designs */}
        {/* destop designs */}
        {/* destop designs */}
        {/* destop designs */}
        {/* destop designs */}
        {/* logo image */}
        <div className="sm:hidden">
          <Link
            href="/"
            aria-label="StationForge Home"
            className="= w-[10vw] h-auto flex"
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
        {/* nav array list  */}
        <div className="neuer sm:hidden  flex items-center gap-[1.8vw] capitalize text-[1vw]">
          {links.map((e: any, index: any) => {
            return (
              <>
                <Link
                  onClick={() => {
                    if (pathname == e.link) {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  href={e.link}
                  key={index}
                  className={`  text-opacity-[70%] transition duration-[0.3s] hover:text-opacity-[100%] h-full ${
                    pathname == e.link
                      ? "text-black bg-white py-[0.5vw] px-[1vw] rounded-[1.2vw] text-opacity-[100%]"
                      : "text-white"
                  } `}
                  style={{ transition: "1s ease" }}
                >
                  {e.txt}
                </Link>
              </>
            );
          })}
        </div>
        <div className="text-white sm:hidden  flex gap-[0.9vw] text-[1vw] items-center justify-center">
          {/* now this is for the download */}
          {!track_hide_download && (
            <div
              className="w-[3vw] h-[3vw] relative bg-[#151414] cursor-pointer rounded-[100%]"
              onClick={() => {
                route.push("/libary");
                if (pathname == "/libary") {
                  setpage_loader(false);
                } else {
                  setpage_loader(true);
                }
              }}
            >
              {downloadProgress != "100" && (
                <i className="bi bi-arrow-down absolute  top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-white text-[1.2vw] text-opacity-[90%]"></i>
              )}

              {downloadProgress >= "99" && (
                <i className="bi bi-check2 absolute  top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-white text-[1.4vw] text-opacity-[90%]"></i>
              )}
              <CircularProgressbar
                value={track_progress}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0.25,

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "butt",

                  // Text size
                  // textSize: "16px",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors
                  pathColor: `#CCFF00`,
                  // textColor: "#f88",
                  trailColor: "#151414",
                  backgroundColor: "",
                })}
              />
            </div>
          )}
          {/*  */}
          {admin_loggedin && (
            <Link
              href={"/admin/dashboard"}
              className=" py-[0.7vw] text-[1.2vw] border-white text-white border neuem px-[0.9vw] rounded-[0.8vw]  hover:bg-[#CCFF00] hover:bg-opacity-[30%] transition duration-[0.3s] "
            >
              {" "}
              Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              setforge_loader(true);
            }}
            className=" py-[0.7vw] border-white border neuem px-[0.9vw] rounded-[0.8vw]  hover:bg-[#CCFF00] hover:bg-opacity-[30%] transition duration-[0.3s] "
          >
            {" "}
            <i className="bi bi-bag-fill"></i> Forge
          </button>{" "}
          {!loggedin ? (
            <Link
              href={"/login"}
              className=" py-[0.7vw]  px-[0.9vw]  border-transparent border rounded-[0.8vw] text-black bg-white hover:bg-[#CCFF00] hover:text-white hover:bg-opacity-[30%] transition duration-[0.3s] font-[600]"
              onClick={() => {
                if (pathname == "/login") {
                  setpage_loader(false);
                } else {
                  setpage_loader(true);
                }
              }}
            >
              Log In
            </Link>
          ) : (
            <button
              className=" py-[0.7vw]  px-[0.9vw]  border-transparent border rounded-[0.8vw] text-black bg-white hover:bg-[#CCFF00] hover:text-white hover:bg-opacity-[30%] transition duration-[0.3s] profile_btn font-[600]"
              onClick={toggleDropdown}
            >
              Profile
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;