import { LeftOutlined, ShopOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ product_name, setModalSaveOpen, setModalNewOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <LeftOutlined
            onClick={() => navigate("/admin/san-pham")}
            className="p-5 ps-0 text-xl"
          />
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <ShopOutlined />{" "}
            <Breadcrumb
              items={[
                {
                  title: <Link to="/admin/san-pham">Sản phẩm</Link>,
                },
                {
                  title: <Link to="">Nhập hàng</Link>,
                },
                {
                  title: <Link to="">{product_name}</Link>,
                },
              ]}
            />
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <Button type="default" onClick={() => setModalNewOpen(true)}>
            Thêm màu mới
          </Button>
          <Button type="primary" onClick={() => setModalSaveOpen(true)}>
            Lưu thay đổi
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
