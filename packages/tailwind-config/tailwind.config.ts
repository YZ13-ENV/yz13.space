import type { Config } from "tailwindcss";
const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
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
      borderColor: {
        DEFAULT: "hsl(var(--yz13-border))",
      },
      height: {
        screen: "100dvh",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
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
          DEFAULT: "hsl(var(--yz13-success-accent))",
          100: "hsl(var(--yz13-success-100))",
          200: "hsl(var(--yz13-success-200))",
          300: "hsl(var(--yz13-success-300))",
          400: "hsl(var(--yz13-success-400))",
          accent: "hsl(var(--yz13-success-accent))",
          foreground: "hsl(var(--yz13-success-foreground))",
          background: "hsl(var(--yz13-success-background))",
          border: "hsl(var(--yz13-success-border))",
        },
        error: {
          DEFAULT: "hsl(var(--yz13-error-accent))",
          100: "hsl(var(--yz13-error-100))",
          200: "hsl(var(--yz13-error-200))",
          300: "hsl(var(--yz13-error-300))",
          400: "hsl(var(--yz13-error-400))",
          accent: "hsl(var(--yz13-error-accent))",
          foreground: "hsl(var(--yz13-error-foreground))",
          background: "hsl(var(--yz13-error-background))",
          border: "hsl(var(--yz13-error-border))",
        },
        warning: {
          DEFAULT: "hsl(var(--yz13-warning-accent))",
          100: "hsl(var(--yz13-warning-100))",
          200: "hsl(var(--yz13-warning-200))",
          300: "hsl(var(--yz13-warning-300))",
          400: "hsl(var(--yz13-warning-400))",
          accent: "hsl(var(--yz13-warning-accent))",
          foreground: "hsl(var(--yz13-warning-foreground))",
          background: "hsl(var(--yz13-warning-background))",
          border: "hsl(var(--yz13-warning-border))",
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
        "long-spin": "spin 5s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

export default config;
