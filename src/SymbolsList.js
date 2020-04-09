import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { qs_replace } from "./util";

export default function SymbolsList() {
  const [symbols, setSymbols] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname, search } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://financialmodelingprep.com/api/v3/company/stock/list")
      .then((res) => {
        if (!res.ok) throw Error("failed to fetch");
        return res.json();
      })
      .then(({ symbolsList }) => {
        setIsLoading(false);
        setSymbols(symbolsList.slice(0, 100));
      });
  }, []);

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
      <ul style={{ margin: 16, padding: 0, listStyleType: "none" }}>
        {symbols.map((symbol, index, arr) => {
          const link = `${pathname}?${qs_replace(
            search,
            "symbol",
            symbol.symbol
          )}`;
          return (
            <li
              className="card"
              style={{
                padding: 10,
                marginBottom: 14,
                // borderBottom:
                //   arr.length - 1 === index ? "nonde" : "1px solid green",
              }}
              key={index}
            >
              <Link to={link}>{symbol.name || symbol.symbol}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
}
