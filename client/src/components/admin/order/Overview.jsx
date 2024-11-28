import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CarOutlined,
  CheckSquareOutlined,
  DropboxOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { arrowdown, arrowup } from "../dashboard/StatisticsOverview";

const Overview = ({ total, totalNew, totalShip, totalEquip, totalSuccess }) => {
  return (
    <>
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {total || 0}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Tổng số đơn hàng
              </h3>
            </div>
            <div
              className={`ml-5 w-0 flex items-center justify-end flex-1 ${
                1 > 0 ? " text-green-500 " : " text-red-500 "
              } text-base font-bold`}
            >
              <ShoppingCartOutlined className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {totalNew || 0}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Đơn hàng mới
              </h3>
            </div>
            <div
              className={`ml-5 w-0 flex items-center justify-end flex-1 ${
                300 > 0 ? " text-green-500 " : " text-red-500 "
              } text-base font-bold`}
            >
              <ProductOutlined className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {totalEquip || 0}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Đang chuẩn bị
              </h3>
            </div>
            <div
              className={`ml-5 w-0 flex items-center justify-end flex-1 ${
                300 > 0 ? " text-green-500 " : " text-red-500 "
              } text-base font-bold`}
            >
              <DropboxOutlined className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {totalShip || 0}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Đơn hàng đang giao
              </h3>
            </div>
            <div
              className={`ml-5 w-0 flex items-center justify-end flex-1 ${
                300 > 0 ? " text-green-500 " : " text-red-500 "
              } text-base font-bold`}
            >
              <TruckOutlined className="text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
