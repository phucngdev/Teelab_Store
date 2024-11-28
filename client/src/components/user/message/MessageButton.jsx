import { MessageOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MessageButton = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.infoUser);

  return (
    <>
      <Tooltip title="Hỗ trợ khách hàng" color={"purple"}>
        <div
          onClick={
            user
              ? () => navigate(`/cham-soc-khac-hang/${user.room_id}`)
              : () => navigate("/cham-soc-khac-hang/khach-hang")
          }
          className="bg-white cursor-pointer text-black fixed bottom-10 right-10 p-3 text-4xl rounded-3xl shadow-xl border z-[999]"
        >
          <MessageOutlined />
        </div>
      </Tooltip>
    </>
  );
};

export default MessageButton;
