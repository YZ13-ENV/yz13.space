export const isDev = process.env.NODE_ENV === "development";

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";
  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export const getHOST = () => {
  let url = isDev
    ? "http://localhost:3000/"
    : process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000/";
  url = url.startsWith("http://")
    ? url.replace("http://", "")
    : url.startsWith("https://")
      ? url.replace("https://", "")
      : url;
  url = url.endsWith("/") ? url.slice(0, url.length - 1) : url;
  return url;
};
