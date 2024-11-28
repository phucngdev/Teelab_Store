import { ShopOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrder } from "../../../services/order.service";

const Header = ({ page, setPage }) => {
  return (
    <>
      <div className="bg-white rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-bold">
            <ShopOutlined /> Danh sách đơn hàng
          </h3>
          <Input className="w-1/5" placeholder="Tìm kiếm" />
        </div>
        <div className="flex gap-5 items-center">
          <Button onClick={() => setPage({ ...page, page: 1, status: -1 })}>
            Tất cả đơn hàng
          </Button>
          <Button onClick={() => setPage({ ...page, page: 1, status: "0" })}>
            Đơn hàng mới
          </Button>
          <Button onClick={() => setPage({ ...page, page: 1, status: "1" })}>
            Đơn hàng đã xác nhận
          </Button>
          <Button onClick={() => setPage({ ...page, page: 1, status: "2" })}>
            Đơn hàng đang vận chuyển
          </Button>
          <Button onClick={() => setPage({ ...page, page: 1, status: "3" })}>
            Đơn hàng hoàn thành
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
