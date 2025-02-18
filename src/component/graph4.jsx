import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts"; // <-- Import echarts here

const CategoryLineBarChart = () => {
  const option = {
    backgroundColor: "transparent",
    title: {
      text: "",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Bar Data", "Line Data"],
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      type: "category",
      data: ["GEN", "OBC-NCL", "SC", "ST", "GEN-EWS", "GEN-PWD", "OBC-NCL-PWD", "GEN-EWS-PWD","SC-PWD","ST-PWD"],
      axisLabel: {
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "Bar Data",
        type: "bar",
        data: [12476, 12184, 12006, 10527, 9760, 3717, 1896, 605, 502, 203],
        itemStyle: {
          // Adding gradient to the bars
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#8c03ff' }, // Start color (left)
            { offset: 1, color: "#6603ff" }, // End color (right)
          ]),
        },
        animationDuration: 500,
      },
      {
        name: "Line Data",
        type: "line",
        data: [12476, 12184, 12006, 10527, 9760, 3717, 1896, 605, 502, 203],
        color: "#FFCC00", // Line color will remain solid yellow
        smooth: true,
        lineStyle: {
          // Adding gradient to the line
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#FFCC00" }, // Start color (left)
            { offset: 1, color: "#FF6347" }, // End color (right)
          ]),
          width: 4, // Line width
        },
      },
    ],
  };

  return (
    <div className="col-span-12 overflow-hidden rounded border border-stone-300 p-4">
      <ReactECharts option={option} style={{ height: "500px" }} />
    </div>
  );
};

export default CategoryLineBarChart;