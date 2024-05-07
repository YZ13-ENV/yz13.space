"use client"
import { Button } from "@repo/ui/button"
import { useCookieState } from "ahooks"
import { useEffect } from "react"
import { BiDesktop, BiMoon, BiSun } from "react-icons/bi"
import { useTheme } from "../store/theme-store"

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme()
  const [_, setCookieTheme] = useCookieState("theme")
  useEffect(() => {
    if (!!theme) setCookieTheme(theme)
  }, [theme])
  return (
    <div className="flex border items-center bg-background rounded-full">
      <Button onClick={() => setTheme("light")} size="icon" variant={theme === "light" ? "default" : "ghost"}><BiSun /></Button>
      <Button onClick={() => setTheme("system")} size="icon" variant={theme === "system" ? "default" : "ghost"}><BiDesktop /></Button>
      <Button onClick={() => setTheme("dark")} size="icon" variant={theme === "dark" ? "default" : "ghost"}><BiMoon /></Button>
    </div>
  )
}
export { ThemeSwitcher }
