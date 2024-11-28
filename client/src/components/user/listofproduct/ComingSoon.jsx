import React from "react";
import ItemProduct from "../product/ItemProduct";
import { useSelector } from "react-redux";

const ComingSoon = () => {
  const products = useSelector((state) => state.product.data);
  console.log(products);

  return (
    products && (
      <>
        <div className="hidden md:flex flex-col w-[30%]">
          <h1 className="text-[30px] md:text-[40px] text-[#333] mb-5 px-2 md:px-0">
            Coming soon
          </h1>
          {/* <ItemProduct
            product={products?.products[0]}
            key={products?.products?.product_id}
          /> */}
        </div>
      </>
    )
  );
};

export default ComingSoon;
