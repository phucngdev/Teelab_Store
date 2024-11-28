import { Button, Empty, Input } from "antd";
import React, { useEffect, useState } from "react";
import ItemProduct from "./item/ItemProduct";
import { useNavigate } from "react-router-dom";

const ActiveProduct = ({ products, categories }) => {
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
      <div className="md:flex md:items-center md:justify-between mb-3">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold whitespace-nowrap">
            Sản phẩm đang bán
          </h3>
          <Input placeholder="Tìm kiếm" />
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/admin/quan-ly-danh-muc")}
            type="default"
            className="mt-5 md:mt-0 w-full md:w-auto"
          >
            Quản lý danh mục
          </Button>
          <Button
            onClick={() => navigate("/admin/tao-moi-san-pham")}
            type="primary"
            className="mt-5 md:mt-0 w-full md:w-auto"
          >
            Thêm mới sản phẩm
          </Button>
        </div>
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

export default ActiveProduct;
