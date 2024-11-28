import React, { useEffect } from "react";
import TopHeader from "../../components/user/header/TopHeader";
import MainNavigate from "../../components/user/header/MainNavigate";
import ProductsNavigation from "../../components/user/header/ProductsNavigation";
import HeaderMobile from "../../components/user/header/HeaderMobile";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../services/cart.service";

const Header = () => {
  return (
    <>
      <HeaderMobile />
      <TopHeader />
      <MainNavigate />
      <ProductsNavigation />
    </>
  );
};

export default Header;
