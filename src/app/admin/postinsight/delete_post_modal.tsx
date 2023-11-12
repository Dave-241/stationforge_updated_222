"use client";

const DeletPost_modal = (props: any) => {
  const { setshowdeletemodal, delete_info, deletepost } = props;
  return (
    <>
      <div className="w-full z-[99999] bg-[black] bg-opacity-[60%] flex justify-center items-center  h-full fixed top-0 left-0">
        <div className="bg-white w-[30vw] h-[17vw] rounded-[1.2vw] gap-[3vw] px-[2.3vw] flex flex-col justify-center items-center">
          <h1 className="neuer text-[1.2vw] text-center ">
            Are you sure you want <br /> to delete this post
          </h1>

          <div className="w-full h-auto flex justify-center gap-[2vw] items-center">
            <button
              className="neuer border-[#FF0000] text-[1.3vw] transition duration-[0.6s] border-[0.1vw] hover:border-black hover:bg-transparent hover:text-black w-full h-[3.4vw] flex justify-center items-center text-white rounded-[1.2vw] bg-[#FF0000]"
              onClick={() => {
                deletepost();
              }}
            >
              {delete_info}
            </button>
            <button
              className="neuer border-[black] text-[1.3vw] transition duration-[0.6s] border-[0.1vw]  hover:bg-[black] hover:text-white w-full h-[3.4vw] flex justify-center items-center  rounded-[1.2vw] bg-transparent text-black"
              onClick={() => {
                setshowdeletemodal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletPost_modal;
