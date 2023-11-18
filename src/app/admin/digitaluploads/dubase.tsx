import { useMemo, useRef, useState } from "react";
import BottomFilterSheet from "@/app/admin_general_component/mfa/bottom-sheet";
import Header from "@/app/admin_general_component/header";

import ForgeAllocations from "@/app/admin_general_component/mfa/forge_allocations";
import MfaTopnav from "@/app/admin_general_component/mfa/mfa-topnav";
import SideDatePicker from "@/app/admin_general_component/mfa/side-date-picker";
import ForgeInfoModal from "@/app/admin_general_component/modals/forge_info";
import ProfileDetailsModal from "@/app/admin_general_component/modals/profile_details_modal";
import AllForgesDownloadedModal from "@/app/admin_general_component/modals/all_forges_downloaded_modal";
import RenewedSubscriptionsModal from "@/app/admin_general_component/modals/renewed_subscription";
import ForgesWishList from "@/app/admin_general_component/modals/forges_wishlist";
import LastDownloadModal from "@/app/admin_general_component/modals/last_download_modal";
import { MonthlyForgeAllocationsTypes } from "@/app/types/monthlyforgeallocation";

const DigitalUploadsBase = ({
  handleModalPopUp,
}: MonthlyForgeAllocationsTypes) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  const [selectedMonth, setSelectedMonth] = useState("");

  const allMonths = [
    "Jamuary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const allYears = useMemo(() => {
    let currentYear = new Date().getFullYear();

    let arr = [];
    for (let i = 2018; i <= currentYear; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  return (
    <div className="min-h-screen px-[25px] lg:px-[70px] flex flex-row gap-48 py-20 pt-18 dsm:pt-28 lg:pt-40">
      <div className="w-full">
        <MfaTopnav setOpen={setOpen} />
        <div className="w-full flex flex-row justify-start">
          <SideDatePicker
            allYears={allYears}
            allMonths={allMonths}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <ForgeAllocations handleModalPopUp={handleModalPopUp} />
        </div>
      </div>
      <BottomFilterSheet
        sheetRef={ref}
        setOpen={setOpen}
        isOpen={isOpen}
        allYears={allYears}
        allMonths={allMonths}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <ForgeInfoModal name={"francis"} handleModalPopUp={handleModalPopUp} />
      <ProfileDetailsModal
        name={"francis"}
        handleModalPopUp={handleModalPopUp}
      />
      <AllForgesDownloadedModal
        name={"franis"}
        handleModalPopUp={handleModalPopUp}
      />
      <ForgesWishList name={"franis"} handleModalPopUp={handleModalPopUp} />
      <RenewedSubscriptionsModal
        name={"franis"}
        handleModalPopUp={handleModalPopUp}
      />
      <LastDownloadModal name={"francis"} handleModalPopUp={handleModalPopUp} />
    </div>
  );
};

export default DigitalUploadsBase;
