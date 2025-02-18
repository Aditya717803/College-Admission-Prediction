import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts"; // <-- Import echarts here

const ProgramBarRace = () => {
  const [data, setData] = useState([
    { name: "CSE", value: 8355 },
    { name: "Mechanical", value: 6573 },
    { name: "Civil ", value: 6223 },
    { name: "Electrical", value: 5687 },
    { name: "ECS", value: 4700 },
    { name: "Chemical", value: 4408 },
    { name: "Metallurgical ", value: 2043 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          value: item.value + Math.floor(Math.random() * 10),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const options = {
    backgroundColor: "transparent",
    title: {
      text: "Program Popularity Race",
      left: "center",
      textStyle: {
        color: "#9881ab ",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "value",
      axisLabel: { color: "#fff" },
    },
    yAxis: {
      type: "category",
      data: data.map((d) => d.name),
      axisLabel: { color: "#fff" },
    },
    series: [
      {
        name: "Popularity",
        type: "bar",
        data: data.map((d) => d.value),
        itemStyle: {
          // Adding gradient to the bars
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#8c03ff' }, // Start color (left)
            { offset: 1, color: "#6603ff" }, // End color (right)
          ]),
        },
        animationDuration: 500,
      },
    ],
  };

  return (
    <div className="col-span-12 overflow-hidden rounded border border-stone-300 p-4">
      <ReactECharts option={options} style={{ height: "400px" }} />
    </div>
  );
};

export default ProgramBarRace;
