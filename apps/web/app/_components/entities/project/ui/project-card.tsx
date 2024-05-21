import { Project } from "@/types"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
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
    <div className="flex flex-col w-full p-0 transition-all relative cursor-pointer border h-fit bg-background hover:border-foreground hover:ring hover:ring-foreground hover:bg-accents-1 rounded-xl">
      <Link href={`/${project.id}`} className="z-[1] absolute top-0 left-0 w-full h-full rounded-xl" />
      {
        project.thumbnail &&
        <div className="w-full aspect-[16/10] pt-1 px-1">
          <div className="w-full h-full relative border rounded-lg bg-accents-2">
            <Image src={project.thumbnail} fill className="rounded-lg" alt="project-thumbnail" />
          </div>
        </div>
      }
      <div className="flex p-3 items-center justify-between">
        <div className="flex flex-col gap-1 justify-center">
          <span className="text-xl inline-flex gap-2 items-center text-foreground">
            {project.name}
            <span className="text-xs px-2 py-1 rounded-md bg-accents-2">{project.status}</span>
          </span>
          {project.description && <span className="text-sm text-secondary">{project.description}</span>}
        </div>
      </div>
      <div className="px-3 pb-3">
        <CardStatistics project_id={project.id} created_at={created_at} />
      </div>
    </div>
  )
}
export { ProjectCard }
