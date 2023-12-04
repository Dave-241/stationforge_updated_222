"use client";

import Image from "next/image";

const Each_chat = ({ data }: any) => {
  return (
    <>
      <div className="w-full cursor-pointer hover:bg-opacity-[40%] hover:border transition duration-[0.6s] flex justify-between sm:rounded-[4vw]  sm:px-[3vw] sm:h-[28vw]  items-center  bg-[#0D0C0C] px-[1.2vw] h-[6.5vw] rounded-[1.5vw]">
        {/* the avatar , username , and chats moderated */}
        <div className="w-auto flex justify-start items-center gap-[1.2vw] h-[4vw] sm:h-[12vw] sm:gap-[4vw]  ">
          <div
            className="w-[4vw] h-[4vw] overflow-hidden sm:h-[12vw] sm:w-[12vw]  avater_bg rounded-[100%]"
            style={{ backgroundImage: `url(/light_cover.webp)` }}
          >
            {/* <Image
              unoptimized
              width="0"
              height="0"
              src={data.moderator.avatar_url}
              alt={data.moderator.name}
              className="w-full h-full"
            /> */}
          </div>

          <div className="h-full flex flex-col justify-between ">
            <p className="text-[1vw]  text-white neuer sm:text-[3.7vw]">
              {/* {data.moderator.Username}
              {data.moderator.name && `(${data.moderator.name})`} */}
              this is name
            </p>
            <p className="text-[0.8vw] text-opacity-[30%] text-white neuer sm:text-[3vw]">
              Chats moderated
            </p>
          </div>
        </div>

        <div className="bg-[#CCFF00] flex justify-center items-center rounded-[100%] sm:h-[7vw] sm:w-[25vw] sm:text-[2.8vw] sm:rounded-[2vw] hover:bg-opacity-[50%] text-[0.8vw]  w-[2.8vw] h-[2.8vw]">
          2
        </div>
      </div>
    </>
  );
};

export default Each_chat;
