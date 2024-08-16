type ContentConfig = {
  width: string | number;
  height: string | number;
  [key: string]: string | number;
};

type ContentUnit = {
  [key: string]: ContentConfig;
};

export const contentConfig: ContentUnit = {
  menu: {
    width: "100%",
    height: 180,
  },
  "control-center": {
    width: 800,
    height: 600,
  },
  settings: {
    width: "100%",
    height: 110,
  },
  user: {
    width: "100%",
    height: 120,
  },
};
export const defaultUnit = {
  width: 0,
  height: 0,
};