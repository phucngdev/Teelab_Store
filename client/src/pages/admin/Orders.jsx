import { Empty, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/admin/order/Header";
import OrderItem from "../../components/admin/order/OrderItem";
import Overview from "../../components/admin/order/Overview";
import { getAllOrder } from "../../services/order.service";
import Pending from "../../components/admin/animation/Pending";

const Orders = () => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [page, setPage] = useState({
    page: 1,
    limit: 20,
    status: -1,
  });

  const fetchData = async () => {
    setPending(true);
    await dispatch(
      getAllOrder({
        page: page.page,
        limit: page.limit,
        status: page.status,
      })
    );
    setPending(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const orders = useSelector((state) => state.order.data);

  if (pending) return <Pending />;

  return (
    <>
      <Overview
        total={orders?.totalOrder}
        totalNew={orders?.totalNew}
        totalShip={orders?.totalShip}
        totalEquip={orders?.totalEquip}
        totalSuccess={orders?.totalSuccess}
      />
      <Header page={page} setPage={setPage} />
      {orders.status === 200 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orders?.orders?.map((od) => (
              <OrderItem od={od} key={od.order_id} />
            ))}
          </div>
          <div className="flex w-full justify-center mt-7">
            <Pagination
              defaultCurrent={1}
              current={page.page}
              defaultPageSize={20}
              total={orders.total}
              showTotal={(total) => `Tổng ${total} đơn hàng`}
              onChange={(p, l) => {
                setPage({
                  ...page,
                  page: p,
                  limit: l,
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </>
      )}
      {orders.status === 404 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
  );
};

export default Orders;
