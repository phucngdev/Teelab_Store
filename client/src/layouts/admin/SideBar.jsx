import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import {
  AppstoreOutlined,
  LoginOutlined,
  MailOutlined,
  MessageOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  SecurityScanOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Badge, Modal } from "antd";
import Cookies from "js-cookie";
import { logout } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import Pending from "../../components/user/animation/Pending";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalLogoutOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const showModal = () => {
    setIsModalLogoutOpen(true);
  };
  const handleOk = async () => {
    setPending(true);
    await dispatch(logout());
    setIsModalLogoutOpen(false);
    navigate("/dang-nhap");
    setPending(false);
  };
  const handleCancel = () => {
    setIsModalLogoutOpen(false);
  };

  if (pending) return <Pending />;

  return (
    <>
      <Modal
        title="Bạn muốn đăng xuất"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Xác nhận đăng xuất
      </Modal>
      <aside
        id="sidebar"
        className="fixed hidden z-20 h-full top-0 left-0 pt-16  lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <AppstoreOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3">Tổng quan</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/bao-cao"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <PieChartOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Báo cáo
                    </span>
                    {/* <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                      admin
                    </span> */}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/don-hang"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <ShoppingCartOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Đơn hàng
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/san-pham"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <ShoppingOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Sản phẩm
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/tai-khoan"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <UsergroupAddOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Tài khoản
                    </span>
                    {/* <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                      admin
                    </span> */}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/nhan-su"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <UsergroupAddOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Nhân sự
                    </span>
                    {/* <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                      admin
                    </span> */}
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/admin/code"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <SecurityScanOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Mã truy cập
                    </span>
                    <span className="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                      admin
                    </span>
                  </NavLink>
                </li> */}
              </ul>
              <div className="space-y-2 pt-2">
                <NavLink
                  to="/admin/cham-soc-khach-hang"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <MailOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Chat</span>
                  <span className="text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                    <Badge
                      className="site-badge-count-109 bg-[#ff0000] rounded-full"
                      count={`99+`}
                    />
                  </span>
                </NavLink>
                <NavLink
                  to="/admin/email"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                >
                  <MailOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Email</span>
                  <span className="text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                    <Badge
                      className="site-badge-count-109 bg-[#ff0000] rounded-full"
                      count={`99+`}
                    />
                  </span>
                </NavLink>
                <NavLink
                  to="/admin/comment"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                >
                  <MessageOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3">Đánh giá</span>
                </NavLink>
                <NavLink
                  to="/admin/ho-tro"
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                >
                  <QuestionCircleOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3">Hõ trợ</span>
                </NavLink>
                <button
                  onClick={() => showModal()}
                  className="w-full text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                >
                  <LoginOutlined className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                  <span className="ml-3">Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
