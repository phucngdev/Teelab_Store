import React from "react";
import logo from "../../../../../public/favicon.png";

const OnChangeInput = () => {
  return (
    <>
      <div className="flex mt-3">
        <div className="flex max-w-[70%] lg:max-w-[50%] items-start gap-4">
          <img src={logo} alt="" className="w-10 rounded-full" />
          <div className="bg-[#f5f5f5] flex items-center gap-1 p-2 rounded-xl">
            <div className="animate-bounce size-2 rounded-full bg-gray-500"></div>
            <div className="animate-bounce size-2 rounded-full bg-gray-500"></div>
            <div className="animate-bounce size-2 rounded-full bg-gray-500"></div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
};

export default OnChangeInput;
