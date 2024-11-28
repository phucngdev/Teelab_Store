import React from "react";
import logo from "../../../../../public/favicon.png";

const ClientMessage = ({ message }) => {
  return (
    <>
      <div className="flex">
        <div className="flex items-start gap-4 max-w-[70%] lg:max-w-[50%]">
          <img src={logo} alt="" className="w-10 rounded-full" />
          <div className="bg-[#e8e8e8] p-2 shadow-lg rounded-xl">{message}</div>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
};

export default ClientMessage;
