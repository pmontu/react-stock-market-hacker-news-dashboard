import React from "react";
import MostActive from "./MostActive";
import History from "./History";
import { useLocation } from "react-router-dom";
import News from "./News";
import { isBrowser } from "react-device-detect";

function useSymbol() {
  const location = useLocation();
  return new URLSearchParams(location.search).get("symbol");
}

export default function Home() {
  const symbol = useSymbol();

  return (
    <div style={classes.home}>
      {!symbol ? <MostActive /> : <History />}
      {isBrowser && <News />}
    </div>
  );
}

const classes = {
  home: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
};
