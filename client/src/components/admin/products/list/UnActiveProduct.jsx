import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemProduct from "./item/ItemProduct";
import { Empty } from "antd";

const UnActiveProduct = ({ products, categories }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Tất cả sản phẩm");
  const [listProduct, setListProduct] = useState(() => {
    const list =
      category === "Tất cả sản phẩm"
        ? products
        : products?.filter((p) => p.category === category);
    return list || [];
  });

  useEffect(() => {
    setListProduct(
      category === "Tất cả sản phẩm"
        ? products
        : products?.filter((p) => p.category === category)
    );
  }, [products, category]);

  return (
    <>
      <div className="md:flex md:items-center md:justify-between mt-10 mb-3">
        <h3 className="text-xl font-bold">Sản phẩm ngừng bán</h3>
      </div>
      <div className="flex items-center gap-8 text-black my-4">
        <button
          className={`${
            category === "Tất cả sản phẩm"
              ? "text-blue-600 border-b border-blue-600"
              : ""
          }`}
          onClick={() => setCategory("Tất cả sản phẩm")}
        >
          Tất cả sản phẩm
        </button>
        {categories?.map((cate) => (
          <button
            key={cate.category_id}
            onClick={() => {
              setCategory(cate.category_name);
              setListProduct(cate.products);
            }}
            className={`${
              category === cate.category_name
                ? "text-blue-600 border-b border-blue-600"
                : ""
            }`}
          >
            {cate.category_name}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-x-2 text-center p-2">
        <div className="w-[10%]">Ảnh</div>
        <div className="w-[30%]">Tên sản phẩm</div>
        <div className="w-[10%]">Tồn kho</div>
        <div className="w-[10%]">Lượt bán</div>
        <div className="w-[10%]">Giá bán</div>
        <div className="w-[10%]">Ngày tạo</div>
        <div className="flex-1">Chỉnh sửa</div>
      </div>
      {listProduct?.length > 0 ? (
        listProduct.map((product, index) => (
          <ItemProduct
            key={index}
            product={product}
            setListProduct={setListProduct}
          />
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default UnActiveProduct;
