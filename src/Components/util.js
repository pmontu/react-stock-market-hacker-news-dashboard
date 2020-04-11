export function qs_replace(search, name, value) {
  let searchParams = new URLSearchParams(search);
  searchParams.set(name, value);
  return searchParams.toString();
}
