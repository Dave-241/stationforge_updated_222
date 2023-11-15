"use client ";

import { useState, useEffect } from "react";

const Mob_download_track = ({
  settrack_hide_download,
  track_hide_download,
}: any) => {
  const [track_progress, settrack_progress] = useState<any>("0");
  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const storedDownloadProgress = localStorage.getItem("downloadProgress");
      if (storedDownloadProgress == null) {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
      } else if (storedDownloadProgress == "0") {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
        return;
      } else {
        settrack_hide_download(false);
        settrack_progress(storedDownloadProgress);
      }
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-full  sm:flex hidden sm:py-[2vw] sm:gap-[4vw] sm:flex-col">
        {/* first section of the download */}
        <div className="w-full flex justify-between items-center ">
          <p className="neuer text-[4vw] text-white "> Downloading Png</p>
          <p className="neuer text-[4vw] text-white "> 35%</p>
        </div>

        <div className="w-full h-[2.5vw] overflow-hidden bg-[#2A2A2A] rounded-[2vw] ">
          <div
            className="h-full  bg-[#CCFF00] rounded-[2vw]"
            style={{ transition: "1s ease", width: "30%" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Mob_download_track;
