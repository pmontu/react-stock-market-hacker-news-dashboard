export function qs_replace(search, name, value = null) {
  let searchParams = new URLSearchParams(search);
  if (value) searchParams.set(name, value);
  else searchParams.delete(name);
  return searchParams.toString();
}

export const evalResponce = (res) => {
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};

export const getMostActiveChartData = (mostActiveStock) =>
  mostActiveStock.reduce((data, item) => {
    data.push({
      label: item.ticker,
      data: [["", Math.log10(parseInt(item.price))]],
    });
    return data;
  }, []);
