import { cva } from "class-variance-authority";
import { ZoomLevel } from "./store/zoom-store";

const rulers_variants = cva("w-full flex items-center", {
  variants: {
    size: {
      sm: "px-12 min-h-24 bottom-0",
      default: "px-12 min-h-36 bottom-0",
      lg: "px-12 min-h-40 bottom-0",
    },
    align: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    size: "default",
    align: "end",
  },
});

type MarkerConfig = {
  size: ZoomLevel;
  count: number;
};

const markers_cfg: MarkerConfig[] = [
  {
    size: 1,
    count: 5,
  },
  {
    size: 2,
    count: 5,
  },
  {
    size: 3,
    count: 5,
  },
  {
    size: 4,
    count: 5,
  },
];

export { markers_cfg, rulers_variants };
