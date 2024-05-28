const randomString = (length?: number): string => {
  let outString: string = "";
  let inOptions: string =
    "ABCDEFGHIJKLMNOPQRsTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < (length ? length : 12); i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }

  return outString;
};

export { randomString };
