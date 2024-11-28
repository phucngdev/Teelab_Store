import { FormOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookie } from "../../../hooks/useCookie";
import { Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserChat } from "../../../services/message.service";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useCookie("user_info", false);
  const [pending, setPending] = useState(false);

  const fetchChat = async () => {
    setPending(true);
    await dispatch(getAllUserChat());
    setPending(false);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  const list_user = useSelector((state) => state.message.data);

  return (
    <>
      <div
        className={`w-full lg:w-[350px] border-e border-gray-200 overflow-scroll ${
          id ? "hidden lg:block" : ""
        }`}
      >
        <div className="p-2 text-gray-900 text-xl font-bold flex items-center justify-between">
          <h3>TEELAB STUDIO</h3>
          <Button>
            <FormOutlined className="text-gray-900 " />
          </Button>
        </div>
        <div className="flex items-center justify-between p-2 ">
          <span className="text-gray-900 font-semibold">Messages</span>
          <span className="text-gray-700">Requests</span>
        </div>
        {pending ? (
          <div className="text-gray-900 text-center mt-10">
            <LoadingOutlined /> Loading...
          </div>
        ) : (
          <>
            {list_user?.map((u) => (
              <div
                key={u.user_id}
                className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  navigate(`/admin/cham-soc-khach-hang/${u.room_id}`)
                }
              >
                {user?.avatar ? (
                  <Avatar
                    src={user?.avatar}
                    className="w-[56px] h-[56px] rounded-full object-cover"
                    alt=""
                  />
                ) : (
                  <Avatar className="w-[56px] bg-[#fde3cf] text-[#f56a00] text-lg h-[56px] rounded-full object-cover">
                    {u.username[0]}
                  </Avatar>
                )}
                <div className="flex flex-col ms-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-normal">
                      {u.username}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">active 17h ago</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;
