export function qs_replace(search, name, value = null) {
  let searchParams = new URLSearchParams(search);
  if (value) searchParams.set(name, value);
  else searchParams.delete(name);
  return searchParams.toString();
}
