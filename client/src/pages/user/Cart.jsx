import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import { message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCart } from "../../services/cart.service";
import CartItem from "../../components/user/cart/CartItem";
import CartEmpty from "../../components/user/cart/CartEmpty";
import CartBottom from "../../components/user/cart/CartBottom";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.infoUser);
  const cart = useSelector((state) => state.cart.data);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [cartItemDelete, setCartItemDelete] = useState(null);

  const showModal = (id) => {
    setIsOpenModalDelete(true);
    setCartItemDelete(id);
  };

  const handleOk = async () => {
    const response = await dispatch(deleteCartItem(cartItemDelete));
    if (response.payload.status === 200) {
      message.success("Xoá thành công");
      await dispatch(getCart());
    } else {
      message.error("Xoá thất bại");
    }
    setIsOpenModalDelete(false);
  };
  const handleCancel = () => {
    setIsOpenModalDelete(false);
  };

  return (
    <>
      <Helmet>
        <title>TEELAB - Giỏ hàng</title>
      </Helmet>
      <Modal
        title="Xác nhận xoá sản phẩm"
        open={isOpenModalDelete}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={<p className="text-white">Xác nhận xoá</p>}
        cancelText="Huỷ"
        okButtonProps={{ style: { background: "#ff0000" } }}
      >
        <p>Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?</p>
      </Modal>
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="text-2xl font-light my-4">Giỏ hàng của bạn</h2>
        <div className="border border-[#ebebeb] p-[7px]">
          <div className="grid grid-cols-12 pb-[7px] border-b">
            <div className="font-bold col-span-6">Thông tin sản phẩm</div>
            <div className="font-bold text-center col-span-2 hidden md:block">
              Đơn giá
            </div>
            <div className="font-bold text-center col-span-2 hidden md:block">
              Số lượng
            </div>
            <div className="font-bold text-center col-span-2 hidden md:block">
              Thành tiền
            </div>
          </div>
          {cart?.items?.length > 0 ? (
            <>
              {cart?.items?.map((item) => (
                <CartItem
                  item={item}
                  key={item.cart_item_id}
                  cart_id={cart.cart_id}
                  showModal={showModal}
                />
              ))}
            </>
          ) : (
            <CartEmpty />
          )}
        </div>
        <CartBottom cart={cart} />
      </div>
    </>
  );
};

export default Cart;
