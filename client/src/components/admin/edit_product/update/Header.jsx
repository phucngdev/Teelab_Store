import { LeftOutlined, ShopOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ product_name }) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between items-center">
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
                  title: <Link to="">Chỉnh sửa</Link>,
                },
                {
                  title: <Link to="">{product_name}</Link>,
                },
              ]}
            />
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <Button type="primary">Lưu thay đổi</Button>
        </div>
      </header>
    </>
  );
};

export default Header;
