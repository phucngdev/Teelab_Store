import { Input, message, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createCategory,
  getAllCategory,
} from "../../../services/category.service";

const NewCategory = ({ isModalOpenNewCategory, setIsModalOpenNewCategory }) => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState({
    category_name: "",
    path: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleOk = async () => {
    if (!newCategory.category_name || !newCategory.path) {
      message.warning("Vui lòng nhập đủ thông tin");
      return;
    }
    const response = await dispatch(createCategory(newCategory));
    if (response.payload.status === 201) {
      message.success("Thêm thành công");
      await dispatch(getAllCategory());
    } else {
      message.error("Thêm thất bại");
    }
    setIsModalOpenNewCategory(false);
    setNewCategory({
      category_name: "",
      path: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpenNewCategory(false);
    setNewCategory({
      category_name: "",
      path: "",
    });
  };

  return (
    <>
      <Modal
        title="Tạo mới danh mục"
        open={isModalOpenNewCategory}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3 className="text-sm font-normal mb-2">Tên danh mục</h3>
        <Input
          placeholder="Tên danh mục"
          name="category_name"
          onChange={(e) => handleChangeValue(e)}
        />
        <h3 className="text-sm font-normal mb-2 mt-4">Đường dẫn</h3>
        <Input
          placeholder="vd: ao-thun"
          name="path"
          onChange={(e) => handleChangeValue(e)}
        />
      </Modal>
    </>
  );
};

export default NewCategory;
