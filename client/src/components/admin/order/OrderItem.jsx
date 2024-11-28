import { FieldTimeOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import formatPrice from "../../../utils/formatPrice";

const OrderItem = ({ od }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        key={od.order_id}
        onClick={() => navigate(`/admin/don-hang/${od.order_id}`)}
        className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <div className="max-w-[50%]">
            <h2 className="text-lg font-semibold overflow-hidden text-ellipsis">
              {od.username}
            </h2>
            <p className="text-gray-500">{od.phone}</p>
          </div>
          <button className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-lg">
            {od.status === "0"
              ? "Mới"
              : od.status === "1"
              ? "Chuẩn bị"
              : od.status === "2"
              ? "Vận chuyển"
              : "Hoàn thành"}
          </button>
        </div>
        <div className="border-t border-gray-200 my-4">note: {od.note}</div>

        <div className="flex items-center text-gray-500 mb-4">
          <FieldTimeOutlined />
          <p className="ml-2">
            {moment(od.created_at).format("hh:mm A, DD MMM, YYYY")}
          </p>
        </div>
        <div className="border-b border-gray-200">
          {od.transaction == "normal"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán zalopay"}
        </div>
        <div className=" my-4"></div>
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <p className="font-semibold">
            {od.details.reduce((total, detail) => {
              return total + detail.quantity;
            }, 0)}{" "}
            sản phẩm
          </p>
          <span className="text-blue-600">{formatPrice(od.total)}</span>
        </div>
        <div className="text-gray-600 max-h-[100px] overflow-scroll">
          {od.details.map((dt) => (
            <div key={dt.order_detail_id} className="flex justify-between mb-2">
              <p>
                {dt.quantity} - {dt.product.category_name}
              </p>
              <p>{dt.color_size.size_name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
