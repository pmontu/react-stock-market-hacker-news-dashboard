import { useLocation } from "react-router-dom";
import { ITEM, ASK, SYMBOL } from "./constants";

export function useSymbol() {
  const symbol = useQueryString(SYMBOL);
  return symbol;
}

export function useIsNews() {
  const item = useQueryString(ITEM);
  if (!item) return true;
  return item !== ASK;
}

function useQueryString(param) {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  return searchParams.get(param);
}
