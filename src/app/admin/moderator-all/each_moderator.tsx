"use client";

const Each_moderator = () => {
  return (
    <>
      <div className="w-full flex justify-between border2 sm:px-[3vw] sm:h-[25vw]  items-center  bg-[#0D0C0C] px-[1.2vw] h-[8vw] rounded-[1.5vw]">
        {/* the avatar , username , and chats moderated */}
        <div className="w-auto flex justify-start items-center gap-[1.2vw] h-[4.5vw]  ">
          <div
            className="w-[4.5vw] h-[4.5vw] sm:h-[12vw] sm:w-[12vw]  avater_bg rounded-[100%]"
            style={{ backgroundImage: `url(/light_cover.webp)` }}
          ></div>

          <div className="h-full flex flex-col justify-between ">
            <p className="text-[1.1vw]  text-white neuer sm:text-[3.7vw]">
              Goldie John
            </p>
            <p className="text-[0.9vw] text-opacity-[30%] text-white neuer sm:text-[3vw]">
              324 Chats moderated
            </p>
          </div>
        </div>

        <div className="h-[4.5vw] flex flex-col justify-between">
          <button className="bg-[#CCFF00] hover:bg-opacity-[50%] text-[1vw] rounded-[1vw] w-[8vw] h-[2.2vw]">
            View Chats
          </button>

          <button className="text-[0.9vw] hover:text-white transition duration-[0.6s]  text-[#3f4916] underline underline-offset-2 w-full text-start">
            Details
          </button>
        </div>
      </div>
    </>
  );
};

export default Each_moderator;
