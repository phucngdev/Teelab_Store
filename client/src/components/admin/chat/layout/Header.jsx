import {
  ExclamationCircleOutlined,
  LeftOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="lg:mt-0 flex items-center justify-between pb-3">
        <div className="flex items-center cursor-pointer">
          <LeftOutlined
            onClick={() => navigate("/admin/cham-soc-khach-hang")}
            className="p-5 ps-0 text-2xl lg:hidden"
          />
          {user?.avatar ? (
            <Avatar
              src={user?.avatar}
              className="w-[56px] h-[56px] rounded-full text-xl bg-[#fde3cf] text-[#f56a00] object-cover me-3"
              alt=""
            />
          ) : (
            <Avatar className="w-[56px] h-[56px] rounded-full text-xl bg-[#fde3cf] text-[#f56a00] object-cover me-3">
              {user?.username[0]}
            </Avatar>
          )}

          <div className="flex flex-col">
            <span className="text-gray-500 font-normal">{user?.username}</span>
            <span className="text-gray-400 text-sm">active 17h ago</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-2xl cursor-pointer">
          <PhoneOutlined />
          <VideoCameraOutlined />
          <ExclamationCircleOutlined />
        </div>
      </header>
    </>
  );
};

export default Header;
