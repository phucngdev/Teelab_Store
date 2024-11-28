import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import React from "react";

const Images = ({ product }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 justify-between w-1/4">
        <div className="border p-4 border-gray-200 rounded-[20px] w-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-normal">Thumbnail</h3>
            {true && (
              <button
                type="button"
                className="text-sm border border-red-300 py-1 px-2 rounded-lg "
              >
                Thay đổi
              </button>
            )}
          </div>
          <div className="flex items-center justify-center border border-gray-200 rounded-[20px] overflow-hidden">
            {product?.thumbnail ? (
              <Image
                className="w-full h-full object-cover"
                src={product?.thumbnail}
                alt="thumbnail"
              />
            ) : (
              <Upload
                name="thumbnail"
                listType="picture-card"
                className="m-3"
                showUploadList={false}
              >
                <button className="border-0" type="button">
                  {false ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="mt-2">Upload</div>
                </button>
              </Upload>
            )}
          </div>
          {/* <span className="text-[11px] text-gray-400">
              Gợi ý: hình ảnh của sản phẩm nên có dạng *png, *jpg hoặc *jpeg
            </span> */}
          {/* {formik.touched.thumbnail && formik.errors.thumbnail ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.thumbnail}
          </div>
        ) : null} */}
        </div>
        <div className="border p-4 border-gray-200 rounded-[20px] w-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-normal">Hover</h3>
            {true && (
              <button
                type="button"
                className="text-sm border border-red-300 py-1 px-2 rounded-lg "
              >
                Thay đổi
              </button>
            )}
          </div>
          <div className="flex items-center justify-center border border-gray-200 rounded-[20px] overflow-hidden">
            {product?.thumbnail_hover ? (
              <Image
                className="w-full h-full object-cover"
                src={product?.thumbnail_hover}
                alt="hover"
              />
            ) : (
              <Upload
                name="thumbnail"
                listType="picture-card"
                className="m-3"
                showUploadList={false}
              >
                <button className="border-0" type="button">
                  {false ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="mt-2">Upload</div>
                </button>
              </Upload>
            )}
          </div>
          {/* <span className="text-[11px] text-gray-400">
              Gợi ý: hình ảnh của sản phẩm nên có dạng *png, *jpg hoặc *jpeg
            </span> */}
          {/* {formik.touched.thumbnail && formik.errors.thumbnail ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.thumbnail}
          </div>
        ) : null} */}
        </div>
        <div className="border p-4 border-gray-200 rounded-[20px] w-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-normal">Mô tả</h3>
            {true && (
              <button
                type="button"
                className="text-sm border border-red-300 py-1 px-2 rounded-lg "
              >
                Thay đổi
              </button>
            )}
          </div>
          <div className="flex items-center justify-center border border-gray-200 rounded-[20px] overflow-hidden">
            {product?.description_image ? (
              <Image
                className="w-full h-full object-cover"
                src={product?.description_image}
                alt="description"
              />
            ) : (
              <Upload
                name="thumbnail"
                listType="picture-card"
                className="m-3"
                showUploadList={false}
              >
                <button className="border-0" type="button">
                  {false ? <LoadingOutlined /> : <PlusOutlined />}
                  <div className="mt-2">Upload</div>
                </button>
              </Upload>
            )}
          </div>
          {/* <span className="text-[11px] text-gray-400">
              Gợi ý: hình ảnh của sản phẩm nên có dạng *png, *jpg hoặc *jpeg
            </span> */}
          {/* {formik.touched.thumbnail && formik.errors.thumbnail ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.thumbnail}
          </div>
        ) : null} */}
        </div>
      </div>
    </>
  );
};

export default Images;
