const getStorageItem = (path: string[]) => {
  const pathTo = path.join("/");
  const fixedPath = pathTo.startsWith("/")
    ? pathTo.slice(1, pathTo.length)
    : pathTo;
  const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/media/${fixedPath}`;
  return url;
};
export { getStorageItem };
