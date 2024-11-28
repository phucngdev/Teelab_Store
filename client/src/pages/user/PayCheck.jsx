import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Result } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { checkPaymentZalopay } from "../../services/order.service";
import Pending from "../../components/user/animation/Pending";
import { getCart } from "../../services/cart.service";

const PayCheck = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [pending, setPending] = useState(true);
  const cart = useSelector((state) => state.cart.data);
  const appTransId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const apptransid = searchParams.get("apptransid");
    return apptransid;
  }, [location]);

  const fetchData = async () => {
    if (appTransId) {
      const response = await dispatch(checkPaymentZalopay(appTransId));
      setStatus(response.payload);
      dispatch(getCart());
      // window.location.reload();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (status) {
      setPending(false);
    }
  }, [appTransId, status]);

  return (
    <>
      {pending && <Pending />}
      {status && (
        <Result
          status={
            status.return_code === 1
              ? "success"
              : status.return_code === 2
              ? "error"
              : "warning"
          }
          title={status.sub_return_message}
          subTitle={
            status.return_code === 1 &&
            "Mã đơn hàng sẽ được gửi tới email của bạn, Cảm ơn bạn đã tin tưởng và ủng hộ Teelab"
          }
          extra={[
            <Button type="primary" onClick={() => navigate("/")}>
              Tiếp tục mua hàng
            </Button>,
            // <Button>Buy Again</Button>,
          ]}
        />
      )}
    </>
  );
};

export default PayCheck;
