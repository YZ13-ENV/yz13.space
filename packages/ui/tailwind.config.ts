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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
