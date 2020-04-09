import React from "react";
import SymbolsList from "./SymbolsList";
import MostActive from "./MostActive";
import History from "./History";
import { useLocation } from "react-router-dom";

function useSymbol() {
  const location = useLocation();
  return new URLSearchParams(location.search).get("symbol");
}

export default function Home() {
  const symbol = useSymbol();

  return (
    <div style={classes.home}>
      <div style={classes.list}>
        <h3>Companies</h3>
        <SymbolsList />
      </div>
      <div style={classes.chart}>
        {!symbol && (
          <div style={classes.mostActive}>
            <h3>Most Active</h3>
            <MostActive />
          </div>
        )}
        {symbol && (
          <div style={{ flex: 1, display: "flex" }}>
            <History />
          </div>
        )}
      </div>
      {/* <div
        style={{ flex: 1, display: "flex", flexDirection: "column-reverse" }}
      >
        3
      </div> */}
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
