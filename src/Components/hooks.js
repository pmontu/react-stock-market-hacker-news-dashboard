import { useLocation } from "react-router-dom";

export function useSymbol() {
  const symbol = useQueryString("symbol");
  return symbol;
}

export function useIsNews() {
  const itemsType = useQueryString("items");
  return itemsType !== "ask";
}

function useQueryString(param) {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  return searchParams.get(param);
}
