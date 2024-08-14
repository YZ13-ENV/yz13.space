import { unstable_cache as cache } from "next/cache";
type Props = { username: string };

const INTERNAL__events = async ({ username }: Props) => {
  const base = "https://api.github.com";
  const path = `/users/${username}/events/public`;
  const url = new URL(path, base);
  try {
    const result = await fetch(url.toString(), { method: "GET" });
    return await result.json();
  } catch (e) {
    return null;
  }
};

export const events = (props: Props) => {
  const getCached = cache(
    async (props: Props) => INTERNAL__events(props),
    ["events"],
    { tags: ["events"], revalidate: 60 * 60 }
  );
  return getCached(props);
};
