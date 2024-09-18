


export const getStorageItem = (bucket: string, path: string) => {
  const base = "https://ooybokfuxqwahirzlujp.supabase.co";
  const validPath = path.startsWith("/") ? path : `/${path}`
  const fullPath = `/storage/v1/object/public/${bucket}${validPath}`;
  const url = new URL(fullPath, base);
  return url.toString();

}
