const getTemplates = async (): Promise<any[]> => {
  try {
    const url = "https://www.templates.yz13.space/api/templates";
    const res = await fetch(url, { method: "GET" });
    if (res.ok) return (await res.json()) as any[];
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};
export { getTemplates };
