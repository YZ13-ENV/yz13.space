"use client"
import { Button } from "@repo/ui/button"
import { BiMoon, BiSun } from "react-icons/bi"
import { useTheme } from "./theme-store"

const ThemeSwitcherButton = () => {
  const { setTheme, theme } = useTheme()
  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else setTheme("dark")
  }
  return (
    <Button onClick={changeTheme} size="icon" variant="outline">
      {
        theme === "light"
          ? <BiSun />
          : <BiMoon />
      }
    </Button>
  )
}
export { ThemeSwitcherButton }
