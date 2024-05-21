"use client"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { useCookieState } from "ahooks"
import { motion } from "framer-motion"
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
    <div className="flex items-center h-7 bg-accents-2/50 rounded-lg">
      <Button
        className={cn("h-full rounded-lg", theme === "light" ? "w-fit gap-1 px-2" : "w-7")}
        onClick={() => setTheme("light")}
        size="icon"
        variant={theme === "light" ? "default" : "ghost"}
      >
        <BiSun size={14} />
        {theme === "light" && (
          <motion.span
            animate={{ width: 35, opacity: 1 }}
            initial={{ width: 12.5, opacity: 0 }}
            className="text-xs text-inherit"
          >
            Light
          </motion.span>
        )}
      </Button>
      <Button
        className={cn("h-full rounded-lg", theme === "system" ? "w-fit gap-1 px-2" : "w-7")}
        onClick={() => setTheme("system")}
        size="icon"
        variant={theme === "system" ? "default" : "ghost"}
      >
        <BiDesktop size={14} />
      </Button>
      <Button
        className={cn("h-full rounded-lg", theme === "dark" ? "w-fit gap-1 px-2" : "w-7")}
        onClick={() => setTheme("dark")}
        size="icon"
        variant={theme === "dark" ? "default" : "ghost"}
      >
        {theme === "dark" && (
          <motion.span
            initial={{ width: 20, opacity: 0 }}
            animate={{ width: 30, opacity: 1 }}
            className="text-xs text-inherit"
          >
            Dark
          </motion.span>
        )}
        <BiMoon size={14} />
      </Button>
    </div>
  )
}
export { ThemeSwitcher }
