"use server";
import { Contributor, Repo } from "./types";

const getRepos = async (OWNER: string): Promise<Repo[]> => {
  try {
    const url = `https://api.github.com/users/${OWNER}/repos`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getRepo = async (OWNER: string, REPO: string) => {
  try {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getRepoEvents = async (owner: string, id: string) => {
  try {
    const url = `https://api.github.com/repos/${owner}/${id}/events`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
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
    const url = `https://api.github.com/repos/${owner}/${id}/deployments`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
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
    const url = `https://api.github.com/repos/${owner}/${id}/languages`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
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
    const url = `https://api.github.com/repos/${owner}/${id}/commits`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
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

const getRepoContributors = async (
  owner: string,
  id: string
): Promise<Contributor[]> => {
  try {
    const url = `https://api.github.com/repos/${owner}/${id}/contributors`;
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export {
  getRepo,
  getRepoCommits,
  getRepoContributors,
  getRepoDeployments,
  getRepoEvents,
  getRepoFile,
  getRepoLanguages,
  getRepos,
};
