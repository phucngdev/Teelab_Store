import React from "react";
import icon_incart from "../../../../public/icon_incart.svg";
import { useLanguage } from "../../../providers/LanguageProvider";

const CartEmpty = () => {
  const { language } = useLanguage();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img className="w-20 m-[15px]" src={icon_incart} alt="" />
        <p className="mb-2">{language.header.cart.emptyProduct}</p>
      </div>
    </>
  );
};

export default CartEmpty;
