import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      fontFamily: {
        special: "var(--special-font)",
        headings: "var(--headings-font)",
        text: "var(--text-font)",
      },
      colors: {
        "accents-1": "hsl(var(--accents-1))",
        "accents-2": "hsl(var(--accents-2))",
        "accents-3": "hsl(var(--accents-3))",
        "accents-4": "hsl(var(--accents-4))",
        "accents-5": "hsl(var(--accents-5))",
        "accents-6": "hsl(var(--accents-6))",
        "accents-7": "hsl(var(--accents-7))",
        "accents-8": "hsl(var(--accents-8))",
        background: "hsl(var(--yz13-background))",
        foreground: "hsl(var(--yz13-foreground))",
        border: "hsl(var(--yz13-border))",
        borderRadius: {
          lg: "var(--yz13-radius)",
          md: "calc(var(--yz13-radius) - 2px)",
          sm: "calc(var(--yz13-radius) - 4px)",
        },
        success: {
          DEFAULT: "hsl(var(--yz13-success))",
          light: "hsl(var(--yz13-success-light))",
          dark: "hsl(var(--yz13-success-dark))",
        },
        error: {
          DEFAULT: "hsl(var(--yz13-error))",
          light: "hsl(var(--yz13-error-light))",
          dark: "hsl(var(--yz13-error-dark))",
        },
        warning: {
          DEFAULT: "hsl(var(--yz13-warning))",
          light: "hsl(var(--yz13-warning-light))",
          dark: "hsl(var(--yz13-warning-dark))",
        },
        highlight: {
          alert: "var(--yz13-alert)",
          purple: "var(--yz13-purple)",
          cyan: "var(--yz13-cyan)",
          violet: "var(--yz13-violet)",
        },
        secondary: "hsl(var(--yz13-secondary))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
