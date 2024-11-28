import React from "react";
import { useNavigate } from "react-router-dom";

const CartList = ({ cart }) => {
  const navigate = useNavigate();

  return (
    cart && (
      <>
        {cart.items.map((product) => (
          <div
            onClick={() => navigate(`/chi-tiet/${product.product.product_id}`)}
            key={product.cart_item_id}
            className="grid grid-cols-12 items-center gap-2 p-1 cursor-pointer rounded-md hover:bg-[#ededed]"
          >
            <div className="col-span-2">
              <img
                className="w-full h-full object-cover"
                src={product.product.thumbnail}
                alt={product.product.product_name}
              />
            </div>
            <span className="col-span-6">{product.product.product_name}</span>
            <span className="col-span-1 text-left">
              {product.color_size.color_name}
            </span>
            <span className="col-span-2 text-center">
              {product.color_size.size_name}
            </span>
            <span className="col-span-1">x{product.quantity}</span>
          </div>
        ))}
      </>
    )
  );
};

export default CartList;
