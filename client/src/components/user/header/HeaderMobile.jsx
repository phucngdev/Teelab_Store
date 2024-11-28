import {
  MenuOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Drawer, Modal, Input, Popover } from "antd";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../../services/product.service";
import _debounce from "lodash/debounce";
import SearchListMobile from "./SearchListMobile";
import SearchEmpty from "./SearchEmpty";
import DrawerMobile from "./DrawerMobile";
import { useDebounce } from "../../../hooks/useDebounce";

const HeaderMobile = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);
  const searchProducts = useSelector((state) => state.product.dataSearch);
  const user = useSelector((state) => state.user.infoUser);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (search !== "") {
      dispatch(searchProduct(debouncedSearch));
    }
  }, [debouncedSearch]);

  // drawer nav
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // modal search
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Tìm kiếm"
        open={isModalOpen}
        onCancel={handleCancel}
        className="top-4"
        footer={false}
      >
        <Input
          placeholder="Tìm kiếm sản phẩm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />
        {searchProducts && search ? (
          <SearchListMobile
            searchProducts={searchProducts}
            setIsModalOpen={setIsModalOpen}
            setSearch={setSearch}
          />
        ) : (
          <SearchEmpty />
        )}
      </Modal>

      <div className="w-full h-[46px] flex items-center fixed top-0 py-[5px] px-2 md:hidden bg-[#f5f5f5] z-[99]">
        <div className="container relative flex justify-between items-center">
          <Button
            className="border-0 rotate-[180deg]"
            variant="primary"
            onClick={showDrawer}
          >
            <MenuOutlined />
          </Button>
          <Drawer title="Teelab" placement="left" onClose={onClose} open={open}>
            <DrawerMobile onClose={onClose} />
          </Drawer>
          <div className="w-[150px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <SearchOutlined
              onClick={showModal}
              className="p-2 active:bg-white rounded-md"
            />
            {user ? (
              <Popover
                content={
                  <div className="flex items-center gap-3">
                    <Link to="/gio-hang">
                      <Badge count={cart?.items?.length}>
                        <Avatar
                          shape="square"
                          icon={<ShoppingCartOutlined />}
                        />
                      </Badge>
                    </Link>
                    <Link to="#">
                      <Avatar shape="square" icon={<SettingOutlined />} />
                    </Link>
                  </div>
                }
                // title="Title"
                trigger="click"
              >
                <button>
                  <Avatar className="bg-[#87d068]" icon={<UserOutlined />} />
                </button>
              </Popover>
            ) : (
              <Popover
                content={
                  <div className="flex flex-col gap-3">
                    <Link to="/dang-nhap">Đăng nhập</Link>
                    <Link to="/dang-ky">Đăng ký</Link>
                  </div>
                }
                // title="Title"
                trigger="click"
              >
                <button>
                  <Avatar className="bg-[#87d068]" icon={<UserOutlined />} />
                </button>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
