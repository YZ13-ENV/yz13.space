"use client"
import { cn } from "@repo/ui/cn"
import { useCookieState } from "ahooks"
import { ReactNode, useEffect, useState } from "react"
import { Theme, useTheme } from "./theme-store"

type Props = {
  children?: ReactNode
  className?: string
  theme?: Theme
}
const ThemeBodyWrapper = ({ theme = "light", children, className = "" }: Props) => {
  const [_, setCookieTheme] = useCookieState("theme", { defaultValue: "light" })
  const local_theme = useTheme(state => state.theme)
  const setLocalTheme = useTheme(state => state.setTheme)
  const [ready, setReady] = useState<boolean>(false)
  const final_theme = ready ? local_theme : theme
  useEffect(() => {
    setCookieTheme(local_theme)
  }, [local_theme])
  useEffect(() => {
    if (typeof document !== "undefined") {
      setReady(true)
      if (local_theme !== theme) setLocalTheme(theme)
    }
  }, [typeof document])
  return <body className={cn("", final_theme, className)}>{children}</body>
}
export { ThemeBodyWrapper }
