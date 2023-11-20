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
      <div className="w-[31.7%] rounded-[2vw] overflow-hidden auto border-black border-opacity-[17%] border-[0.1vw]  flex flex-col gap-[1vw] mb-[2.3vw]">
        <div
          className="w-full h-[20vw]  avater_bg "
          style={{ backgroundImage: `url(/cover.webp)` }}
        >
          <img src={data.cover_png} alt="model img" className="w-full h-fit " />
        </div>
        <p className="text-[0.9vw] neuem px-[1vw]"> {data.title}</p>{" "}
        <div className="w-full mb-[1.2vw] flex justify-between items-center px-[1vw] ">
          <button
            className="bg-[#CCFF00] hover:bg-opacity-[40%] h-[3vw] w-[8vw] text-[0.8vw] rounded-[1vw]"
            onClick={() => {
              setproduct_id(data.productId);
              setinfo_download(data.downloadedItemCount);
              setinfo_title(data.title);
              sethideforge_info(false);
              setinfo_avater(data.cover_png);
            }}
          >
            View more details
          </button>
          <p className="text-black text-opacity-[40%] text-[0.8vw] neuer w-fit">
            Downloaded {data.downloadedItemCount} Times
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
