import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import ItemProduct from "../product/ItemProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../services/product.service";

const ListProducts = ({ category }) => {
  const products = useSelector((state) => state.product.data);
  const [listProduct, setListProduct] = useState(() => {
    const list =
      category === "Tất cả sản phẩm"
        ? products
        : products?.products?.filter(
            (p) => p.category.category_name === category.toLowerCase()
          );
    return list || [];
  });

  useEffect(() => {
    setListProduct(
      category === "Tất cả sản phẩm"
        ? products?.products
        : products?.products?.filter((p) => p.category === category)
    );
  }, [products, category]);

  return (
    <>
      <div className="container mx-auto mb-[50px]">
        <h1 className="text-[30px] md:text-[40px] text-[#333] mb-5 px-2 md:px-0">
          {category}
        </h1>
        {listProduct?.length > 0 ? (
          <div className="container px-2 md:px-0 mx-auto grid grid-cols-2 gap-x-5 gap-y-7 xl:grid-cols-4 md:grid-cols-3">
            {listProduct.map((product) => (
              <ItemProduct product={product} key={product?.product_id} />
            ))}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </>
  );
};

export default ListProducts;
