"use client";

import Image from "next/image";

const Each_chat = ({ data }: any) => {
  return (
    <>
      <div className="w-full cursor-pointer hover:bg-opacity-[40%] hover:border transition duration-[0.6s] flex justify-between sm:rounded-[4vw]  sm:px-[3vw] sm:h-[23vw]  items-center  bg-[#0D0C0C] px-[1.2vw] h-[6.5vw] rounded-[1.5vw]">
        {/* the avatar , username , and chats moderated */}
        <div className="w-auto flex justify-start items-center gap-[1.2vw] h-[4vw] sm:h-[12vw] sm:gap-[4vw]  ">
          <div
            className="w-[4vw] h-[4vw] overflow-hidden sm:h-[12vw] sm:w-[12vw]  avater_bg rounded-[100%]"
            style={{ backgroundImage: `url(/light_cover.webp)` }}
          >
            <Image
              unoptimized
              width="0"
              height="0"
              src={data.userData[0].avatar_url}
              alt={data.userData[0].name}
              className="w-full h-full"
            />
          </div>

          <div className="h-full flex flex-col justify-between ">
            <p className="text-[1.2vw]  text-white neuer sm:text-[3.7vw]">
              {data.userData[0].Username}{" "}
              {data.userData[0].name && `(${data.userData[0].name})`}
            </p>
            <p className="text-[0.9vw] text-opacity-[30%] text-white neuer sm:text-[3vw]">
              {data.chatTextData[0]?.message}{" "}
              {!data.chatTextData[0]?.message && "No messages yet"}
            </p>
          </div>
        </div>

        <div className="bg-[#CCFF00] flex justify-center items-center rounded-[100%]  sm:w-[10vw] sm:h-[10vw] sm:text-[3vw] hover:bg-opacity-[50%] text-[0.8vw]  w-[2.8vw] h-[2.8vw]">
          {data.userData.length}
        </div>
      </div>
    </>
  );
};

export default Each_chat;
