export type ActivityEventsProps = {
  username: string;
};

export const INTERNAL__events = async ({ username }: ActivityEventsProps) => {
  const base = "https://api.yz13.space";
  const path = `/activity/user/${username}`;
  const url = new URL(path, base);
  try {
    const result = await fetch(url.toString(), {
      method: "GET",
    });
    const json = await result.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};
