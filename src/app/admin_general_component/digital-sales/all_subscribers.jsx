import SubscriberTypeTggle from "./subscriber-type-toggle";
import Image from "next/image";

const AllSubscribers = ({ handleModalPopUp }) => {
  return (
    <div className="flex flex-col items-start w-[95%] lg:w-[90%] ml-auto lg:ml-0 h-auto bg-[#FFF] rounded-br-none rounded-tr-none rounded-tl-[30px] rounded-bl-[30px]  lg:rounded-[30px] p-[20px] flex-wrap">
      <SubscriberTypeTggle />
      <div className="overflow-x-auto w-full max-w-[100rem] lg:max-w-none  lg:w-full mt-[15px] lg:mt-[30px]">
        <table className="table table-xs table-pin-rows">
          <thead>
            <tr className="bg-transparent border-none">
              <td className="text-[#000] font-bold text-[12px] lg:text-[16px] leading-[129%] py-6">
                Name
              </td>
              <td className="text-[#000] font-bold text-[12px] lg:text-[16px] leading-[129%] py-6">
                Join Date
              </td>
              <td className="text-[#000] font-bold text-[12px] lg:text-[16px] leading-[129%] py-6">
                Last Subscription
              </td>
              <td className="text-[#000] font-bold text-[12px] lg:text-[16px] leading-[129%] py-6">
                Number of forges downloaded
              </td>
              <td className="text-[#000] font-bold text-[12px] lg:text-[16px] leading-[129%] py-6">
                Days remaining for renewal
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="w-auto  border-b-[rgba(0,0,0,0.12)] hover:bg-slate-100">
              <td
                onClick={() => handleModalPopUp("my_modal_3")}
                className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex flex-row items-center py-2 gap-[16px] "
              >
                <Image
                  height='0'
                  width='0'
                  className="w-[50px] h-[50px] rounded-full"
                  src="/admin_section/general/img1.png"
                  alt="user"
                />
                <span className=" text-[11px] lg:text-[14px] text-[#000]  nueuem font-medium leading-[129%]">
                  Andreya Adams
                  
                </span>
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                20th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                4th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex items-center justify-start gap-3 text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con1.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className=" w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con2.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                </div>
                <p className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] neuem font-medium leading-[129%]">
                  232 forges
                </p>
                <button
                  // onClick={() => handleModalPopUp("all_forges_downloaded")}
                  onClick={() => handleModalPopUp("forge_info")}
                  className="bg-[#F5F5F5] border-none text-[12px] lg:text-[14px] w-[50px] h-[17px] gap-1 leading-[129%] rounded-[45px] text-[#95B611] flex fles-row items-center justify-center "
                >
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="9"
                    viewBox="0 0 6 9"
                    fill="none"
                  >
                    <path
                      d="M1 0.5L5 4.5L1 8.5"
                      stroke="#95B611"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
              <td className="text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                23 days
              </td>
            </tr>
            <tr className="w-auto  border-b-[rgba(0,0,0,0.12)] hover:bg-slate-100">
              <td
                onClick={() => handleModalPopUp("my_modal_3")}
                className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex flex-row items-center py-2 gap-[16px] "
              >
                <Image
                  height='0'
                  width='0'
                  className="w-[50px] h-[50px] rounded-full"
                  src="/admin_section/general/img1.png"
                  alt="user"
                />
                <span className=" text-[11px] lg:text-[14px] text-[#000]  nueuem font-medium leading-[129%]">
                  Andreya Adams
                  
                </span>
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                20th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                4th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex items-center justify-start gap-3 text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con1.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className=" w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con2.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                </div>
                <p className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] neuem font-medium leading-[129%]">
                  232 forges
                </p>
                <button
                  // onClick={() => handleModalPopUp("all_forges_downloaded")}
                  onClick={() => handleModalPopUp("forge_info")}
                  className="bg-[#F5F5F5] border-none text-[12px] lg:text-[14px] w-[50px] h-[17px] gap-1 leading-[129%] rounded-[45px] text-[#95B611] flex fles-row items-center justify-center "
                >
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="9"
                    viewBox="0 0 6 9"
                    fill="none"
                  >
                    <path
                      d="M1 0.5L5 4.5L1 8.5"
                      stroke="#95B611"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
              <td className="text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                23 days
              </td>
            </tr>
            <tr className="w-auto  border-b-[rgba(0,0,0,0.12)] hover:bg-slate-100">
              <td
                onClick={() => handleModalPopUp("my_modal_3")}
                className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex flex-row items-center py-2 gap-[16px] "
              >
                <Image
                  height='0'
                  width='0'
                  className="w-[50px] h-[50px] rounded-full"
                  src="/admin_section/general/img1.png"
                  alt="user"
                />
                <span className=" text-[11px] lg:text-[14px] text-[#000]  nueuem font-medium leading-[129%]">
                  Andreya Adams
                  
                </span>
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                20th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                4th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex items-center justify-start gap-3 text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con1.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className=" w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con2.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                </div>
                <p className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] neuem font-medium leading-[129%]">
                  232 forges
                </p>
                <button
                  // onClick={() => handleModalPopUp("all_forges_downloaded")}
                  onClick={() => handleModalPopUp("forge_info")}
                  className="bg-[#F5F5F5] border-none text-[12px] lg:text-[14px] w-[50px] h-[17px] gap-1 leading-[129%] rounded-[45px] text-[#95B611] flex fles-row items-center justify-center "
                >
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="9"
                    viewBox="0 0 6 9"
                    fill="none"
                  >
                    <path
                      d="M1 0.5L5 4.5L1 8.5"
                      stroke="#95B611"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
              <td className="text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                23 days
              </td>
            </tr>
            <tr className="w-auto  border-b-[rgba(0,0,0,0.12)] hover:bg-slate-100">
              <td
                onClick={() => handleModalPopUp("my_modal_3")}
                className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex flex-row items-center py-2 gap-[16px] "
              >
                <Image
                  height='0'
                  width='0'
                  className="w-[50px] h-[50px] rounded-full"
                  src="/admin_section/general/img1.png"
                  alt="user"
                />
                <span className=" text-[11px] lg:text-[14px] text-[#000]  nueuem font-medium leading-[129%]">
                  Andreya Adams
                  
                </span>
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                20th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                4th September 2023
              </td>
              <td className="min-w-[200px] lg:min-w-0 p-2 whitespace-break flex items-center justify-start gap-3 text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con1.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className=" w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con2.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                  <div className="avatar border-none">
                    <div className="w-[20px] lg:w-[35px] h-[20px] lg:h-[35px]">
                      <Image
                        alt="avatar"
                        height='0'
                        width='0' src="/admin_section/general/con3.png" className="w-full" />
                    </div>
                  </div>
                </div>
                <p className="min-w-[200px] lg:min-w-0 p-2 whitespace-break text-[11px] lg:text-[14px] neuem font-medium leading-[129%]">
                  232 forges
                </p>
                <button
                  // onClick={() => handleModalPopUp("all_forges_downloaded")}
                  onClick={() => handleModalPopUp("forge_info")}
                  className="bg-[#F5F5F5] border-none text-[12px] lg:text-[14px] w-[50px] h-[17px] gap-1 leading-[129%] rounded-[45px] text-[#95B611] flex fles-row items-center justify-center "
                >
                  view
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="9"
                    viewBox="0 0 6 9"
                    fill="none"
                  >
                    <path
                      d="M1 0.5L5 4.5L1 8.5"
                      stroke="#95B611"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
              <td className="text-[14px] text-[#000] nueuem font-medium leading-[129%]">
                23 days
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSubscribers;
