import React from "react";
import { Helmet } from "react-helmet";
import size from "../../../public/bang-size.webp";

const Size = () => {
  return (
    <>
      <Helmet>
        <title>Bảng size | TEELAB</title>
      </Helmet>
      <div className="container mx-auto px-[15px] mt-[56px] mb-[30px] text-[#333] dark:text-white">
        <h1 className="text-[40px]  mb-5 font-light">Bảng size</h1>
        <div>
          <img src={size} alt="" />
        </div>
        <p className="mb-4">
          <span className="text-[14px] font-extrabold">TEELAB</span>
        </p>
        <p className="mb-4">
          <span className="text-[14px] font-extrabold">
            Experiment on Your Style
          </span>
        </p>
      </div>
    </>
  );
};

export default Size;
