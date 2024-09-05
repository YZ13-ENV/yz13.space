export const attachment = (path: string) => {
  const base = "https://ooybokfuxqwahirzlujp.supabase.co";
  const fullPath = `/storage/v1/object/public/cms${path}`;
  const url = new URL(fullPath, base);
  return url.toString();
}
