import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionItem from "./OptionItem";
import formatPrice from "../../../utils/formatPrice";
import { Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ItemProduct = ({ product }) => {
  const navigate = useNavigate();
  const [imageFocus, setImageFocus] = useState("");

  return (
    <>
      <div className="group flex flex-col items-center relative hover:cursor-pointer">
        <img
          loading="lazy"
          className="w-full h-full object-contain hover:opacity-0"
          src={imageFocus || product?.thumbnail}
          alt={product?.product_name}
        />
        <div className="opacity-0 transition-opacity duration-500 absolute z-50 top-0 left-0 hover:opacity-100">
          <img
            loading="lazy"
            className="w-full h-full object-cover"
            src={product?.thumbnail_hover}
            alt={product?.product_name}
            onClick={() => navigate(`/chi-tiet/${product?.product_id}`)}
          />
        </div>
        {!product?.status && (
          <div className="w-full text-center absolute z-[999] top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <span className="px-5 py-2 bg-black shadow-lg text-white">
              SOLD OUT
            </span>
          </div>
        )}
        {/* <Tooltip title="Thêm vào giỏ hàng">
              <div className="group-hover:block hidden p-2 bg-black border hover:bg-slate-900 active:bg-white active:text-black border-black rounded-full text-white text-xl absolute top-[10px] right-0 z-50 group-hover:translate-x-[-15px] transition duration-150">
                <ShoppingCartOutlined />
              </div>
            </Tooltip> */}
        {product?.status == 0 && (
          <div className="w-full text-center absolute z-[999] top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <span className="px-5 py-2 bg-black shadow-lg text-white ">
              SOLD OUT
            </span>
          </div>
        )}
        <div className="px-2 py-1 bg-[#d52220] absolute z-50 top-[15px] left-[15px] text-center text-xs text-white">
          -{product?.discount}%
        </div>
        <div className="flex flex-col items-center mt-3">
          <div className="flex justify-center items-center gap-[10px] mb-[10px]">
            <OptionItem
              option={product?.option}
              setImageFocus={setImageFocus}
            />
          </div>
          <h3
            onClick={() => navigate(`/chi-tiet/${product?.product_id}`)}
            className="text-base font-normal text-[#333] text-center mb-[10px] group-hover:text-[#dc3545] dark:text-white"
          >
            {product.product_name}
          </h3>
          <div className="flex items-center justify-center gap-[10px]">
            <span className="text-[#d52220] text-base dark:text-white">
              {formatPrice(product?.price)}
            </span>
            <span className="text-[#9e9e9e] text-base line-through">
              {formatPrice(product?.price_max)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemProduct;
