import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import React from "react";

const Thumbnail = ({ formik, getUploadProps, loading }) => {
  return (
    <>
      <div className="border p-4 border-gray-200 rounded-[20px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-normal">Thumbnail</h3>
          {formik.values.thumbnail && (
            <button
              type="button"
              className="border border-red-300 py-1 px-2 rounded-lg "
            >
              Xoá
            </button>
          )}
        </div>
        <div className="flex items-center justify-center border border-gray-200 rounded-[20px] overflow-hidden">
          {formik.values.thumbnail ? (
            <Image
              className="w-full h-full object-cover"
              src={formik.values.thumbnail}
              alt="thumbnail"
            />
          ) : (
            <Upload
              name="thumbnail"
              listType="picture-card"
              className="m-3"
              showUploadList={false}
              {...getUploadProps("thumbnail", null)}
            >
              <button className="border-0" type="button">
                {loading.thumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="mt-2">Upload</div>
              </button>
            </Upload>
          )}
        </div>
        <span className="text-[11px] text-gray-400">
          Gợi ý: hình ảnh của sản phẩm nên có dạng *png, *jpg hoặc *jpeg
        </span>
        {formik.touched.thumbnail && formik.errors.thumbnail ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.thumbnail}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Thumbnail;
