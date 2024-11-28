import { Input, Select } from "antd";
import React, { useMemo } from "react";
import Category from "../../create_product/Category";
import { useSelector } from "react-redux";
import formatPrice from "../../../../utils/formatPrice";

const Price = ({ product }) => {
  console.log("🚀 ~ Price ~ product:", product);
  const categorys = useSelector((state) => state.category.data);

  const options = useMemo(() => {
    return categorys?.map((product) => ({
      value: product.category_id,
      label: product.category_name,
    }));
  }, [categorys]);

  return (
    <>
      <div className="w-1/4">
        <div className="border border-gray-200 p-4 rounded-[20px]">
          <h3 className="text-xl font-normal mb-8">Giá và Giảm giá</h3>
          <div className="">
            <h5 className="text-base font-normal mb-2">Giá sản phẩm</h5>
            <Input
              placeholder="nhập giá sản phẩm"
              name="price"
              defaultValue={formatPrice(product?.price_max)}
              // value={formik.values.price}
              // onChange={formik.handleChange}
            />
            {/* {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.price}
              </div>
            ) : null} */}
          </div>
          <div className="mt-5">
            <h5 className="text-base font-normal mb-2">Giảm giá (%)</h5>
            <Input
              placeholder="nhập % giảm giá sản phẩm"
              name="discount"
              defaultValue={product?.discount}
              // value={formik.values.discount}
              // onChange={formik.handleChange}
            />
            {/* {formik.touched.discount && formik.errors.discount ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.discount}
              </div>
            ) : null} */}
          </div>
          <div className="mt-5 flex items-start justify-between gap-10">
            <div className="flex-1">
              <h5 className="text-base font-normal mb-2">Giá bán thực tế</h5>
              <Input
                placeholder="Giá bán ra"
                defaultValue={formatPrice(product?.price)}
                readOnly
                // value={formik.values.price * (1 - formik.values.discount / 100)}
              />
            </div>
          </div>
        </div>
        <div className="border p-4 border-gray-200 rounded-[20px] mt-4">
          <h3 className="text-xl font-normal mb-2">Danh mục sản phẩm</h3>
          <Select
            defaultValue={product?.category?.category_id}
            placeholder="Chọn danh mục sản phẩm"
            className="w-full !text-black"
            // onChange={handleChangeCategory}
            options={options}
          />
          {/* {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </div>
          ) : null} */}
        </div>
      </div>
    </>
  );
};

export default Price;
