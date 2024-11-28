import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Avatar, Popover, Button, message } from "antd";
import {
  MoonOutlined,
  ShoppingCartOutlined,
  SunOutlined,
} from "@ant-design/icons";
import CartList from "./CartList";
import CartEmpty from "./CartEmpty";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/auth.service";
import Pending from "../animation/Pending";
import { useLanguage } from "../../../providers/LanguageProvider";
import { useTheme } from "../../../providers/ThemeProvider";
import Cookies from "js-cookie";

const CartAndUserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.user.infoUser);

  const [pending, setPending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("isLogin") === true);

  useEffect(() => {
    const handleCookieChange = () => {
      setIsLoggedIn(Cookies.get("isLogin") === true);
    };
    // Theo dõi sự thay đổi của cookie
    window.addEventListener("storage", handleCookieChange);
    return () => {
      window.removeEventListener("storage", handleCookieChange);
    };
  }, []);

  const handleLogout = async () => {
    setPending(true);
    const response = await dispatch(logout());
    if (response.payload.status === 200) {
      navigate("/");
      message.success(language.header.feature.logout.notify.code_200);
      setIsLoggedIn(false);
    } else {
      message.error(language.header.feature.logout.notify.error_code);
    }
    setPending(false);
  };

  if (pending) return <Pending />;

  return (
    <>
      <div className="h-full w-10 relative group flex items-center justify-center">
        <Link to="/gio-hang" className="m-0">
          <Badge count={cart?.items?.length} showZero className="">
            <Avatar
              shape="square"
              icon={<ShoppingCartOutlined />}
              className="dark:bg-slate-500"
            />
          </Badge>
        </Link>
        <div className="group-hover:block rounded-sm shadow-lg bg-white absolute z-[99] top-[100%] right-0 hidden">
          <div className="w-[400px] max-h-[500px] overflow-scroll flex flex-col items-center text-center p-2">
            {cart?.items?.length > 0 ? <CartList cart={cart} /> : <CartEmpty />}
          </div>
        </div>
      </div>
      <div className="w-10 h-10 flex items-center justify-center">
        <Popover
          content={
            <>
              <div className="flex flex-col gap-2">
                <Button
                  type="primary"
                  onClick={() => navigate("/kiem-tra-don-hang")}
                >
                  {language.header.feature.check_order}
                </Button>
                <Button
                  type="primary"
                  onClick={() => navigate(`/lich-su-mua-hang/${user.user_id}`)}
                >
                  {language.header.feature.history_order}
                </Button>
                <Button
                  onClick={toggleTheme}
                  className="p-2 dark:bg-black dark:text-white rounded"
                >
                  {theme === "light" ? (
                    <>
                      <MoonOutlined /> Dark Mode
                    </>
                  ) : (
                    <>
                      <SunOutlined /> Light Mode
                    </>
                  )}
                </Button>
                <Button onClick={() => handleLogout()}>
                  {" "}
                  {language.header.feature.logout.label}
                </Button>
              </div>
            </>
          }
          title={language.header.feature.label}
          trigger="hover"
        >
          {user.avatar ? (
            <Avatar
              src={user?.avatar}
              className="w-full h-full rounded-full object-cover cursor-pointer"
            />
          ) : (
            <Avatar className="w-full h-full bg-[#fde3cf] text-[#f56a00] text-lg cursor-pointer rounded-full object-cover">
              {user?.username[0]}
            </Avatar>
          )}
        </Popover>
      </div>
    </>
  );
};

export default CartAndUserMenu;
