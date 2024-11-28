import React from "react";
import Icon_Incart from "../../../../public/icon_incart.svg";

const CartEmpty = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img className="w-20 m-[15px]" src={Icon_Incart} alt="" />
        <p className="mb-2">Không có sản phẩm nào trong giỏ hàng của bạn</p>
      </div>
    </>
  );
};

export default CartEmpty;
