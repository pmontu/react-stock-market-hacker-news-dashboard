import React from "react";
import Company from "./Company";
import MostActive from "./MostActive";
import History from "./History";
import { useLocation } from "react-router-dom";
import News from "./News";

function useSymbol() {
  const location = useLocation();
  return new URLSearchParams(location.search).get("symbol");
}

export default function Home() {
  return (
    <div style={classes.home}>
      <Company />
      <Chart />
      <News />
    </div>
  );
}

function Chart() {
  const symbol = useSymbol();

  return (
    <div style={classes.chart}>{symbol ? <History /> : <MostActive />}</div>
  );
}

const classes = {
  home: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  chart: { flex: 3, display: "flex", flexDirection: "column" },
};
