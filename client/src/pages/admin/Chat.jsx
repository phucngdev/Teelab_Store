import React from "react";
import SideBar from "../../components/admin/chat/SideBar";
import { Outlet } from "react-router-dom";

const Chat = () => {
  return (
    <>
      <div className="flex h-[calc(100vh-71px-24px)]">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default Chat;
