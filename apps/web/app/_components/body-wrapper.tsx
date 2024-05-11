"use client"
import { useProjectModal } from "@/components/entities/project-modal-store/store"
import { cn } from "@repo/ui/cn"
import { ReactNode, useEffect, useState } from "react"
import { Theme, useTheme } from "./entities/theme"


type Props = {
  theme?: Theme
  children?: ReactNode
}
const BodyWrapper = ({ children, theme = "system" }: Props) => {
  const modal = useProjectModal(state => state.enabled)
  const { theme: localTheme, setTheme } = useTheme()
  const [ready, setReady] = useState<boolean>(false)
  const currentTheme: Theme = ready ? localTheme : theme
  useEffect(() => {
    if (theme) setTheme(theme)
  }, [theme])
  useEffect(() => {
    if (typeof document !== "undefined") setReady(true)
  }, [typeof document])
  return (
    <body id="body" className={cn(currentTheme, !!modal ? "overflow-hidden" : "")}>
      {children}
    </body>
  )
}
export { BodyWrapper }
