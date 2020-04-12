import React from "react";
import MostActive from "./MostActive";
import History from "./History";
import { useLocation } from "react-router-dom";
import News from "./News";
import { isBrowser } from "react-device-detect";
import { SYMBOL } from "./constants";

function useSymbol() {
  const location = useLocation();
  return new URLSearchParams(location.search).get(SYMBOL);
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
