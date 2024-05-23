import { tabs } from "@/app/[project]/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui/dropdown"
import { Project } from "@yz13/api/gh/types"
import Link from "next/link"
import { ReactNode } from "react"
import { MdOpenInNew, MdOutlineFolderOpen } from "react-icons/md"

type Props = {
  project: Project
  children?: ReactNode
}
const ProjectDropdownMenu = ({ project, children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!!children}>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-2" disabled={project.disabled} asChild>
          <Link href={`/${project.id}`}>
            <MdOutlineFolderOpen />
            <span className="line-clamp-1 text-inherit">Open "{project.name}"</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {
          tabs
            .map(
              tab =>
                <DropdownMenuItem key={tab.value} className="gap-2" asChild>
                  <Link href={`/${project.id}` + tab.value}>
                    {tab.icon({ size: 14 })}{tab.label}
                  </Link>
                </DropdownMenuItem>
            )
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2" disabled={project.disabled || !project.link} asChild>
          <Link href={project.link}>
            <MdOpenInNew /><span className="text-inherit">Visit</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export { ProjectDropdownMenu }
