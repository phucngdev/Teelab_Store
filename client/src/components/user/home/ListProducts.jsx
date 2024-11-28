import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Tooltip, message } from "antd";
import ItemProduct from "../product/ItemProduct";

const ListProducts = ({ path, category }) => {
  const products = useSelector((state) => state.product.data);

  const [listProduct, setListProduct] = useState(() => {
    const list = products?.products
      ?.filter((p) => p.category === category)
      .slice(0, 8);
    return list || [];
  });

  useEffect(() => {
    setListProduct(
      products?.products?.filter((p) => p.category === category).slice(0, 8)
    );
  }, [products, category]);

  return (
    listProduct &&
    listProduct.length > 0 && (
      <>
        <div className="container mx-auto mb-[50px]">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] text-[#333] font-mono ps-3 hover:opacity-60 lg:text-[40px] lg:ps-0 dark:text-white">
              <Link to={path}>{category}</Link>
            </h2>
            <h4 className="text-[20px] text-red-400 hover:underline hidden lg:block">
              <Link to={path}>Xem thêm</Link>
            </h4>
          </div>
          {listProduct?.length > 0 ? (
            <div className="container px-2 md:px-0 mx-auto grid grid-cols-2 gap-x-5 gap-y-7 xl:grid-cols-4 md:grid-cols-3">
              {listProduct.map((product) => (
                <ItemProduct product={product} key={product?.product_id} />
              ))}
            </div>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          <Link
            to={path}
            className="block text-center text-base text-[#333] underline decoration-1 mt-4 lg:hidden"
          >
            Xem thêm
          </Link>
        </div>
      </>
    )
  );
};

export default ListProducts;
