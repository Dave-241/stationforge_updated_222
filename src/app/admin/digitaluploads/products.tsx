"use client ";

const Product = ({
  data,
  sethideforge_info,
  setinfo_title,
  setproduct_id,
  setinfo_download,
  setinfo_avater,
}: any) => {
  return (
    <>
      <div className="lg:w-[31.7%] md:w-[47%] sm:rounded-[4vw] sm:w-[48%]  md:rounded-[1rem] overflow-hidden auto border-black border-opacity-[17%] border-[0.1rem] sm:border-[0.35vw]  flex flex-col gap-[1rem] mb-[2.3vw] sm:mb-[4vw] sm:gap-[2.5vw]">
        <div
          className="w-full  sm:h-[46vw] overflow-hidden avater_bg "
          style={{ backgroundImage: `url(/cover.webp)` }}
        >
          <img
            src={data.cover_png}
            alt="model img"
            className="w-full h-full object-cover "
          />
        </div>
        <p className="text-sm neuem capitalize lg:px-[1rem] px-[3%] sm:text-[3vw]">
          {" "}
          {data.title}
        </p>{" "}
        <div className="w-full mb-[1.2rem] sm:mb-[3vw] flex justify-between items-center lg:px-[1rem] px-[3%] ">
          <button
            style={{ whiteSpace: "nowrap" }}
            className="bg-[#CCFF00] sm:text-[2.7vw] sm:h-[6vw] sm:w-[25vw] sm:rounded-[1.6vw] sm:py-0 hover:bg-opacity-[40%] px-[1.2rem] py-[0.6rem]  md:text-xs rounded-[1rem]"
            onClick={() => {
              setproduct_id(data.productId);
              setinfo_download(data.downloadedItemCount);
              setinfo_title(data.title);
              sethideforge_info(false);
              setinfo_avater(data.cover_png);
            }}
          >
            More details
          </button>
          <p className="text-black text-opacity-[40%] sm:text-[2.3vw] sm:text-center  md:text-xs neuer w-fit">
            Downloaded {data.downloadedItemCount} Times
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
