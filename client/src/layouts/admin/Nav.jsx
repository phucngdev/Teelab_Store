import React, { memo, useEffect, useState } from "react";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";
import {
  AuditOutlined,
  BarsOutlined,
  BgColorsOutlined,
  LayoutOutlined,
  ProductOutlined,
  QuestionCircleOutlined,
  ScissorOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import { searchGlobal } from "../../services/search.service";

const { Search } = Input;
const Nav = memo(({ user }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (search !== "") {
      dispatch(searchGlobal(debouncedSearch));
    }
  }, [debouncedSearch]);

  const dataSearch = useSelector((state) => state.search.data);

  return (
    <>
      <nav className="fixed top-0 right-0 bg-white border-b border-gray-200 z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-11 justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                <BarsOutlined className="size-6 text-2xl" />
              </button>
              <Link to="/admin/dashboard" className="px-2">
                <img src={logo} alt="" />
              </Link>
              <form className="hidden lg:block relative">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="mt-1 relative lg:w-96">
                  <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                    placeholder="Tìm kiếm"
                  />
                </div>
                {search && dataSearch.length > 0 && (
                  <div className="absolute top-full bg-white z-50 w-full p-2 cursor-pointer shadow-xl rounded-lg">
                    {dataSearch.map((item, index) => (
                      <div className="flex items-start gap-4 px-2 py-3 hover:bg-gray-100">
                        {item.table_name === "products" && (
                          <>
                            <ProductOutlined />{" "}
                            <Link to={``} key={index} className="text-sm">
                              {item.result_value}
                            </Link>
                          </>
                        )}
                        {item.table_name === "categories" && (
                          <>
                            <LayoutOutlined />
                            <Link
                              to="/admin/quan-ly-danh-muc"
                              key={index}
                              className="text-sm"
                            >
                              {item.result_value}
                            </Link>
                          </>
                        )}
                        {item.table_name === "users" && (
                          <>
                            <UserOutlined />
                            <Link
                              to={`/admin/cham-soc-khach-hang/${item.path}`}
                              key={index}
                              className="text-sm"
                            >
                              {item.result_value}
                            </Link>
                          </>
                        )}
                        {item.table_name === "orders" && (
                          <>
                            <ShoppingCartOutlined />
                            <Link
                              to={`/admin/don-hang/${item.path}`}
                              key={index}
                              className="text-sm"
                            >
                              {item.result_value}
                            </Link>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
            <div className="flex items-center">
              <button
                id="toggleSidebarMobileSearch"
                type="button"
                className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="hidden lg:flex items-center gap-3 text-gray-500">
                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-800">
                  <AuditOutlined />
                  <p>Góp ý</p>
                </div>
                <div className="flex items-center gap-2 px-3 border-x cursor-pointer hover:text-gray-800">
                  <QuestionCircleOutlined />
                  <p>Trợ giúp & hỗ trợ</p>
                </div>
                <span className="text-base font-normal">
                  {user?.username} - TeelabStudio
                </span>
                <div className="w-10 h-10">
                  {user && user.avatar ? (
                    <Avatar
                      src={user.avatar}
                      className="w-full h-full rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <Avatar className="w-full h-full bg-[#fde3cf] text-[#f56a00] text-lg cursor-pointer rounded-full object-cover">
                      {user?.username[0]}
                    </Avatar>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

export default Nav;
