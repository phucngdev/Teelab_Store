import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const datapoints = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Lượt truy cập tháng",
      data: datapoints,
      borderColor: "#5784ba",
      backgroundColor: "#5784ba",
      fill: false, // true nếu muốn lấp đầy màu dứoi đường line
      cubicInterpolationMode: "monotone",
      tension: 0.4,
      pointHoverBackgroundColor: "#ff0000",
    },
  ],
};
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Thống kê lượt truy cập",
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
        suggestedMax: 200,
      },
    },
  },
};
const ChartAccess = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    new Chart(ctx, config);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default ChartAccess;
