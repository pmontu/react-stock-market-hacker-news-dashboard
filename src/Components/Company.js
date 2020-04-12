import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { qs_replace, evalResponce } from "./util";
import Button from "@material-ui/core/Button";
import Loading from "./Loading";
import { SYMBOL } from "./constants";

export default function Company() {
  const [symbols, setSymbols] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://financialmodelingprep.com/api/v3/company/stock/list")
      .then(evalResponce)
      .then(({ symbolsList }) => {
        setIsLoading(false);
        setSymbols(symbolsList.splice(0, 100));
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div style={classes.list}>
      <h3 style={{ alignSelf: "center" }}>Companies</h3>
      {isLoading ? <Loading /> : <Symbols symbols={symbols} />}
    </div>
  );
}

function Symbols({ symbols }) {
  const { search } = useLocation();
  const history = useHistory();

  const handleClick = useCallback(
    (symbol) => {
      const link = `/?${qs_replace(search, SYMBOL, symbol)}`;
      history.push(link);
    },
    [search, history]
  );
  return (
    <div className="cards">
      <ul style={{ margin: 16, padding: 0, listStyleType: "none" }}>
        {symbols.map((symbol, index, arr) => {
          return (
            <li key={index}>
              <Button
                key={index}
                onClick={() => handleClick(symbol.symbol)}
                fullWidth={true}
                variant="contained"
                style={{ marginBottom: 14 }}
              >
                {symbol.name || symbol.symbol}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const classes = {
  list: {
    display: "flex",
    flex: 1,
    overflow: "scroll",
    flexDirection: "column",
  },
};
