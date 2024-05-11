"use server"

import { Theme } from "@/app/_components/entities/theme"
import { cookies } from "next/headers"
import { ThemeObserver } from "./observer"

const ThemeWrapper = () => {
  const cookiesList = cookies()
  const theme_cookie = cookiesList.get("theme")
  const theme: Theme = theme_cookie ? theme_cookie.value as Theme : "system"

  return <ThemeObserver theme={theme} />
}
export { ThemeWrapper }
