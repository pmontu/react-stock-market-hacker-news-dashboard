import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "react-charts";
import { useHistory, useLocation } from "react-router-dom";
import { qs_replace } from "./util";

export default function MostActive() {
  const history = useHistory();
  const location = useLocation();

  let [data, setData] = useState([
    {
      label: "AB",
      data: [[0, 10]],
    },
    {
      label: "CD",
      data: [[0, 20]],
    },
    {
      label: "EF",
      data: [[0, 30]],
    },
    {
      label: "GH",
      data: [[0, 40]],
    },
    {
      label: "IJ",
      data: [[0, 50]],
    },
  ]);

  useEffect(() => {
    fetch("https://financialmodelingprep.com/api/v3/stock/actives")
      .then((res) => {
        if (!res.ok) throw Error("failed to fetch");
        return res.json();
      })
      .then(({ mostActiveStock }) => {
        const data = mostActiveStock
          .sort((a, b) => b.price - a.price)
          // .filter((item) => item.ticker !== "BRK-A")
          .reduce((data, item) => {
            data.push({
              label: item.ticker,
              data: [[0, Math.log10(parseInt(item.price))]],
            });
            return data;
          }, []);
        setData(data);
      });
  }, []);

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left", min: 0 },
    ],
    []
  );

  const handleClick = useCallback(
    (event) => {
      history.push(
        `${location.pathname}?${qs_replace(
          location.search,
          "symbol",
          event.seriesLabel
        )}`
      );
    },
    [location.pathname, location.search, history]
  );

  const BarChart = useCallback(
    () => (
      // A react-chart hyper-responsively and continuously fills the available
      // space of its parent element automatically
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Chart
          data={data}
          series={series}
          axes={axes}
          tooltip
          onClick={handleClick}
        />
      </div>
    ),
    [data, series, axes, handleClick]
  );

  return <BarChart />;
}
