import React from "react";
import { Chart } from "react-charts";

export default function MostActive() {
  const data = React.useMemo(
    () => [
      {
        label: "ABC",
        data: [
          [0, 1],
          [1, 20],
          [2, 4],
          [3, 10],
          [4, 7],
        ],
      },
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  const lineChart = (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Chart data={data} series={series} axes={axes} tooltip />
    </div>
  );

  return lineChart;
}
