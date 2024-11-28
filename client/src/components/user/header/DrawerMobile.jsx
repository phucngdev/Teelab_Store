import {
  CheckSquareOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  ProductOutlined,
  SkinOutlined,
  TableOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DrawerMobile = ({ onClose }) => {
  const categorys = useSelector((state) => state.category.data);

  return (
    categorys && (
      <>
        <ul className="text-base ps-3 sm:text-2xl">
          <li className="my-[5px] flex items-center gap-2 py-1">
            <HomeOutlined />
            <Link onClick={() => onClose()} to="/">
              Trang chủ
            </Link>
          </li>
          <li className="my-[5px] flex items-center gap-2 py-1">
            <ProductOutlined />
            <Link onClick={() => onClose()} to="/tat-ca-san-pham">
              Tất cả sản phẩm
            </Link>
          </li>
          {categorys.map((c) => (
            <li
              key={c.category_id}
              className="my-[5px] flex items-center gap-2 ms-7 py-1"
            >
              <SkinOutlined />
              <Link onClick={() => onClose()} to={`/${c.path}`}>
                <p>{c.category_name}</p>
              </Link>
            </li>
          ))}
          <li className="my-[5px] flex items-center gap-2 py-1">
            <UndoOutlined />
            <Link onClick={() => onClose()} to="/chinh-sach-doi-tra">
              Chính sách Đổi trả
            </Link>
          </li>
          <li className="my-[5px] flex items-center gap-2 py-1">
            <TableOutlined />
            <Link onClick={() => onClose()} to="/bang-size">
              Bảng Size
            </Link>
          </li>
          <li className="my-[5px] flex items-center gap-2 py-1">
            <CheckSquareOutlined />
            <Link onClick={() => onClose()} to="/kiem-tra-don-hang">
              Kiểm tra đơn hàng
            </Link>
          </li>
          <li className="my-[5px] flex items-center gap-2 py-1">
            <EnvironmentOutlined />
            <Link onClick={() => onClose()} to="/he-thong-cua-hang">
              Hệ thống Cửa hàng
            </Link>
          </li>
        </ul>
      </>
    )
  );
};

export default DrawerMobile;
