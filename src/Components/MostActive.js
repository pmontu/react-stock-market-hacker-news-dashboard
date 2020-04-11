import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "react-charts";
import { useHistory, useLocation } from "react-router-dom";
import { qs_replace } from "./util";
import { MOST_ACTIVE_DEMO_DATA } from "./constants";
import Loading from "./Loading";

export default function MostActive() {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  let [data, setData] = useState(MOST_ACTIVE_DEMO_DATA);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://financialmodelingprep.com/api/v3/stock/actives")
      .then((res) => {
        if (!res.ok) throw Error("failed to fetch");
        return res.json();
      })
      .then(({ mostActiveStock }) => {
        const data = mostActiveStock
          .sort((a, b) => b.price - a.price)
          .reduce((data, item) => {
            data.push({
              label: item.ticker,
              data: [[0, Math.log10(parseInt(item.price))]],
            });
            return data;
          }, []);
        setIsLoading(false);
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

  return (
    <div style={classes.mostActive}>
      <h3 style={{ alignSelf: "center" }}>Most Active</h3>
      {isLoading ? <Loading /> : barChart}
    </div>
  );
}

const classes = {
  mostActive: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};
