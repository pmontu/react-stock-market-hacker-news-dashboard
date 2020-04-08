import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

export default function SymbolsList() {
  const [symbols, setSymbols] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://financialmodelingprep.com/api/v3/company/stock/list")
      .then((res) => {
        if (!res.ok) throw Error("failed to fetch");
        return res.json();
      })
      .then(({ symbolsList }) => {
        setIsLoading(false);
        setSymbols(symbolsList);
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
        {symbols.map((symbol, index, arr) => (
          <li
            style={{
              padding: 10,
              borderBottom:
                arr.length - 1 === index ? "nonde" : "1px solid green",
            }}
            key={index}
          >
            {symbol.name || symbol.symbol}
          </li>
        ))}
      </ul>
    );
  }
}
