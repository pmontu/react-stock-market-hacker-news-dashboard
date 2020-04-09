import React, { useEffect, useState, useCallback } from "react";
import { CircularProgress } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { qs_replace } from "./util";
import Button from "@material-ui/core/Button";

export default function SymbolsList() {
  const [symbols, setSymbols] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname, search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://financialmodelingprep.com/api/v3/company/stock/list")
      .then((res) => {
        if (!res.ok) throw Error("failed to fetch");
        return res.json();
      })
      .then(({ symbolsList }) => {
        setIsLoading(false);
        setSymbols(symbolsList.splice(0, 100));
      });
  }, []);

  const handleClick = useCallback(
    (symbol) => {
      const link = `${pathname}?${qs_replace(search, "symbol", symbol)}`;
      history.push(link);
    },
    [pathname, search, history]
  );

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  else {
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
}
