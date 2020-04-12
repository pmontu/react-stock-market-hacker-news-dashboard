import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";
import { HISTORY_DEMO_DATA } from "./constants";
import Loading from "./Loading";
import { useSymbol } from "./hooks";
import { evalResponce } from "./util";

export default function History() {
  const symbol = useSymbol();
  let [data, setData] = useState(HISTORY_DEMO_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbol) {
      const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=5`;
      setLoading(true);
      fetch(url)
        .then(evalResponce)
        .then(({ historical }) => {
          const data = ["open", "high", "low", "close"].map((key) => ({
            label: key,
            data: historical.map((h) => [h.date, h[key]]),
          }));
          setLoading(false);
          setData(data);
        })
        .catch((e) => console.error(e));
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

  const barChart = (
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

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {!loading ? (
        <>
          <h3 style={{ alignSelf: "center" }}>{`${symbol} History`}</h3>
          {barChart}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
