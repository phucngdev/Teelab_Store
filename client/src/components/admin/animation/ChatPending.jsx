import { LoadingOutlined } from "@ant-design/icons";
import React from "react";

const ChatPending = () => {
  return (
    <>
      <div className="w-full h-[calc(100vh-64px-248px)] flex items-center justify-center text-3xl">
        <LoadingOutlined />
      </div>
    </>
  );
};

export default ChatPending;
