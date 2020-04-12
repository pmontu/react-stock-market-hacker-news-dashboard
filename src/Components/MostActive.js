import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";
import { useLocation } from "react-router-dom";
import { qs_replace, evalResponce, getMostActiveChartData } from "./util";
import { MOST_ACTIVE_DEMO_DATA, SYMBOL } from "./constants";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function MostActive() {
  const { search } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [mostActiveStock, setMostActiveStock] = useState([]);
  const [data, setData] = useState(MOST_ACTIVE_DEMO_DATA);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://financialmodelingprep.com/api/v3/stock/actives")
      .then(evalResponce)
      .then(({ mostActiveStock }) => {
        mostActiveStock = mostActiveStock.sort((a, b) => b.price - a.price);
        const data = getMostActiveChartData(mostActiveStock);
        setIsLoading(false);
        setData(data);
        setMostActiveStock(mostActiveStock);
      })
      .catch((e) => console.error(e));
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
    <div style={classes.mostActive}>
      <h3 style={{ alignSelf: "center" }}>Most Active Stocks</h3>
      {isLoading && <Loading />}
      {!isLoading && barChart}
      {!isLoading && mostActiveStock && (
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Company</th>
              <th>Price</th>
              <th>Change%</th>
            </tr>
          </thead>
          <tbody>
            {mostActiveStock.map((stock, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/?${qs_replace(search, SYMBOL, stock.ticker)}`}>
                    {stock.companyName || stock.ticker}
                  </Link>
                </td>
                <td className="num">{parseFloat(stock.price).toFixed(2)}</td>
                <td className="num">
                  {stock.changesPercentage.replace(/[()%]/g, "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const classes = {
  mostActive: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflow: "scroll",
  },
};
