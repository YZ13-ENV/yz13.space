import { cva } from "class-variance-authority";

const statuses_variants = cva("", {
  variants: {
    variant: {
      default: "bg-foreground text-background border-foreground",
      // {
      //   background: "bg-background",
      //   foreground: "text-foreground",
      //   border: "border border-border",
      // },
      secondary: "bg-accents-1/80 text-foreground/70 border-transparent",
      // {
      //   background: "bg-accents-1/80",
      //   foreground: "text-foreground/70",
      //   border: "border border-transparent",
      // },
      poor: "bg-error-background text-error-foreground border-error-border",
      // {
      //   DEFAULT: "bg-error-background text-error-foreground",
      //   background: "bg-error-background",
      //   foreground: "text-error-foreground",
      //   border: "border border-error-border",
      // },
      "needs-improvement":
        "bg-warning-background text-warning-foreground border-warning-border",
      // {
      //   DEFAULT: "bg-warning-background text-warning-foreground",
      //   background: "bg-warning-background",
      //   foreground: "text-warning-foreground",
      //   border: "border border-warning-border",
      // },
      good: "bg-success-background text-success-foreground border-success-border",
      // {
      //   DEFAULT: "bg-success-background text-success-foreground",
      //   background: "bg-success-background",
      //   foreground: "text-success-foreground",
      //   border: "border border-success-border",
      // },
    },
  },
  defaultVariants: {
    variant: "secondary",
  },
});

export { statuses_variants };
