"use client"

import { Theme, useTheme } from "@/app/_components/entities/theme"
import { useEffect, useState } from "react"

type Props = {
  theme: Theme
}
const ThemeObserver = ({ theme }: Props) => {
  const localTheme = useTheme(state => state.theme)
  const setSystemTheme = useTheme(state => state.setSystemTheme)
  const [ready, setReady] = useState<boolean>(false)
  const currentTheme: Theme = ready ? localTheme : theme
  const isSystemTheme = currentTheme === "system"
  const isDarkTheme = currentTheme === "dark"
  const isLightTheme = currentTheme === "light"
  useEffect(() => {
    if (typeof document !== "undefined") setReady(true)
  }, [typeof document])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.matchMedia) return undefined
      if (isSystemTheme) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setSystemTheme("dark")
          const body = document.getElementById("body")
          if (body) {
            body.classList.add("dark")
          }
        } else {
          setSystemTheme("light")
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
