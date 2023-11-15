"use client ";

import Image from "next/image";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";

const Similar_models = ({ similarArr, check_empty, check_network }: any) => {
  const items = ["", "", "", ""];
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();

  return (
    <>
      <h1 className="neuem  sm:text-[6vw] text-[2.5vw] px-[3vw] text-white text-opacity-[80%] sm:mb-0 mb-[1vw]">
        Similar Models
      </h1>
      <div
        className={`w-full  h-auto  cover_scrollbar overflow-x-scroll ${
          similarArr.length > 0 ? "sm:h-[90vw]" : "sm:h-[40vw]"
        }  flex flex-col gap-[2vw] sm:relative`}
      >
        {" "}
        {similarArr.length == 0 && check_network && (
          <div className="w-full sm:h-full  flex justify-center  items-center ">
            <p className="text-white neuer text-[1.3vw] text-opacity-[80%] sm:text-[3.5vw] ">
              No similar models found for this category.{" "}
            </p>
          </div>
        )}
        {similarArr.length == 0 && check_empty && (
          <div className="w-full sm:h-[10vw] flex justify-center  items-center ">
            <p className="text-white neuer text-[1.3vw] text-opacity-[80%] sm:text-[3.5vw] ">
              Something is wrong. Please refresh the page and try again.
            </p>
          </div>
        )}
        <div className="w-full sm:pr-[5vw] sm:w-auto h-auto sm:gap-[6vw]  sm:absolute sm:top-[3vw] sm:left-0 px-[3vw] py-[1vw]   items-center flex justify-start gap-[3vw]">
          {similarArr.map((e: any, index: any) => {
            return (
              <Link
                href={`/product-showcase?product_id=${e.id}&faction=${e.factions}`}
                key={index}
                className=" w-full cursor-pointer hover:scale-[1.04] transition duration-[0.6s] sm:w-[60vw] flex flex-col gap-[2vw] sm:gap-[4vw]"
                onClick={() => {
                  setpage_loader(true);
                  // route.push(``);
                }}
              >
                <div className="w-full h-[20vw] sm:h-[60vw] ">
                  <Image
                    unoptimized
                    width="0"
                    height="0"
                    src={e.cover_png}
                    alt="similar img"
                    className="h-full w-full"
                  />
                </div>

                <h1 className=" text-[1.5vw] capitalize sm:text-[4vw] text-white neuer ">
                  {e.title}
                </h1>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Similar_models;
