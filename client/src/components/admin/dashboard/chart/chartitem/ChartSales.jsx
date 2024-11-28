import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const ChartSales = () => {
  const canvasRefSales = useRef(null);
  const chartInstanceRef = useRef(null);
  const dashboard_data = useSelector((state) => state.statistics.data);
  const [datapoints, setDatapoints] = useState([]);
  const [max, setMax] = useState();

  const labels = useMemo(() => {
    return dashboard_data.monthly_revenue?.map((m) => m.month);
  }, [dashboard_data]);

  const getMaxTotalRevenue = () => {
    let maxRevenue = 0;
    dashboard_data.monthly_revenue?.forEach((point) => {
      if (+point.total_revenue > maxRevenue) {
        maxRevenue = +point.total_revenue;
      }
    });
    return maxRevenue;
  };

  useEffect(() => {
    if (dashboard_data) {
      const maxRevenue = getMaxTotalRevenue();
      setMax(maxRevenue);
      const totalRevenues = dashboard_data.monthly_revenue?.map(
        (point) => +point.total_revenue
      );
      setDatapoints(totalRevenues);
    }
  }, [dashboard_data]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (canvasRefSales.current && datapoints?.length > 0) {
      const ctx = canvasRefSales.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Doanh thu theo tháng",
              data: datapoints,
              borderColor: "#28a745",
              backgroundColor: "#28a745",
              fill: false, // true nếu muốn lấp đầy màu dưới đường line
              cubicInterpolationMode: "monotone",
              tension: 0.4,
              pointHoverBackgroundColor: "#ff0000",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Thống kê doanh thu",
            },
          },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
              },
            },
            y: {
              display: true,
              title: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: max,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [datapoints, max]);

  return <canvas ref={canvasRefSales}></canvas>;
};

export default ChartSales;
