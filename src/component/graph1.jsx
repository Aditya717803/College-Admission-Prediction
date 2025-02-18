import React from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";

const GenderBarChart = () => {
    const option1 = {
        backgroundColor: "transparent",
        title: {
          text: "Program Duration Distribution",
          left: "center",
          textStyle: {
            color: '#ac5eee' ,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        xAxis: {
          type: "category",
          data: ["1 Year", "2 Years", "3 Years", "4+ Years"],
          axisLabel: { color: "#fff" },
        },
        yAxis: {
          type: "value",
          axisLabel: { color: "#fff" },
        },
        series: [
            {
              name: "Program Duration",
              type: "bar",
              data: [120, 200, 180, 100],
              itemStyle: {
                // Create a gradient color
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: '#8c03ff' },  // Starting color
                  { offset: 1, color: '#6603ff' }   // Ending color
                ]),
              },
              animationDuration: 1000,
            },
          ],
          
      };

  const option2 = {
    title: {
      text: "Pool Dist",
      left: "center",
      textStyle: {
        color: "#9d47e1",
        fontSize: 18,
        fontWeight: "bold",
      },
      subtext: "Overview of Gender-Neutral vs Female Only Pools",
      subtextStyle: {
        color: "#666",
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: 4,
      padding: 10,
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "Pool Ratio",
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          {
            value: 100,
            name: "Gender-Neutral",
            itemStyle: { color: "#8c03ff" },
          },
          {
            value: 50,
            name: "Female-Only",
            itemStyle: { color: "#9370DB" },
          },
        ],
        animationDuration: 1000,
        label: {
          show: true,
          position: "outside",
          formatter: "{b}: {c} ({d}%)",
          color: "#333",
          fontSize: 14,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
            color: "#fff",
          },
        },
      },
    ],
  };

  return (
    <div className="flex col-span-12 overflow-hidden rounded border border-stone-300 p-4 hover:border-purple-500">
      <ReactECharts option={option1} style={{ width: "100%", height: "400px" }} />
      <ReactECharts option={option2} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default GenderBarChart;
