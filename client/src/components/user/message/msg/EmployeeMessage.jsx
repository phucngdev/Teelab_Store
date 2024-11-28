import React from "react";
import logo from "../../../../../public/favicon.png";

const EmployeeMessage = ({ message }) => {
  return (
    <>
      <div className="flex">
        <div className="flex items-start gap-4">
          <img src={logo} alt="" className="w-10 rounded-full" />
          <div className="max-w-[70%] lg:max-w-[50%] bg-[#f5f5f5] p-2 rounded-xl">
            {message}
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
};

export default EmployeeMessage;
