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
      <div style={classes.list}>
        <h3 style={{ alignSelf: "center" }}>Companies</h3>
        <SymbolsList />
      </div>
      <div style={classes.chart}>
        {!symbol && (
          <div style={classes.mostActive}>
            <h3 style={{ alignSelf: "center" }}>Most Active</h3>
            <MostActive />
          </div>
        )}
        {symbol && (
          <div style={{ flex: 1, display: "flex" }}>
            <History />
          </div>
        )}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "scroll",
          flexDirection: "column",
        }}
      >
        <News />
      </div>
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
  list: {
    display: "flex",
    flex: 1,
    overflow: "scroll",
    flexDirection: "column",
  },
  chart: { flex: 3, display: "flex", flexDirection: "column" },
  mostActive: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};
