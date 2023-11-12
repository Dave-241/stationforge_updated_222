"use client ";

const Option_select = ({ options, handleRadioChange, selectedOption }: any) => {
  return (
    <>
      {" "}
      <div className="w-[30vw] z-[99] py-[2vw] px-[2vw] bg-white h-[30vw] rounded-[2vw]  flex flex-col justify-start ">
        <h2 className="text-[1.4vw] pb-[2vw] neuem">Who can see this post?</h2>
        <ul className=" flex flex-col gap-[2vw] ">
          {options.map((option: any, index: any) => (
            <li
              key={index}
              onClick={() => {
                handleRadioChange(option.id);
              }}
              className="flex justify-start cursor-pointer  py-[0.2vw] gap-[2vw] items-center"
            >
              <div
                className="w-[2vw] flex justify-center items-center  h-[2vw] border-[#B7B7B7] border-[0.1vw] rounded-[0.4vw]"
                style={{
                  backgroundColor: selectedOption == option.id ? "#CCFF00" : "",
                }}
              >
                <i
                  className="bi text-[2vw] bi-check-lg"
                  style={{
                    display: selectedOption == option.id ? "block" : "none",
                  }}
                ></i>
              </div>
              <p className="neuem text-[1.4vw] cursor-pointer">
                {option.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Option_select;
