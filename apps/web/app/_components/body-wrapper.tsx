"use client"
import { useProjectModal } from "@/components/entities/project-modal-store/store"
import { cn } from "@repo/ui/cn"
import { ReactNode } from "react"


type Props = {
  children?: ReactNode
}
const BodyWrapper = ({ children }: Props) => {
  const modal = useProjectModal(state => state.enabled)
  return <body className={cn("dark", !!modal ? "overflow-hidden" : "")}>{children}</body>
}
export { BodyWrapper }
