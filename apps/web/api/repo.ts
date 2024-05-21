"use server";
import cache from "@/cache.json";
import { kv } from "@vercel/kv";

const EXPIRE_TIME = cache.DEFAULT_EXPIRE_TIMESTAMP;

const getRepoEvents = async (owner: string, id: string) => {
  try {
    const key = `events-${owner}/${id}`;
    const cached = await kv.get(key);
    if (cached) return cached;
    const url = `https://api.github.com/repos/${owner}/${id}/events`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
      if (json && !cached) kv.set(key, json, { nx: true, ex: EXPIRE_TIME });
      return json;
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
const getRepoDeployments = async (owner: string, id: string) => {
  try {
    const key = `deployments-${owner}/${id}`;
    const cached = await kv.get(key);
    if (cached) return cached;
    const url = `https://api.github.com/repos/${owner}/${id}/deployments`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
      if (json && !cached) kv.set(key, json, { nx: true, ex: EXPIRE_TIME });
      return json;
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
const getRepoLanguages = async (owner: string, id: string) => {
  try {
    const key = `languages-${owner}/${id}`;
    const cached = await kv.get(key);
    if (cached) return cached;
    const url = `https://api.github.com/repos/${owner}/${id}/languages`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
      if (json && !cached) kv.set(key, json, { nx: true, ex: EXPIRE_TIME });
      return json;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getRepoCommits = async (owner: string, id: string) => {
  try {
    const key = `commits-${owner}/${id}`;
    const cached = await kv.get(key);
    if (cached) return cached;
    const url = `https://api.github.com/repos/${owner}/${id}/commits`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
      if (json && !cached) kv.set(key, json, { nx: true, ex: EXPIRE_TIME });
      return json;
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getRepoFile = async (owner: string, id: string, filename: string) => {
  try {
    const url = `https://raw.githubusercontent.com/${owner}/${id}/main/${filename}`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.text();
      return json;
    }
    return "";
  } catch (e) {
    console.log(e);
    return "";
  }
};

export {
  getRepoCommits,
  getRepoDeployments,
  getRepoEvents,
  getRepoFile,
  getRepoLanguages,
};
