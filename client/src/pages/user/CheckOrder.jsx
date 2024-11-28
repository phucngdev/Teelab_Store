import React, { useState } from "react";
import { Button, Carousel } from "antd";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckOrder = () => {
  const navigate = useNavigate();
  const [idOrder, setIdOrder] = useState("");

  const handleChangeIdOrder = (e) => {
    setIdOrder(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Kiểm tra đơn hàng | TEELAB</title>
      </Helmet>
      <div className="container mt-[50px] md:mt-0 mx-auto px-2 md:p-6 md:flex gap-3">
        <div className="w-full md:w-[30%] md:px-[15px] rounded-md shadow-lg ">
          <h5 className=" text-[#333] text-xl font-medium pt-4">
            Kiểm tra đơn hàng
          </h5>
          <hr className="my-[18px] border-t-2" />
          <form className="w-full flex flex-col gap-2 mx-auto">
            <h3>Nhập mã đơn hàng</h3>
            <input
              className="px-3 py-1 rounded-md my-2 border"
              type="text"
              placeholder="Nhập tại đây..."
              value={idOrder}
              onChange={handleChangeIdOrder}
            />
            <Button
              className="mb-4 bg- rounded-md bg-blue-600 hover:bg-blue-500"
              type="button"
              onClick={() => navigate(`/kiem-tra-don-hang/${idOrder}`)}
            >
              <span className="text-[13px] text-white font-normal text-center">
                Kiểm tra
              </span>
            </Button>
          </form>
        </div>
        <div className="flex-1 h-full overflow-hidden">
          <Carousel autoplay>
            <div>
              <img
                src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_3.jpg?1705474695254"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_4.jpg?1705474695254"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_5.jpg?1705474695254"
                alt=""
              />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CheckOrder;
