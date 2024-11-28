import React, { useEffect, useState } from "react";
import StatisticChart from "../../components/admin/dashboard/chart/StatisticChart";
import OperatingCost from "../../components/admin/dashboard/OperatingCost";
import StatisticsOverview from "../../components/admin/dashboard/StatisticsOverview";
import ProductOverview from "../../components/admin/dashboard/ProductOverview";
import LastCustomer from "../../components/admin/dashboard/LastCustomer";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { dashboard } from "../../services/statistics.service";
import Pending from "../../components/admin/animation/Pending";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    dispatch(dashboard());
    setPending(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (pending) return <Pending />;

  return (
    <>
      <Helmet>
        <title>Tổng quan - TEELAB</title>
      </Helmet>
      <div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {/* <StatisticChart /> */}
          {/* <OperatingCost /> */}
        </div>
        {/* <StatisticsOverview /> */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
          {/* <ProductOverview /> */}
          {/* <LastCustomer /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
