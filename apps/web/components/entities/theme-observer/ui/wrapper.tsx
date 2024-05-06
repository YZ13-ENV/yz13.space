"use server"

import { cookies } from "next/headers"
import { ThemeObserver } from "./observer"

const ThemeWrapper = () => {
  const cookiesList = cookies()
  const theme_cookie = cookiesList.get("theme")
  const theme = theme_cookie ? theme_cookie.value : "system"

  return <ThemeObserver theme={theme} />
}
export { ThemeWrapper }
