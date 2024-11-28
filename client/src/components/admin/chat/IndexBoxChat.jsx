import { WechatWorkOutlined } from "@ant-design/icons";
import React from "react";

const IndexBoxChat = () => {
  return (
    <>
      <div className="lg:flex-1 lg:px-3 lg:pt-4  flex flex-col items-center gap-3 justify-center text-gray-900">
        <div className="border-2 border-gray-200 rounded-full w-[120px] h-[120px] flex items-center justify-center">
          <WechatWorkOutlined className="text-6xl" />
        </div>
        <span className="text-2xl font-bold">Your messages</span>
      </div>
    </>
  );
};

export default IndexBoxChat;
