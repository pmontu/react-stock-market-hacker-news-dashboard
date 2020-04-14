import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";
import Loading from "./Loading";

import DynamicList, { createCache } from "react-window-dynamic-list";
import AutoSizer from "react-virtualized-auto-sizer";

import { qs_replace, evalResponce } from "./util";
import { SYMBOL } from "./constants";

const cache = createCache();

const App = () => {
  const [symbols, setSymbols] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const history = useHistory();

  const handleClick = useCallback(
    (symbol) => {
      const link = `/?${qs_replace(search, SYMBOL, symbol)}`;
      history.push(link);
    },
    [search, history]
  );

  useEffect(() => {
    setIsLoading(true);
    fetch("https://financialmodelingprep.com/api/v3/company/stock/list")
      .then(evalResponce)
      .then(({ symbolsList }) => {
        setIsLoading(false);
        setSymbols(symbolsList.map((cmp, idx) => ({ ...cmp, id: idx })));
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div style={classes.list}>
      <h3 style={{ alignSelf: "center" }}>Companies</h3>
      {isLoading ? (
        <Loading />
      ) : (
        <AutoSizer>
          {({ height, width }) => (
            <DynamicList
              cache={cache}
              data={symbols}
              width={width}
              height={height}
            >
              {({ index, style }) => (
                <div style={style}>
                  <Button
                    key={index}
                    onClick={() => handleClick(symbols[index].symbol)}
                    fullWidth={true}
                    variant="contained"
                    style={{ marginBottom: 14 }}
                  >
                    {symbols[index].name || symbols[index].symbol}
                  </Button>
                </div>
              )}
            </DynamicList>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

const classes = {
  list: {
    display: "flex",
    flex: 1,
    overflow: "scroll",
    flexDirection: "column",
  },
};

export default App;
