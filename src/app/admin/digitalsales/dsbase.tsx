import React, { useState } from "react";
import SubscriptionFilters from "@/app/admin_general_component/digital-sales/subscription_filters";
import Tiers from "@/app/admin_general_component/digital-sales/tiers";
import AllSubscribers from "@/app/admin_general_component/digital-sales/all_subscribers";
import ForgeInfoModal from "@/app/admin_general_component/modals/forge_info";
import ProfileDetailsModal from "@/app/admin_general_component/modals/profile_details_modal";
import AllForgesDownloadedModal from "@/app/admin_general_component/modals/all_forges_downloaded_modal";
import RenewedSubscriptionsModal from "@/app/admin_general_component/modals/renewed_subscription";
import ForgesWishList from "@/app/admin_general_component/modals/forges_wishlist";
import LastDownloadModal from "@/app/admin_general_component/modals/last_download_modal";
import { MonthlyForgeAllocationsTypes } from "@/app/types/monthlyforgeallocation";


const DigitalSalesBase = ({ handleModalPopUp }: MonthlyForgeAllocationsTypes) => {
  return (
    // px-20
    <div className="flex flex-col items-center gap-[10px] dsm:gap-[40px] min-h-screen py-20 pt-18 dsm:pt-28 lg:pt-40 w-full h-auto">
      <SubscriptionFilters />
      <Tiers />
      <AllSubscribers handleModalPopUp={handleModalPopUp} />
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
      <ForgeInfoModal name={"francis"} handleModalPopUp={handleModalPopUp} />
    </div>
  );
}

export default DigitalSalesBase;