import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ITEM, ASK, SYMBOL, PRODUCTION } from "./constants";
import ReactGA from "react-ga";
ReactGA.initialize("UA-163560940-1");

export function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    if (PRODUCTION) {
      const url = `${location.pathname}${location.search}`;
      ReactGA.pageview(url);
    }
  }, [location]);
}

export function useSymbol() {
  const symbol = useQueryString(SYMBOL);
  return symbol;
}

export function useIsNews() {
  const item = useQueryString(ITEM);
  if (!item) return true;
  return item !== ASK;
}

export function useItem() {
  const item = useQueryString(ITEM);
  if (item && item !== ASK) return item;
  return null;
}

function useQueryString(param) {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  return searchParams.get(param);
}
