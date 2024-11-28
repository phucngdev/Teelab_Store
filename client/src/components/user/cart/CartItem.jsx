import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import formatPrice from "../../../utils/formatPrice";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { getCart, updateCart } from "../../../services/cart.service";
import { useCookie } from "../../../hooks/useCookie";

const CartItem = ({ item, showModal, cart_id }) => {
  const dispatch = useDispatch();
  const user = useCookie("user_info", false);
  const handleChange = async (status) => {
    if (status === 1 && item.quantity === item.color_size.quantity) {
      message.error("Sản phẩm đã hết hàng");
      return;
    }
    const data = {
      quantity: status === 1 ? item.quantity + 1 : item.quantity - 1,
      cart_item_id: item.cart_item_id,
      cart_id: cart_id,
    };
    const response = await dispatch(updateCart(data));
    if (response.payload.status === 200) {
      await dispatch(getCart({ id: user.user_id }));
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 py-[7px]">
        <div className="flex gap-2 items-center mb-4 md:mb-0 col-span-12 md:col-span-6">
          <img
            className="w-[100px] h-[100px] object-cover"
            src={item.product.thumbnail}
            alt=""
          />
          <div className="flex flex-col items-start">
            <div>{item.product.product_name}</div>
            <div className="flex gap-1 items-center">
              <div>{item.color_size.color_name}</div>
              <div>/</div>
              <div>{item.color_size.size_name}</div>
            </div>
            <Button onClick={() => showModal(item.cart_item_id)}>
              <span className="text-[#ff0000]">Xoá</span>
            </Button>
          </div>
        </div>
        <div className="font-bold text-[#ff0000] flex justify-center items-center col-span-4 md:col-span-2">
          {formatPrice(item.product.price)}
        </div>
        <div className="flex justify-center items-center col-span-4 md:col-span-2">
          <button
            className="px-2 border"
            type="button"
            onClick={() => handleChange(0)}
            disabled={item.quantity > 1 ? false : true}
          >
            <MinusOutlined />
          </button>
          <span className="w-8 text-center border">{item.quantity}</span>
          <button
            className="px-2 border"
            type="button"
            onClick={() => handleChange(1)}
          >
            <PlusOutlined />
          </button>
        </div>
        <div className="font-bold text-[#ff0000] flex justify-center items-center col-span-4 md:col-span-2">
          {formatPrice(item.quantity * item.product.price)}
        </div>
      </div>
    </>
  );
};

export default CartItem;
