const INTERNAL__journal = async () => {
  const base = "https://cms.yz13.space";
  const path = "/api/publisher/markdown/d5f98156-1776-42da-8f20-686d6a1ae2a8";
  const url = new URL(path, base);
  const response = await fetch(url.toString(), { method: "GET" });
  return await response.json();
};

export const journal = async () => {
  return await INTERNAL__journal();
};
