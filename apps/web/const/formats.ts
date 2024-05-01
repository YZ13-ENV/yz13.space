const videoFormats = [".mp4"];
const imageFormats = [".png", ".webp", ".jpg"];
export const isVideo = (link: string) => {
  if (!link) return false;
  const splitted = link.split(".");
  const format = "." + splitted[splitted.length - 1];
  return videoFormats.includes(format);
};
export const isImage = (link: string) => {
  if (!link) return false;
  const splitted = link.split(".");
  const format = "." + splitted[splitted.length - 1];
  return imageFormats.includes(format);
};
