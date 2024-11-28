import React, { useMemo, useState } from "react";
import AddressSelector from "../../components/user/pay/AddressSelector";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Result, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import logo_vnpay from "../../../public/logo-vnpay.svg";
import logo_zalopay from "../../../public/zalopay.png";
import { createOrder, createZalopay } from "../../services/order.service";
import { Helmet } from "react-helmet";
import Pending from "../../components/user/animation/Pending";

const { TextArea } = Input;

const Pay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.infoUser);

  const cart = useSelector((state) => state.cart.data);
  const [parentAddressSelect, setParentAddressSelect] = useState({
    city: "",
    district: "",
    ward: "",
  });
  const [payments, setPayments] = useState(null);
  const [statusOrder, setStatusOrder] = useState(false);
  const [pending, setPending] = useState(false);

  const total_amount = useMemo(() => {
    return cart?.items?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const totalCount = useMemo(() => {
    return cart?.items?.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const order_items = useMemo(() => {
    return cart?.items?.map((item) => ({
      color_size_id: item.color_size.color_size_id,
      product_id: item.product.product_id,
      quantity: +item.quantity,
      price: +item.product.price,
    }));
  }, [cart]);

  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      email: "",
      address: "",
      note: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Tên không được để trống"),
      phone: Yup.string()
        .matches(
          /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
          "Số điện thoại không hợp lệ"
        )
        .required("Số điện thoại không được để trống"),
      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không hợp lệ"
        )
        .required("Email không được để trống"),
      address: Yup.string().required("Địa chỉ không được để trống"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (
        parentAddressSelect.city === "" ||
        parentAddressSelect.district === "" ||
        parentAddressSelect.ward === ""
      ) {
        message.warning("Vui lòng chọn địa chỉ nhận hàng");
        return;
      }
      if (!payments) {
        message.warning("Vui lòng chọn phương thức thanh toán");
        return;
      }
      setPending(true);
      const data = {
        user_id: user.user_id,
        total: total_amount + 20000,
        username: values.username,
        transaction: payments,
        address: values.address,
        city: parentAddressSelect.city,
        district: parentAddressSelect.district,
        ward: parentAddressSelect.ward,
        phone: values.phone,
        email: values.email,
        note: values.note,
        order_items: order_items,
        status: 0,
        cart_id: cart.cart_id,
      };
      if (payments === "zalopay") {
        try {
          const response = await dispatch(createZalopay(data));
          if (response.payload.order_url) {
            window.location.href = response.payload.order_url;
          }
        } catch (error) {
          message.error(error.message);
        }
      } else if (payments === "normal") {
        try {
          const response = await dispatch(createOrder(data));
          if (response.payload.status === 201) {
            setStatusOrder(true);
          }
        } catch (error) {
          message.error(error.message);
        }
      }
      setPending(false);
    },
  });

  const listItem = cart?.items?.map((item) => (
    <div
      key={item.cart_item_id}
      className="border border-gray-500 rounded-lg p-2 flex gap-3 items-center justify-between mb-2"
    >
      <img src={item.product.thumbnail} alt="" className="w-10 h-10" />
      <div className="flex flex-1 justify-between items-center">
        <div className="flex flex-col max-w-[80%]">
          <b className="text-sm">{item.product.product_name}</b>
          <p className="font-bold text-xs text-[#969696]">
            {item.color_size.color_name}/{item.color_size.size_name}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">{formatPrice(item.product.price)}</p>
          <p className="text-sm">x{item.quantity}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <Helmet>
        <title>Đặt hàng | TEELAB</title>
      </Helmet>
      {pending && <Pending />}
      {statusOrder ? (
        <Result
          status="success"
          title="Đặt hàng thành công"
          subTitle="Mã đơn hàng sẽ được gửi tới email của bạn, Cảm ơn bạn đã tin tưởng và ủng hộ Teelab"
          extra={[
            <Button
              type="primary"
              onClick={() => {
                setStatusOrder(false);
                navigate("/");
              }}
            >
              Tiếp tục mua hàng
            </Button>,
            <Button>Buy Again</Button>,
          ]}
        />
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="container px-2 m:px-0 mx-auto mt-[50px] md:mt-3 flex flex-col lg:flex-row"
        >
          <main className="lg:w-[65%] ps-0 md:p-[28px] pt-3">
            <div className="flex flex-col lg:flex-row justify-between gap-[28px] ">
              <div className="lg:w-[50%]">
                <h3 className="font-semibold text-xl mb-2">
                  Thông tin nhận hàng
                </h3>
                <div className="mb-[6px]">
                  <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className="text-[13px] mt-3 border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Họ và tên"
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className="mb-[6px]">
                  <input
                    type="text"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="text-[13px] mt-3 border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Số điện thoại"
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
                <div className="mb-[6px]">
                  <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="text-[13px] mt-3 border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="mb-[6px]">
                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className="text-[13px] mt-3 border border-gray-200 w-full h-[38px] px-2"
                    placeholder="Địa chỉ"
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.address}
                    </div>
                  ) : null}
                </div>
                <AddressSelector
                  parentAddressSelect={parentAddressSelect}
                  setParentAddressSelect={setParentAddressSelect}
                />
                <TextArea
                  showCount
                  maxLength={100}
                  name="note"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  placeholder="Ghi chú"
                  style={{
                    height: 100,
                    resize: "none",
                    marginTop: 12,
                  }}
                />
              </div>
              <div className="lg:w-[50%]">
                <h3 className="font-semibold text-xl mb-2">Vận chuyển</h3>
                <div className="border border-gray-500 rounded-lg p-3 flex gap-3 items-center justify-between">
                  <div className="flex flex-1 justify-between items-center">
                    <p>Giao hàng thông thường</p>
                    <b>20.000đ</b>
                  </div>
                </div>
                <h3 className="font-semibold text-xl mt-5 md:mt-3 mb-2">
                  Thanh toán
                </h3>
                <label
                  for="normal"
                  onClick={() => setPayments("normal")}
                  className="border border-gray-500 rounded-lg p-3 flex gap-3"
                >
                  <input
                    type="radio"
                    id="normal"
                    checked={payments === "normal" ? true : false}
                  />
                  <p>Thanh toán khi nhận hàng</p>
                </label>
                <label
                  for="vnpay"
                  onClick={() => setPayments("vnpay")}
                  className="border border-gray-500 rounded-lg p-3 mt-2 flex gap-3 items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="vnpay"
                      checked={payments === "vnpay" ? true : false}
                    />
                    <p>Thanh toán bằng vnpay</p>
                  </div>
                  <img src={logo_vnpay} alt="" className="w-10 object-cover" />
                </label>
                <label
                  for="zalopay"
                  onClick={() => setPayments("zalopay")}
                  className="border border-gray-500 rounded-lg p-3 mt-2 flex gap-3 items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="zalopay"
                      checked={payments === "zalopay" ? true : false}
                    />
                    <p>Thanh toán bằng zalopay</p>
                  </div>
                  <img
                    src={logo_zalopay}
                    alt=""
                    className="w-10 object-cover"
                  />
                </label>
              </div>
            </div>
          </main>
          <aside className=" bg-[#fafafa] md:px-[28px] pt-3 mt-5 md:mt-0 md:border-l border-gray-300">
            <h3 className="font-semibold text-xl mb-2">
              Đơn hàng ({totalCount} sản phẩm)
            </h3>
            <div className="max-h-[300px] overflow-scroll">{listItem}</div>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center pt-3 mt-3 border-t-[1px] border-gray-300">
              <Input
                placeholder="Nhập mã giảm giá"
                className="py-3 w-full md:w-3/5"
              />
              <button
                type="button"
                className="flex-1 w-full px-6 py-3 bg-slate-700 rounded-md text-white hover:opacity-70"
              >
                Áp dụng
              </button>
            </div>
            <div className="flex flex-col gap-1 my-3 py-3 border-b-[1px] border-t-[1px] border-gray-300">
              <div className="flex justify-between items-center ">
                <p className="text-[#717171]">Tạm tính</p>
                <p className="text-[#717171]">{formatPrice(total_amount)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[#717171]">Phí vận chuyển</p>
                <p className="text-[#717171]">20.000 đ</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#717171] text-lg">Tổng cộng</p>
              <p className="font-bold text-xl">
                {formatPrice(total_amount + 20000)}
              </p>
            </div>
            <div className="flex gap-3 justify-between items-center mt-3 pt-3 border-t-[1px] border-gray-300">
              <Link
                to="/gio-hang"
                className="text-base flex gap-1 items-center"
              >
                Quay về giỏ hàng
              </Link>
              <button
                type="submit"
                disabled={pending}
                className="px-5 py-3 bg-black text-white rounded-md hover:opacity-70"
              >
                ĐẶT HÀNG
              </button>
            </div>
          </aside>
        </form>
      )}
    </>
  );
};

export default Pay;
