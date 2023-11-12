"use client";

import Link from "next/link";

const StartUpload = ({
  setisLoadingUploadModal,
  handleCancel,
  uploading_text,
  uploadProgress,
  doneUploading,
  finalLink,
}: any) => {
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0  bg-[black] z-[999] bg-opacity-[60%] flex justify-center items-center">
        <div className="w-[30vw] h-[18vw] relative flex-col bg-white rounded-[2vw] flex justify-center items-center gap-[1.5vw] px-[2vw]">
          {doneUploading && (
            <i
              className="text-[1.6vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] absolute capitalize top-[0.7vw] right-[1.5vw] text-[#FF0000] bi bi-x-circle"
              onClick={() => {
                setisLoadingUploadModal(false);
              }}
            ></i>
          )}
          <p className="text-center text-[1.2vw] neuer">{uploading_text}</p>

          {/* the progress  */}
          <div className="w-full h-[1.4vw] overflow-hidden rounded-[1vw] bg-[#D9D9D9] ">
            <div
              className="h-full bg-[#CCFF00]"
              style={{ width: `${uploadProgress}%`, transition: "2s ease" }}
            ></div>
          </div>
          {doneUploading ? (
            <>
              <Link
                href={finalLink}
                target="_blank"
                className=" py-[1vw] px-[3.2vw] text-[1vw] bg-[#CCFF00]  transition duration-[0.6s] hover:bg-transparent hover:border-black hover:border-[0.1vw] border-[#CCFF00] border-[0.1vw] rounded-[1.2vw] "
                id="cancelUploadButton"
                // onClick={() => {
                //   handleCancelUpload();
                // }}
              >
                View
              </Link>
            </>
          ) : (
            <button
              className=" py-[1vw] px-[2.2vw] text-[1vw] hover:bg-[#CCFF00]  transition duration-[0.6s] border-black border-[0.1vw] rounded-[1.2vw] "
              id="cancelUploadButton"
              onClick={() => {
                //   setuploading_text("Beginning Cancel ...");
                handleCancel();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default StartUpload;
