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
    height: 320,
  },
  "control-center": {
    width: 800,
    height: 600,
  },
};
export const defaultUnit = {
  width: 0,
  height: 0,
};
