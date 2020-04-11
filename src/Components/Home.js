import React from "react";
import SymbolsList from "./SymbolsList";
import MostActive from "./MostActive";
import History from "./History";
import { useLocation } from "react-router-dom";
import News from "./News";

function useSymbol() {
  const location = useLocation();
  return new URLSearchParams(location.search).get("symbol");
}

export default function Home() {
  const symbol = useSymbol();

  return (
    <div style={classes.home}>
      <SymbolsList />
      <div style={classes.chart}>{symbol ? <History /> : <MostActive />}</div>
      <News />
    </div>
  );
}

const classes = {
  home: {
    display: "flex",
    flex: 10,
    flexDirection: "row",
    overflow: "hidden",
  },
  chart: { flex: 3, display: "flex", flexDirection: "column" },
};
