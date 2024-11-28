import { Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllCategory,
  updateCategoryById,
} from "../../../services/category.service";

const UpdateCategory = ({
  isModalOpenUpdateCategory,
  setIsModalOpenUpdateCategory,
  category,
}) => {
  const dispatch = useDispatch();
  const [updateCategory, setupdateCategory] = useState(() => {
    if (category) {
      return {
        category_name: category.category_name,
        path: category.path,
      };
    }
    return null;
  });

  useEffect(() => {
    if (category) {
      setupdateCategory({
        category_name: category.category_name,
        path: category.path,
      });
    }
  }, [category]);

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setupdateCategory({ ...updateCategory, [name]: value });
  };

  const handleOk = async () => {
    console.log(updateCategory);

    if (!updateCategory.category_name || !updateCategory.path) {
      message.warning("Vui lòng nhập đủ thông tin");
      return;
    }
    const response = await dispatch(
      updateCategoryById({ id: category.category_id, data: updateCategory })
    );
    console.log(response);

    if (response.payload.status === 200) {
      message.success("Chỉnh sửa thành công");
      await dispatch(getAllCategory());
    } else {
      message.error("Chỉnh sửa thất bại");
    }
    setIsModalOpenUpdateCategory(false);
    setupdateCategory({
      category_name: "",
      path: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpenUpdateCategory(false);
    setupdateCategory({
      category_name: "",
      path: "",
    });
  };

  return (
    <>
      <Modal
        title="Tạo mới danh mục"
        open={isModalOpenUpdateCategory}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3 className="text-sm font-normal mb-2">Tên danh mục</h3>
        <Input
          placeholder="Tên danh mục"
          name="category_name"
          value={updateCategory?.category_name}
          onChange={(e) => handleChangeValue(e)}
        />
        <h3 className="text-sm font-normal mb-2 mt-4">Đường dẫn</h3>
        <Input
          placeholder="vd: ao-thun"
          name="path"
          value={updateCategory?.path}
          onChange={(e) => handleChangeValue(e)}
        />
      </Modal>
    </>
  );
};

export default UpdateCategory;
