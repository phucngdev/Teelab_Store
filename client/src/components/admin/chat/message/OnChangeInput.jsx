import React from "react";
import logo from "../../../../../public/favicon.png";

const OnChangeInput = () => {
  return (
    <>
      <div className="flex">
        <div className="flex items-start gap-4">
          <img src={logo} alt="" className="w-10 rounded-full" />
          <div className="flex items-center gap-1 bg-[#e8e8e8] p-2 shadow-lg rounded-xl max-w-[70%]">
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
