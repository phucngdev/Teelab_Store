import React from "react";
import logo from "../../../../../public/favicon.png";

const ClientMessage = ({ message }) => {
  return (
    <>
      <div className="flex">
        <div className="flex-1"></div>
        <div className="max-w-[70%] lg:max-w-[50%] text-white flex items-start gap-4">
          <div className="bg-[#108ee9] p-2 rounded-xl">{message}</div>
          <img src={logo} alt="" className="w-10 rounded-full" />
        </div>
      </div>
    </>
  );
};

export default ClientMessage;
