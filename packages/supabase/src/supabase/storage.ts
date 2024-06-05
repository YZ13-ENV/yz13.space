const getStorageItem = (path: string[]) => {
  const pathTo = path
    .map((item) => (item.startsWith("/") ? item.slice(1, item.length) : item))
    .join("/");
  const fixedPath = pathTo.startsWith("/")
    ? pathTo.slice(1, pathTo.length)
    : pathTo;
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fixedPath}`;
  return url;
};
export { getStorageItem };
