"use client"

import { useEffect } from "react"

type Props = {
  theme: string
}
const ThemeObserver = ({ theme }: Props) => {
  const isSystemTheme = theme === "system"
  const isDarkTheme = theme === "dark"
  const isLightTheme = theme === "light"
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.matchMedia) return undefined
      if (isSystemTheme) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          const body = document.getElementById("body")
          if (body) {
            body.classList.add("dark")
          }
        }
      }
      if (isDarkTheme) {
        const body = document.getElementById("body")
        if (body) {
          body.classList.add("dark")
        }
      }
      if (isLightTheme) {
        const body = document.getElementById("body")
        if (body) {
          body.classList.remove("dark")
        }
      }
    }
  }, [typeof window, isSystemTheme, isLightTheme, isDarkTheme])
  return <></>
}
export { ThemeObserver }
