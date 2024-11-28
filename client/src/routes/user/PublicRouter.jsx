import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import { useCookie } from "../../hooks/useCookie";
import MessageButton from "../../components/user/message/MessageButton";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../../services/product.service";
import { getAllCategory } from "../../services/category.service";
import { getCart } from "../../services/cart.service";
import Pending from "../../components/user/animation/Pending";
import Cookies from "js-cookie";
import { getInfoUser } from "../../services/user.service";

const PublicRouter = () => {
  const dispatch = useDispatch();
  const isLogin = useMemo(() => {
    return Cookies.get("isLogin");
  }, []);

  const fetchData = async () => {
    await Promise.all([dispatch(getCart()), dispatch(getInfoUser())]);
  };

  useEffect(() => {
    if (isLogin) {
      fetchData();
    }
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-black">
        <Header />
        <Outlet />
        <MessageButton />
        <Footer />
      </div>
    </>
  );
};

export default PublicRouter;
