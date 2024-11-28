import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Steps, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneOrder, updateStatusOrder } from "../../services/order.service";
import formatPrice from "../../utils/formatPrice";
import { formatTime } from "../../utils/formatTime";
import { ShopOutlined } from "@ant-design/icons";
import Pending from "../../components/admin/animation/Pending";

const steps = [
  {
    title: "Chờ xử lý",
  },
  {
    title: "Chuẩn bị đơn hàng",
  },
  {
    title: "Vận chuyển",
  },
  {
    title: "Hoàn thành đơn hàng",
  },
];
const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    const response = await dispatch(getOneOrder(id));
    if (response.payload.status !== 200) {
      message.error("Không tải được đơn hàng, vui lòng thử lại");
    }
    setPending(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { status, order, order_items } = useSelector(
    (state) => state.order.dataEdit
  );

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleUpdateStatus = async (status) => {
    setPending(true);
    const response = await dispatch(
      updateStatusOrder({ id: id, data: { status: status } })
    );

    if (response.payload.status === 200) {
      message.success("Cập nhật trạng thái thành công");
      fetchData();
    } else {
      message.error("Cập nhật trạng thái thất bại, vui lòng thử lại");
    }
    setPending(false);
  };

  if (pending) return <Pending />;

  return (
    <>
      {status === 200 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <ShopOutlined />{" "}
              <Breadcrumb
                items={[
                  {
                    title: <Link to="/admin/don-hang">Đơn hàng</Link>,
                  },
                  {
                    title: <Link to="">Chi tiết</Link>,
                  },
                  {
                    title: <Link to="">{order?.order_id}</Link>,
                  },
                ]}
              />
            </h3>
            <div>
              {order.status === "0" ? (
                <span className="text-red-600 bg-red-200 py-1 px-2 rounded">
                  Chờ xử lý
                </span>
              ) : order.status === "1" ? (
                <span className="text-blue-600 bg-blue-200 py-1 px-2 rounded">
                  Đã xác nhận
                </span>
              ) : order.status === "2" ? (
                <span className="text-yellow-600 bg-yellow-200 py-1 px-2 rounded">
                  Vận chuyển
                </span>
              ) : (
                <span className="text-green-600 bg-green-200 py-1 px-2 rounded">
                  Hoàn thành
                </span>
              )}
            </div>
          </div>
          <div className="my-3">
            Ngày tạo đơn: {formatTime(order.created_at)}
          </div>
          <Steps current={+order.status} items={items} />
          <div className="flex justify-between">
            <div className="w-[50%] flex flex-col gap-2">
              <h3 className="mt-3 text-lg font-semibold">
                Thông tin khách hàng
              </h3>
              <span>Họ và tên: {order.username}</span>
              <span>Email: {order.email}</span>
              <span>Số điện thoại: {order.phone}</span>
              <span>Ghi chú: {order.note}</span>
            </div>
            <div className="w-[50%] flex flex-col gap-2">
              <h3 className="mt-3 text-lg font-semibold">Địa chỉ giao hàng</h3>
              <span>Tỉnh - Thành phố: {order.city}</span>
              <span>Quận - Huyện: {order.district}</span>
              <span>Xã - Phường: {order.ward}</span>
              <span>Số nhà: {order.address}</span>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Danh sách sản phẩm</h3>
              <h3 className="text-base">
                Tổng tiền đơn hàng:{" "}
                <span className="text-lg font-semibold text-red-500">
                  {formatPrice(order.total)}
                </span>
              </h3>
            </div>
            <div className="flex flex-col gap-2 p-3 bg-[#f8f9fb]">
              {order_items.map((od) => (
                <div
                  key={od.order_detail_id}
                  className="flex items-center justify-between"
                >
                  <img
                    className="w-[80px] h-[80px] object-cover"
                    src={od.thumbnail}
                    alt=""
                  />
                  <span className="w-[40%]">{od.product_name}</span>
                  <span>x{od.quantity}</span>
                  <span>{od.size_name}</span>
                  <span>{od.color_name}</span>
                  <span>{formatPrice(od.price)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <Button
              onClick={() =>
                navigate(`/admin/cham-soc-khach-hang/${order.user_id}`)
              }
              type="primary"
              className=""
            >
              <span className="text-white">Liên hệ khách hàng</span>
            </Button>
            {order.status === "0" && (
              <>
                <div className="flex items-center gap-4">
                  <Button
                    // onClick={() => handleUpdateStatus("1")}
                    type="button"
                    className="bg-red-500 hover:bg-red-400"
                  >
                    <span className="text-white">Từ chối</span>
                  </Button>
                  <Button
                    onClick={() => handleUpdateStatus("1")}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-400"
                  >
                    <span className="text-white">Xác nhận</span>
                  </Button>
                </div>
              </>
            )}
            {order.status === "1" && (
              <Button
                onClick={() => handleUpdateStatus("2")}
                type="button"
                className="bg-yellow-500 hover:bg-yellow-400"
              >
                <span className="text-white">Vận chuyển</span>
              </Button>
            )}
            {order.status === "2" && (
              <Button
                onClick={() => handleUpdateStatus("3")}
                type="button"
                className="bg-green-500 hover:bg-green-400"
              >
                <span className="text-white">Hoàn thành</span>
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;
