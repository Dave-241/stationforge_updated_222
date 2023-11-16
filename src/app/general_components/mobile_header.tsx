"use client ";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";

const Mobile_header = ({
  setmobile_bg_changer,
  links,
  comedown,
  setcomedown,
  loggedin,
}: any) => {
  const pathname = usePathname();
  const route = useRouter();

  //   profile context
  const {
    toggleDropdown,
    downloadProgress,
    setpage_loader,
    setforge_loader,
    hide_download,
    setshow_setting_modal,
  }: any = useProfile_Context();

  const [profile_comeup, setprofile_comeup] = useState(false);
  const hide_mob_header = () => {
    setprofile_comeup(false);
    if (profile_comeup) {
      setcomedown(false);
      setTimeout(() => {
        setmobile_bg_changer(false);
      }, 900);
    } else if (!profile_comeup) {
      setcomedown(false);
      setTimeout(() => {
        setmobile_bg_changer(false);
      }, 800);
    }
  };

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  //    useEffect(() => {
  //      // Trigger the slide-up effect after the component is mounted
  //      const timer = setTimeout(() => {
  //        setgo_right(true);
  //      }, 500); // Start the animation shortly after the component mounts

  //      // Optional: Clean up the timeout if the component unmounts before the animation starts
  //      return () => clearTimeout(timer);
  //      // eslint-disable-next-line react-hooks/exhaustive-deps
  //    }, []);

  useEffect(() => {
    setcomedown(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className="w-[100vw] h-[100vh] hidden fixed top-0 left-0 sm:flex justify-center items-start  bg-black bg-opacity-[70%]"
        onClick={hide_mob_header}
      >
        <div
          className={`w-full ${
            !profile_comeup ? " h-[100vw]" : "h-[155vw] "
          }   bg-[#181818] rounded-[6vw]  ${
            comedown
              ? "translate-y-[0vw]"
              : profile_comeup
              ? "translate-y-[-180vw]"
              : "translate-y-[-100vw]"
          } flex flex-col justify-start pt-[30vw] pb-[10vw] gap-[6vw]`}
          style={{ transition: "1.5s ease" }}
          onClick={modalClick}
        >
          {/* for the links at the top */}
          <div className="w-full pt-[2vw] flex px-[3vw] flex-wrap justify-center gap-[2vw] ">
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
                    className={` border-[0.3vw] flex justify-center items-center text-[3.1vw] h-[10vw] capitalize rounded-[4vw] border-white border-opacity-[40%] text-opacity-[70%] transition duration-[0.3s] hover:text-opacity-[100%] w-[28vw] mb-[3vw] ${
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
          <div className="w-full h-[0.1vw] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[90vw] sm:mx-auto bg-[#D9D9D9] "></div>{" "}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          <div className="w-full flex justify-center pt-[3vw] px-[3vw] gap-[3vw] items-center ">
            {!loggedin ? (
              <>
                <Link
                  href={"/login"}
                  onClick={() => {
                    if (pathname == "/login") {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  className="w-full neuer flex justify-center items-center text-[4vw] bg-white rounded-[3vw] h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
                >
                  Log in
                </Link>
                <Link
                  href={"/signin"}
                  onClick={() => {
                    if (pathname == "/signin") {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  className="w-full neuer flex justify-center items-center text-[4vw] bg-white rounded-[3vw] h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {/* <button
                  onClick={() => {
                    setshow_setting_modal(true);
                  }}
                  className="w-full neuer flex justify-center items-center text-[4vw] bg-white rounded-[3vw] h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
                >
                  Profile
                </button> */}

                <div
                  className={`bg-white w-full ${
                    !profile_comeup ? "h-[14vw]" : "h-[65vw] "
                  } rounded-[2vw]`}
                  style={{ transition: "1.5s ease" }}
                  onClick={() => {
                    setprofile_comeup(!profile_comeup);
                  }}
                >
                  {/* this is the option that sticks  */}
                  <div className="w-full h-[14vw] neuer text-[4vw] gap-[3vw] flex justify-center items-center">
                    Profile{" "}
                    <i
                      className={`bi ${
                        !profile_comeup ? "bi-chevron-down " : "bi-chevron-up"
                      }  `}
                    ></i>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobile_header;
