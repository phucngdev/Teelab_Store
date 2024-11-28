import React from "react";
import { Link } from "react-router-dom";
import logo_footer from "../../../public/logo_footer.png";
import license from "../../../public/license.png";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import facebook from "../../../public/facebook.svg";
import instagram from "../../../public/instagram.svg";
import tiktok from "../../../public/tiktok.svg";
import shopee from "../../../public/shopee.png";
import lazada from "../../../public/lazada.png";

const platform = [
  { path: "", logo: facebook },
  { path: "", logo: instagram },
  { path: "", logo: tiktok },
  { path: "", logo: shopee },
  { path: "", logo: lazada },
];
const serviceList = [
  {
    path: "/chinh-sach-mua-hang",
    text: "Chính sách mua hàng",
  },
  { path: "/chinh-sach-bao-mat", text: "Chính sách bảo mật" },
  { path: "/chinh-sach-tra-hang", text: "Chính sách trả hàng" },
  {
    path: "/chinh-sach-giao-nhan-van-chuyen-kiem-hang",
    text: "Chính sách giao nhận, vận chuyển, kiểm hàng",
  },
  { path: "/phuong-thuc-thanh-toan", text: "Phương thức thanh toán" },
];
const aboutUs = [
  { path: "/", text: "Trang chủ" },
  { path: "/tat-ca-san-pham", text: "Tất cả sản phẩm" },
  { path: "/kiem-tra-don-hang", text: "Kiểm tra đơn hàng" },
];
const Footer = () => {
  const listRoute = (arr) =>
    arr.map((item, index) => (
      <div key={index} className="mb-[15px] md:text-left">
        <Link
          to={item.path}
          className="text-sm md:text-base text-[#999999] hover:text-red-500"
        >
          {item.text}
        </Link>
      </div>
    ));

  return (
    <>
      <footer className="bg-black mt-5">
        <div className="container mx-auto flex flex-wrap justify-between py-10 text-[#999]">
          <div className="w-full md:w-full lg:w-[30%] text-[9px] px-[15px]">
            <img className="mb-[25px]" src={logo_footer} alt="" />
            <b className="text-sm">HKD Nguyễn Minh Phúc</b>
            <br />
            Giấy chứng nhận đăng ký HKD số 17A80041952 do Phòng Tài chính - Kế
            hoạch, Uỷ ban nhân dân thành phố Thái Nguyên cấp ngày 30/5/2019{" "}
            <br /> Địa chỉ: Số 235, Đường Quang Trung, Tổ 7, Phường Tân Thịnh,
            Thành phố Thái Nguyên, Tỉnh Thái Nguyên, Việt Nam <br /> Email:
            teelabvn@gmail.com <br /> Điện thoại: 0865539083
            <img className="max-w-[175px] mt-5" src={license} alt="" />
          </div>
          <div className="w-full md:w-full lg:w-[35%] px-[15px] text-center">
            <h4 className="text-base font-bold mt-1 mb-6">ĐĂNG KÝ</h4>
            <form className="relative mb-5">
              <Input
                className="ps-5 pe-[45px] h-10 rounded-none"
                placeholder="Nhập đại chỉ email"
              />
              <button className="absolute top-[3px] right-[3px] h-[34px] w-[34px] bg-[#646464] flex items-center justify-center">
                <SendOutlined className="text-white" />
              </button>
            </form>
            <p className="text-base mb-4">
              Theo dõi Teelab từ các nền tảng khác nhau nhé!
            </p>
            <div className="flex items-center gap-[9px] justify-center">
              {platform.map((item, index) => (
                <Link key={index} to={item.path}>
                  <img src={item.logo} alt="" />
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full md:w-full lg:w-[17.5%] lg:ps-[50px] px-[15px]">
            <h4 className="text-base font-bold mt-1 mb-6">ABOUT US</h4>
            {listRoute(aboutUs)}
          </div>
          <div className="w-full md:w-full lg:w-[17.5%] px-[15px]">
            <h4 className="text-base font-bold mt-1 mb-6">CHÍNH SÁCH</h4>
            {listRoute(serviceList)}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
