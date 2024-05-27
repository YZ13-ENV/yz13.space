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
    <div className="flex items-center h-9 w-full rounded-xl">
      <Button
        className={cn("h-full flex !bg-transparent rounded-xl w-1/3 relative", theme === "light" ? "gap-1 px-2" : "")}
        onClick={() => setTheme("light")}
        size="default"
        variant={theme === "light" ? "default" : "ghost"}
      >
        <BiSun size={14} />
        {theme === "light" && <>
          <motion.span layoutId="theme-switcher-bg" className="absolute top-0 left-0 w-full h-full bg-foreground rounded-xl -z-10" />
          <motion.span
            animate={{ width: 35, opacity: 1 }}
            initial={{ width: 12.5, opacity: 0 }}
            className="text-xs text-inherit"
          >
            Light
          </motion.span>
        </>
        }
      </Button>
      <Button
        className={cn("h-full flex rounded-xl w-1/3 relative", theme === "system" ? "gap-1 px-2" : "")}
        onClick={() => setTheme("system")}
        size="default"
        variant={theme === "system" ? "default" : "ghost"}
      >
        <BiDesktop size={14} />
        {
          theme === "system" && <>
            <motion.span layoutId="theme-switcher-bg" className="absolute top-0 left-0 w-full h-full bg-foreground rounded-xl -z-10" />
          </>
        }
      </Button>
      <Button
        className={cn("h-full flex !bg-transparent w-1/3 rounded-xl relative", theme === "dark" ? "gap-1 px-2" : "")}
        onClick={() => setTheme("dark")}
        size="default"
        variant={theme === "dark" ? "default" : "ghost"}
      >
        {theme === "dark" &&
          <>
            <motion.span layoutId="theme-switcher-bg" className="absolute top-0 left-0 w-full h-full bg-foreground rounded-xl -z-10" />
            <motion.span
              initial={{ width: 20, opacity: 0 }}
              animate={{ width: 30, opacity: 1 }}
              className="text-xs text-inherit"
            >
              Dark
            </motion.span>
          </>
        }
        <BiMoon size={14} />
      </Button>
    </div>
  )
}
export { ThemeSwitcher }
