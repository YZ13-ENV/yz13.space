export type ActivityEventsProps = {
  username: string;
  page?: number;
};

export const INTERNAL__events = async ({
  username,
  page,
}: ActivityEventsProps) => {
  const base = "https://api.github.com";
  const path = `/users/${username}/events`;
  const url = new URL(path, base);
  const searchParams = url.searchParams;
  searchParams.set("per_page", "100");
  if (typeof page === "number") searchParams.set("page", String(page));
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${process.env.GITHUB_TOKEN}`);
    const result = await fetch(url.toString(), {
      method: "GET",
      headers: headers,
    });
    const json = await result.json();
    const hasMessage = typeof json.message === "string";
    if (hasMessage) throw new Error(json.message);
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};
