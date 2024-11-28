import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import React from "react";

const ListImage = ({ formik, getUploadProps, loading, imageUrls }) => {
  return (
    <>
      <div className="border p-4 border-gray-200 rounded-[20px] mt-4">
        <h3 className="text-xl font-normal mb-2">Danh sách ảnh sản phẩm</h3>
        <div className="overflow-scroll gap-1 p-3 flex flex-wrap items-center justify-around border border-gray-200 rounded-[20px]">
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              width={100}
              height={100}
              src={url}
              alt={`Image ${index + 1}`}
            />
          ))}
          <Upload
            name="images"
            listType="picture-card"
            className="m-3"
            showUploadList={false}
            multiple
            {...getUploadProps("images", null)}
          >
            <button className="border-0" type="button">
              {loading.images ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="mt-2">Upload</div>
            </button>
          </Upload>
        </div>
        <span className="text-[11px] text-gray-400">
          Gợi ý: hình ảnh của sản phẩm nên có dạng *png, *jpg hoặc *jpeg
        </span>
        {formik.touched.thumbnail_hover && formik.errors.thumbnail_hover ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.thumbnail_hover}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ListImage;
