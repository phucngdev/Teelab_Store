import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const Pending = () => {
  return (
    <>
      <div className="fixed bg-[rgba(255,255,255,0.5)] text-3xl z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center">
        <LoadingOutlined />
      </div>
    </>
  );
};

export default Pending;
