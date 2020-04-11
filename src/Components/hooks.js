import { useLocation } from "react-router-dom";

export function useSymbol() {
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  return searchParams.get("symbol");
}
