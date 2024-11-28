import { Input } from "antd";
import React, { useState } from "react";
import Editor from "../../create_product/editor/Editor";
import { CaretRightOutlined } from "@ant-design/icons";

const Center = ({ product }) => {
  const [description, setDescription] = useState(() => {
    if (product) return product.description;
    return "";
  });

  return (
    <>
      <div className="flex-1">
        <div className="border border-gray-200 p-4 rounded-[20px]">
          <h3 className="text-xl font-normal mb-8">Tổng quan</h3>
          <h5 className="text-base font-normal mb-2">Tên sản phẩm</h5>
          <Input
            placeholder="nhập tên sản phẩm"
            name="name"
            defaultValue={product?.product_name}
            // value={formik.values.name}
            // onChange={formik.handleChange}
          />

          <h5 className="text-base font-normal mb-2 mt-5">
            Chi tiết sản phẩm sản phẩm
          </h5>
          <Editor setDescription={setDescription} description={description} />
        </div>
        <div className="border border-gray-200 p-4 rounded-[20px]">
          <h3 className="text-xl font-normal mb-8">Màu và size</h3>
          <h5 className="text-base font-normal mb-2">Danh sách màu</h5>
          {product?.option?.map((c) => (
            <div key={c.color_size_id} className="flex items-center gap-4 mt-2">
              <div className="size-16 flex items-center justify-center border rounded-md">
                {c.color_name}
              </div>
              <CaretRightOutlined />
              <div className="flex items-center gap-2">
                {c.sizes.map((s) => (
                  <div
                    key={s.size_id}
                    className="size-16 border flex items-center justify-center rounded-md"
                  >
                    {s.size_name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Center;
