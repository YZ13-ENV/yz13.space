import { Project } from "@/types"
import { Button } from "@repo/ui/button"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { MdOpenInNew } from "react-icons/md"
import { CardStatistics } from "./statistics"

type Props = {
  project: Project
}
dayjs.extend(relativeTime)
const ProjectCard = ({ project }: Props) => {
  const created_at = dayjs(project.created_at).fromNow(true)
  const repo_id = project.repo_id
  const repo_owner = project.repo_owner
  return (
    <div className="flex flex-col w-full gap-4 p-4 transition-colors border cursor-pointer h-fit bg-background hover:border-primary rounded-xl">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="relative overflow-hidden rounded-full w-9 h-9 aspect-square">
            {
              project.icon
                ? <Image src={project.icon} fill className="p-1" alt="project-icon" />
                : <div className="w-full h-full rounded-full bg-muted" />
            }
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-base">{project.name}</span>
            <Link href={project.link} className="inline-flex items-center gap-2 text-sm text-muted-foreground group/project-link hover:underline">
              <span>{project.link}</span>
              <MdOpenInNew size={14} className="hidden group-hover/project-link:block" />
            </Link>
          </div>
        </div>
        <Button size="icon" variant="ghost" className="text-muted-foreground" asChild>
          <Link href={`/${project.id}`}>
            <BiRightArrowAlt size={24} />
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between w-full gap-3">
        {
          repo_owner && repo_id
            ?
            <Link target="_blank" translate="yes"
              href={`https://github.com/${repo_owner}/${repo_id}`} className="inline-flex border items-center w-fit h-fit gap-1 rounded-full bg-muted/50 px-2.5 py-1">
              <BsGithub size={16} className="" />
              <span className="text-sm">{repo_owner}/{repo_id}</span>
            </Link>
            : <span></span>
        }
        <div className="flex items-center gap-2">
          {/* <Button className="w-8 h-8" size="icon" variant="ghost">
            <BiDotsHorizontalRounded size={18} className="text-muted-foreground" />
          </Button> */}
        </div>
      </div>
      <CardStatistics project_id={project.id} created_at={created_at} />
    </div>
  )
}
export { ProjectCard }
