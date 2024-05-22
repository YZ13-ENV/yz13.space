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

export { getRepo };
