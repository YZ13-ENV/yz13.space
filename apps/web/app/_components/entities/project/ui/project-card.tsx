import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { BigFolder } from "@repo/ui/svg/folder"
import { Project } from "@yz13/api/gh/types"
import { getStorageItem } from "@yz13/supabase/storage"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { ProjectDropdownMenu } from "./dropdown-menu"
import { CardStatistics } from "./statistics"

type Props = {
  project: Project
}
dayjs.extend(relativeTime)
const ProjectCard = ({ project }: Props) => {
  const created_at = dayjs(project.created_at).fromNow(true)
  const repo_id = project.repo_id
  const repo_owner = project.repo_owner
  const attachments = project.attachments.map(attachment => getStorageItem([attachment]))
  // Обрезать массив до 2-3х и при attachments > 3 выводить сколько осталось
  console.log(attachments)
  return (
    <div className="w-fit folder h-fit flex flex-col items-center justify-center relative">
      <BigFolder className="folder-back" />
      <div className="w-full absolute left-0 top-0 h-full pb-1 pt-4 px-1">
        <div className="w-full h-full flex gap-1 flex-col">
          <div className="flex flex-col bg-accents-2/60 p-1 rounded-lg gap-1 h-full w-full">
            <div className="w-full h-full grid gap-1 attachments-grid">
              {
                attachments.map(
                  (attachment, i) => <div className={cn("w-full relative border rounded-lg h-full", i === 0 ? "attachment-a" : i === 1 ? "attachment-b" : "attachment-c")}>
                    <Image src={attachment} fill className="rounded-lg object-cover" alt="project-thumbnail" />
                  </div>
                )
              }
            </div>
            <div className="w-full flex items-end justify-between gap-2">
              <div className="flex px-1 pb-1 flex-col gap-1">
                <span className="text-foreground">{project.name}</span>
                <span className="text-xs line-clamp-1">{project.description || "Без описания"}</span>
              </div>
              <div className="flex items-center mt-auto -space-x-3">
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
                <div className="w-8 aspect-square bg-accents-1 rounded-full border border-accents-3" />
              </div>
            </div>
          </div>
          <div className="w-full h-6 flex items-center justify-between">
            <CardStatistics created_at={created_at} project_id={project.id} />
            <ProjectDropdownMenu project={project}>
              <Button className="w-6 h-6" size="icon" variant="ghost"><BiDotsHorizontalRounded size={14} /></Button>
            </ProjectDropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div className="flex flex-col w-full p-0 transition-all relative cursor-pointer border h-fit bg-background hover:border-foreground hover:ring hover:ring-foreground hover:bg-accents-1 rounded-xl">
  //     <Link href={`/${project.id}`} className="z-[1] absolute top-0 left-0 w-full h-full rounded-xl" />
  //     {
  //       project.thumbnail &&
  //       <div className="w-full aspect-[16/10] pt-1 px-1">
  //         <div className="w-full h-full relative border rounded-lg bg-accents-2">
  //           <Image src={project.thumbnail} fill className="rounded-lg" alt="project-thumbnail" />
  //         </div>
  //       </div>
  //     }
  //     <div className="flex p-3 items-center justify-between">
  //       <div className="flex flex-col gap-1 justify-center">
  //         <span className="text-xl inline-flex gap-2 items-center text-foreground">
  //           {project.name}
  //           <span className="text-xs px-2 py-1 rounded-md bg-accents-2">{project.status}</span>
  //         </span>
  //         {project.description && <span className="text-sm text-secondary">{project.description}</span>}
  //       </div>
  //     </div>
  //     <div className="px-3 pb-3">
  //       <CardStatistics project_id={project.id} created_at={created_at} />
  //     </div>
  //   </div>
  // )
}
export { ProjectCard }
