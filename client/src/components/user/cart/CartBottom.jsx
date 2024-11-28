import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../../utils/formatPrice";

const CartBottom = ({ cart }) => {
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cart?.items?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <>
      <div className="flex justify-center md:justify-end mt-5">
        <div className="flex flex-col w-full md:w-[360px]">
          <div className="flex justify-between items-center">
            <div>Tổng tiền:</div>
            <div className="font-bold text-2xl text-[#ff0000]">
              {formatPrice(totalPrice)}
            </div>
          </div>
          <button
            type="button"
            disabled={cart?.items?.length > 0 ? false : true}
            onClick={() => navigate("/thanh-toan")}
            className="w-full bg-black text-white py-2 rounded-sm hover:opacity-75 mt-1"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
};

export default CartBottom;
