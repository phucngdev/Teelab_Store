import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../../layouts/admin/SideBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Nav from "../../layouts/admin/Nav";
import Footer from "../../layouts/admin/Footer";
import { useCookie } from "../../hooks/useCookie";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { checkRoleAdmin } from "../../services/auth.service";
import { LoadingOutlined } from "@ant-design/icons";
import Pending from "../../components/user/animation/Pending";

const PrivateRouter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useCookie("user_info", false);
  const [role, setRole] = useState(null);
  const [pending, setPending] = useState(true);

  const checkRole = async () => {
    setPending(true);
    const response = await dispatch(checkRoleAdmin());
    if (response.payload && response.payload.status === 200) {
      setRole(true);
      message.success(`Hello`);
      navigate("/admin/dashboard");
    } else if (response.payload.response.status === 403) {
      message.error("Bạn không có quyền truy cập");
      navigate("/");
    } else if (response.payload.response.status === 401) {
      message.error("Vui lòng đăng nhập");
      navigate("/dang-nhap");
    } else {
      message.error("Lỗi hệ thống");
      navigate("/");
    }
    setPending(false);
  };

  useEffect(() => {
    checkRole();
  }, []);

  if (pending) return <Pending />;

  return (
    role && (
      <>
        <Sidebar />
        <Nav user={user} />
        <div className="flex overflow-hidden bg-white pt-16">
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          />
          <main
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <div className="p-2 lg:pt-6 lg:px-4">
              <Outlet context={user} />
            </div>
            <Footer />
          </main>
        </div>
      </>
    )
  );
};

export default PrivateRouter;
