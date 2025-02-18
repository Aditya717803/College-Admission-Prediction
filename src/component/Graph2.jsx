import React from "react";
import ReactECharts from "echarts-for-react";

const CutoffPercentageChart = () => {
  const options = {
    backgroundColor: "",
    title: {
      text: "Cutoff Percentage Distribution",
      left: "center",
      textStyle: {
        color: "#906cad",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "category",
      data: ["50-60%", "60-70%", "70-80%", "80-90%", "90-100%"],
      axisLabel: { color: "#fff" },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#fff" },
    },
    series: [
      {
        name: "Cutoff Percentage",
        type: "line",
        data: [50, 120, 180, 220, 150],
        itemStyle: {
          color: "#8c03ff",
        },
        animationDuration: 1000,
      },
    ],
  };

  return (
    <div className="col-span-12 overflow-hidden rounded border border-stone-300 p-4">
      <ReactECharts option={options} />
    </div>
  );
};

export default CutoffPercentageChart;
