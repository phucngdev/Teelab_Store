import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateCategory from "../../components/admin/category/UpdateCategory";
import {
  deleteCategoryById,
  getAllCategory,
} from "../../services/category.service";
import NewCategory from "../../components/admin/create_product/NewCategory";

const CategoryManagement = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getAllCategory());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = useSelector((state) => state.category.data);
  const [isModalOpenUpdateCategory, setIsModalOpenUpdateCategory] =
    useState(false);
  const [isModalOpenNewCategory, setIsModalOpenNewCategory] = useState(false);

  const [category, setCategory] = useState(null);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openPopconfirmId, setOpenPopconfirmId] = useState(null);
  const showPopconfirm = (id) => {
    setOpenPopconfirmId(id);
  };

  const handleOk = async (id) => {
    setConfirmLoading(true);
    const response = await dispatch(deleteCategoryById(id));
    console.log(response);

    if (response.payload.status === 200) {
      message.success("Xoá thành công");
      await dispatch(getAllCategory());
    } else {
      message.error("Xoá thất bại");
    }
    setOpenPopconfirmId(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpenPopconfirmId(null);
  };

  return (
    <>
      <NewCategory
        isModalOpenNewCategory={isModalOpenNewCategory}
        setIsModalOpenNewCategory={setIsModalOpenNewCategory}
      />
      <UpdateCategory
        isModalOpenUpdateCategory={isModalOpenUpdateCategory}
        setIsModalOpenUpdateCategory={setIsModalOpenUpdateCategory}
        category={category}
      />
      <div className="">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-bold">
            <ShopOutlined /> Quản lý danh mục
          </h3>
          <Button
            type="primary"
            onClick={() => setIsModalOpenNewCategory(true)}
          >
            Thêm mới danh mục
          </Button>
        </div>
        <table className="border w-full *:text-center">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Đường dẫn</th>
              <th>Số lượng sản phẩm</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.category_id} className="*:border *:py-1">
                <td>{item.category_name}</td>
                <td>{item.path}</td>
                <td>{item.product_count}</td>
                <td>
                  <Space size="middle">
                    <Tooltip title="Chỉnh sửa">
                      <Button
                        onClick={() => {
                          setIsModalOpenUpdateCategory(true);
                          setCategory(item);
                        }}
                      >
                        <EditOutlined />
                      </Button>
                    </Tooltip>
                    <Popconfirm
                      title="Xoá danh mục"
                      description="Xoá danh mục sẽ xoá toàn bộ sản phẩm có danh mục này"
                      open={openPopconfirmId === item.category_id}
                      onConfirm={() => handleOk(item.category_id)}
                      icon={<QuestionCircleOutlined className="text-red-600" />}
                      okButtonProps={{
                        loading: confirmLoading,
                      }}
                      onCancel={handleCancel}
                    >
                      <Tooltip title="Xoá" color="red">
                        <Button
                          danger
                          onClick={() => showPopconfirm(item.category_id)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Tooltip>
                    </Popconfirm>
                  </Space>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryManagement;
