"use client"
import { useProjectModal } from "@/components/entities/project-modal-store/store"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"


type Props = {
  theme?: string
  children?: ReactNode
}
const BodyWrapper = ({ children, theme = "" }: Props) => {
  const modal = useProjectModal(state => state.enabled)
  return <body id="body" className={cn(theme, !!modal ? "overflow-hidden" : "")}>{children}</body>
}
export { BodyWrapper }
