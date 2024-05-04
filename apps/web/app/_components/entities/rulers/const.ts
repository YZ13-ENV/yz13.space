import { cva } from "class-variance-authority";

const rulers_variants = cva("w-full absolute flex items-center justify-end", {
  variants: {
    size: {
      sm: "px-12 h-28 pt-16 bottom-14",
      default: "px-12 h-36 pt-20 bottom-14",
      lg: "px-12 h-44 pt-24 bottom-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
export { rulers_variants };
