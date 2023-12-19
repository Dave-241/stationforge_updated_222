"use client";

import Link from "next/link";
import { useState } from "react";

const Search_Items = ({ show_search_items }: any) => {
  const [nav_array, setnav_array] = useState([
    {
      link: "/admin/dashboard",
      txt: "Dashboard",
    },
    {
      link: "/admin/postupload",
      txt: " add post",
    },
    {
      link: "/admin/digitalsales",
      txt: "Digital sales",
    },
    {
      link: "/admin/digitaluploads",
      txt: "Digital Uploads",
    },
    {
      link: "/admin/postinsight",
      txt: "Posts & Insights",
    },

    {
      link: "/admin/add-moderator",
      txt: "add moderator",
    },
    {
      link: "/admin/moderator-all",
      txt: "All Moderator Chats",
    },
    {
      link: "/admin/forge-upload",
      txt: "Add forge (upload)",
    },
    {
      link: "/admin/chats",
      txt: "current Chats sessions",
    },
  ]);
  return (
    <>
      <div className="w-[23vw] h-[15vw] overflow-hidden  rounded-[2vw]  absolute top-[4vw] right-0 z-[99999] ">
        <div className=" bg-[#E7E6E8] w-full h-full rounded-[2vw] flex flex-col overflow-y-scroll scroll-container scroll-container_search_items">
          {nav_array.map((e: any, index: any) => {
            return (
              <Link
                href={e.link}
                target="_blank"
                key={index}
                className="w-full border-b-black hover:bg-black hover:text-white border-[0.1vw] py-[1vw] text-center text-[1.3vw] neuer  capitalize "
              >
                {e.txt}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search_Items;
