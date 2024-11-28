import React, { useEffect, useMemo, useState } from "react";
import ChartSales from "./chartitem/ChartSales";
import ChartAccess from "./chartitem/ChartAccess";
import { useSelector } from "react-redux";
import { Statistic } from "antd";
import CountUp from "react-countup";
import { arrowdown, arrowup } from "../StatisticsOverview";

const formatter = (value) => (
  <CountUp end={value} separator="," suffix=" VND" />
);

const StatisticChart = () => {
  const dashboard_data = useSelector((state) => state.statistics.data);

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">
            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
              <Statistic
                value={dashboard_data?.revenue?.total_revenue}
                precision={2}
                formatter={formatter}
              />
            </span>
            <h3 className="text-base font-normal text-gray-500">
              Doanh thu tháng hiện tại
            </h3>
          </div>
          <div
            className={`flex items-center justify-end flex-1 ${
              dashboard_data?.revenue?.revenue_change_percentage > 0
                ? "text-green-500"
                : "text-red-500"
            }  text-xl font-bold`}
          >
            {Math.ceil(dashboard_data?.revenue?.revenue_change_percentage)}%
            {dashboard_data?.revenue?.revenue_change_percentage > 0
              ? arrowup
              : arrowdown}
          </div>
        </div>
        {/* <ChartSales /> */}
        {/* <ChartAccess /> */}
      </div>
    </>
  );
};

export default StatisticChart;
