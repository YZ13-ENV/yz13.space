import { Button } from "@repo/ui/button"
import { Folder, FolderFront } from "@repo/ui/svg/folder"
import { Project } from "@yz13/api/gh/types"
import { getStorageItem } from "@yz13/supabase/storage"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { Contributors } from "./contributors"
import { ProjectDropdownMenu } from "./dropdown-menu"
import { CardStatistics } from "./statistics"

type Props = {
  project: Project
}
dayjs.extend(relativeTime)
const ProjectCard = ({ project }: Props) => {
  const OWNER = project.repo_owner
  const REPO = project.repo_id
  const created_at = dayjs(project.created_at).fromNow(false)
  const attachments = project.attachments.map(attachment => getStorageItem([attachment]))
  return (
    <div className="w-fit folder h-fit flex flex-col items-center justify-center relative">
      <Folder className="folder-back" />
      <div className="absolute folder-images bottom-24 w-full flex items-center justify-center gap-4">
        {
          attachments
            .slice(0, 4)
            .map(attachment =>
              <div key={attachment} className="folder-image relative">
                <Image src={attachment} className="rounded-lg object-cover" fill alt="folder-attachment" />
              </div>
            )
        }
      </div>
      <div className="absolute bottom-0">
        <div className="absolute w-full h-full flex flex-col justify-between py-2 px-3">
          <div className="relative w-full flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
              <div className="relative flex items-center gap-2">
                <Link href={`/${project.id}`} className="absolute w-full h-full left-0 top-0" />
                <span className="line-clamp-1 text-foreground">{project.name}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-accents-3 text-xs">{project.status}</span>
              </div>
              <CardStatistics project_id={project.id} />
            </div>
            <span className="text-xs">{created_at}</span>
            {
              OWNER && REPO &&
              <Link
                href={`https://github.com/${OWNER}/${REPO}`}
                className="px-1.5 py-0.5 rounded-md bg-accents-3 inline-flex items-center gap-1 w-fit"
              >
                <BsGithub size={14} />
                <span className="text-xs">{OWNER}/{REPO}</span>
              </Link>
            }
          </div>
          <div className="w-full h-fit flex items-center justify-between">
            <Contributors project={project} />
            <ProjectDropdownMenu project={project}>
              <Button className="w-6 h-6" size="icon" variant="ghost"><BiDotsHorizontalRounded size={14} /></Button>
            </ProjectDropdownMenu>
          </div>
        </div>
        <FolderFront className="folder-front" />
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
