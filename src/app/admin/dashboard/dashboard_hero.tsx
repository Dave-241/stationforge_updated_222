"use client ";

import { useProfile_Context } from "@/app/utils/profile_context";
import Link from "next/link";
import post_icon from "../../../../public/admin_section/dashboard/post_icon.webp";
import sub_icon from "../../../../public/admin_section/dashboard/sub_icon.webp";
import up from "../../../../public/admin_section/dashboard/up.png";
import down from "../../../../public/admin_section/dashboard/down.png";
import digital_icon from "../../../../public/admin_section/dashboard/digital_sales.webp";
import Image from "next/image";

const Dashboard_hero_section = () => {
  const { setpage_loader }: any = useProfile_Context();

  return (
    <>
      <div className="w-full  px-[2vw] sm:px-0 flex mt-[8vw] sm:mt-[26vw] flex-col sm:gap-[10vw] gap-[2vw]">
        {/* the first row is for the path and the ctn  */}
        <div className="w-full sm:hidden h-auto flex justify-between sm:justify-center items-center  neuer text-[1vw] ">
          <p className="text-opacity-[30%] text-white sm:hidden">
            Home /{" "}
            <span className="text-white text-opacity-[100%]">Dashboard</span>
          </p>
          <Link
            href={"/admin/postupload"}
            onClick={() => {
              setpage_loader(true);
            }}
            className="bg-[#CCFF00]  cursor-pointer hover:bg-opacity-[40%] neuer flex justify-center items-center text-[1vw] rounded-[1vw] h-[3.5vw] w-[12vw]"
          >
            Add new post
          </Link>{" "}
        </div>

        {/* the second div carries the stats on here */}
        {/* these designs are hidden for mobile screens . mobile screen design below  */}
        <div className="w-full h-auto flex sm:hidden justify-between items-end  ">
          {/* this is for the first column */}
          <div className="w-[34%] h-auto    flex flex-col   gap-[4vw] ">
            {/* the header of the first section on this row  */}
            <div className="w-full flex flex-col gap-[0.2vw]">
              <h1 className="neuem  text-[2.3vw] text-white ">
                Good Morning, Max
              </h1>
              <p className="neuer text-[1.2vw] text-white text-opacity-[40%] ">
                Track and manage all forge digital and physical sales
              </p>
            </div>

            {/* this is the colored section on this row  */}

            <div className="w-full h-[13vw] bg-[#CCFF00] items-center px-[1.5vw] flex gap-[2vw] justify-between rounded-[2vw]">
              <div className="flex flex-col w-auto gap-[2.5vw] ">
                <p className="text-[2vw] neuem">
                  234 <span className="text-[1vw] neuer">New Subscribers</span>
                </p>

                <p className="text-[1vw] neuem">
                  See all new subscribed members
                </p>
              </div>
              <button
                onClick={() => {
                  //   setpage_loader(true);
                }}
                className="bg-[black] cursor-pointer hover:bg-opacity-[40%] neuer text-white flex justify-center items-center text-[1vw] rounded-[1vw] h-[3.5vw] w-[12vw]"
              >
                See new members
              </button>{" "}
            </div>
          </div>

          {/* this is for the second columen */}
          <div className="w-[20%] h-[21vw]  justify-center  flex-col flex bg-[#151515] rounded-[2vw] px-[2vw]   gap-[1.3vw] ">
            <Image src={post_icon} alt="post_img" className="w-[5vw] h-fit" />
            <p className="text-white text-opacity-[40%] neuer text-[1.4vw] ">
              Total posts
            </p>

            <p className="text-white neuem text-[2vw] ">6567</p>
            <div className="w-full flex justify-start items-center gap-[0.3vw] ">
              <Image src={up} alt="up arrow " className="w-[1vw] h-fit" />
              <p className="text-[#77DC5E] text-[1vw] neuer">10.4%</p>
            </div>
            <p className="text-white text-opacity-[40%] neuer text-[1vw] ">
              Increased vs last month{" "}
            </p>
          </div>

          {/* this is for the third columen */}
          <div className="w-[20%] h-[21vw]  justify-center  flex-col flex bg-[#151515] rounded-[2vw] px-[2vw]   gap-[1.3vw] ">
            <Image src={sub_icon} alt="post_img" className="w-[5vw] h-fit" />
            <p className="text-white text-opacity-[40%] neuer text-[1.4vw] ">
              All Subscribers
            </p>

            <p className="text-white neuem text-[2vw] ">2537</p>

            <div className="w-full flex justify-start items-center gap-[0.3vw] ">
              <Image src={down} alt="up arrow " className="w-[1vw] h-fit" />
              <p className="text-[#DC5E5E] text-[1vw] neuer">12.4%</p>
            </div>

            <p className="text-white text-opacity-[40%] neuer text-[1vw] ">
              Decrease vs last month
            </p>
          </div>

          {/* this is for the fourth columen */}
          <div className="w-[20%] h-[21vw]  justify-center  flex-col flex bg-[#151515] rounded-[2vw] px-[2vw]   gap-[1.3vw] ">
            <Image
              src={digital_icon}
              alt="post_img"
              className="w-[5vw] h-fit"
            />
            <p className="text-white text-opacity-[40%] neuer text-[1.4vw] ">
              Digital sales
            </p>

            <p className="text-white neuem text-[2vw] ">2537</p>

            <div className="w-full flex justify-start items-center gap-[0.3vw] ">
              <Image src={up} alt="up arrow " className="w-[1vw] h-fit" />
              <p className="text-[#77DC5E] text-[1vw] neuer">32.4%</p>
            </div>

            <p className="text-white text-opacity-[40%] neuer text-[1vw] ">
              Increased vs last month
            </p>
          </div>
        </div>

        {/* this is for tthe mobile screen */}
        {/* mobile design begins */}
        <div className="w-full hidden sm:flex  flex-col gap-[3vw]">
          <div className="w-full flex flex-col gap-[4vw] px-[3vw]">
            <div className="w-full flex justify-between items-start  ">
              <h1 className="neuem  text-[7vw] text-white ">
                Good <br /> Morning, Max
              </h1>
              <Link
                href={"/admin/postupload"}
                onClick={() => {
                  setpage_loader(true);
                }}
                className="bg-[#151515] text-white text-opacity-[60%] sm:w-[30vw] sm:h-[11vw] sm:text-[3vw] sm:rounded-[2vw] cursor-pointer hover:bg-opacity-[40%] neuer flex justify-center items-center "
              >
                Add new post
              </Link>{" "}
            </div>

            <p className="neuer text-[3.5vw] text-white text-opacity-[40%] ">
              Track and manage all forge digital and <br /> physical sales
            </p>
          </div>

          <div className="w-full overflow-x-scroll  cover_scrollbar  flex h-auto  py-[3vw] ">
            <div className="w-[200vw] pl-[3vw] pr-[4vw] justify-start gap-[4vw] flex ">
              {/* this is for the second columen */}
              <div className="w-[60vw] h-[70vw]  justify-center  flex-col flex bg-[#151515] rounded-[5vw] px-[4vw]   gap-[5vw] ">
                <Image
                  src={post_icon}
                  alt="post_img"
                  className="w-[15vw] h-fit"
                />
                <p className="text-white  text-opacity-[40%] neuer text-[4vw] ">
                  Total posts
                </p>

                <p className="text-white neuem text-[6vw] ">6567</p>
                <div className="w-full flex justify-start items-center gap-[2vw] ">
                  <Image src={up} alt="up arrow " className="w-[4vw] h-fit" />
                  <p className="text-[#77DC5E] text-[3.5vw] neuer">10.4%</p>
                </div>
                <p className="text-white text-opacity-[40%] neuer text-[3.5vw] ">
                  Increased vs last month{" "}
                </p>
              </div>

              {/* this is for the third columen */}
              <div className="w-[60vw] h-[70vw]  justify-center  flex-col flex bg-[#151515] rounded-[5vw] px-[4vw]   gap-[5vw] ">
                <Image
                  src={sub_icon}
                  alt="post_img"
                  className="w-[15vw] h-fit"
                />
                <p className="text-white text-opacity-[40%] neuer text-[4vw] ">
                  All Subscribers
                </p>

                <p className="text-white neuem text-[6vw] ">2537</p>

                <div className="w-full flex justify-start items-center gap-[2vw] ">
                  <Image src={down} alt="up arrow " className="w-[4vw] h-fit" />
                  <p className="text-[#DC5E5E] text-[3.5vw] neuer">12.4%</p>
                </div>

                <p className="text-white text-opacity-[40%] neuer text-[3.5vw] ">
                  Decrease vs last month
                </p>
              </div>

              {/* this is for the fourth columen */}
              <div className="w-[60vw] h-[70vw]  justify-center  flex-col flex bg-[#151515] rounded-[5vw] px-[4vw]   gap-[5vw] ">
                <Image
                  src={digital_icon}
                  alt="post_img"
                  className="w-[15vw] h-fit"
                />
                <p className="text-white text-opacity-[40%] neuer text-[4vw] ">
                  Digital sales
                </p>

                <p className="text-white neuem text-[6vw] ">2537</p>

                <div className="w-full flex justify-start items-center gap-[2vw] ">
                  <Image src={up} alt="up arrow " className="w-[4vw] h-fit" />
                  <p className="text-[#77DC5E] text-[3.5vw] neuer">32.4%</p>
                </div>

                <p className="text-white text-opacity-[40%] neuer text-[3.5vw] ">
                  Increased vs last month
                </p>
              </div>
            </div>
          </div>

          {/* this is for the coloure mobile section  */}
          <div className="w-full h-auto px-[3vw]">
            <div className="w-full h-[30vw] bg-[#CCFF00] items-center px-[2vw] flex gap-[2vw] justify-between rounded-[4vw]">
              <div className="flex flex-col w-auto gap-[5vw] ">
                <p className="text-[5vw] neuem">
                  234{" "}
                  <span className="text-[3.3vw] neuer">New Subscribers</span>
                </p>

                <p className="text-[3vw] neuem">
                  See all new subscribed members
                </p>
              </div>
              <button
                onClick={() => {
                  //   setpage_loader(true);
                }}
                className="bg-[black] cursor-pointer hover:bg-opacity-[40%] neuer text-white flex justify-center items-center text-[2.5vw] rounded-[3vw] h-[12vw] w-[35vw]"
              >
                See new members
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_hero_section;
