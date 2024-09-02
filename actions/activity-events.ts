export type ActivityEventsProps = {
  from: string;
  to: string;
};

export const INTERNAL__events = async ({ from, to }: ActivityEventsProps) => {
  const base = "https://api.yz13.space";
  const path = `/commits/owner`;
  const url = new URL(path, base);
  const searchParams = url.searchParams;
  searchParams.set("from", from);
  searchParams.set("to", to);
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
