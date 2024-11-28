import { Button, Select } from "antd";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Category = ({ formik, handleChangeCategory, showModal }) => {
  const categorys = useSelector((state) => state.category.data);

  const options = useMemo(() => {
    return categorys?.map((product) => ({
      value: product.category_id,
      label: product.category_name,
    }));
  }, [categorys]);
  return (
    <>
      <div className="border p-4 border-gray-200 rounded-[20px] mt-4">
        <h3 className="text-xl font-normal mb-2">Danh mục sản phẩm</h3>
        <Select
          placeholder="Chọn danh mục sản phẩm"
          className="w-full !text-black"
          onChange={handleChangeCategory}
          options={options}
        />
        {formik.touched.category && formik.errors.category ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.category}
          </div>
        ) : null}
        <Button type="default" className="mt-2" onClick={showModal}>
          Thêm danh mục
        </Button>
      </div>
    </>
  );
};

export default Category;
