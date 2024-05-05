import { cva } from "class-variance-authority";

const rulers_variants = cva("w-full flex items-center justify-end", {
  variants: {
    size: {
      sm: "px-12 min-h-24 bottom-0",
      default: "px-12 min-h-36 bottom-0",
      lg: "px-12 min-h-40 bottom-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
export { rulers_variants };
