import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";
import { HISTORY_DEMO_DATA } from "./constants";
import Loading from "./Loading";
import { useSymbol } from "./hooks";

export default function History() {
  const symbol = useSymbol();
  let [data, setData] = useState(HISTORY_DEMO_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbol) {
      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=5`;
      setLoading(true);
      fetch(url)
        .then((res) => {
          if (!res.ok) throw Error("failed to fetch");
          return res.json();
        })
        .then(({ historical }) => {
          const data = ["open", "high", "low", "close"].map((key) => ({
            label: key,
            data: historical.map((h) => [h.date, h[key]]),
          }));
          setLoading(false);
          setData(data);
        });
    } else {
      setData(HISTORY_DEMO_DATA);
    }
  }, [symbol]);

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

  const handleClick = (event) => {
    console.log(event);
  };

  const barChart = (
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
  );

  return loading ? (
    <Loading />
  ) : (
    <>
      <h3 style={{ alignSelf: "center" }}>{`${symbol} History`}</h3>
      {barChart}
    </>
  );
}
