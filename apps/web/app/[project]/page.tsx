import { getProject } from "@/api/projects"
import { Footer } from "@/components/shared/footer"
import { User } from "@/components/shared/user"
import { Button } from "@repo/ui/button"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BiImage, BiRightArrowAlt, BiUser } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { ThemeSwitcher } from "../_components/entities/theme"
import { Details } from "../_components/widgets/project-details"
import { ProjectTabsV2 } from "./project-tabs"

type Props = {
  params: {
    project: string
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = params.project

  const { data } = await getProject(id)
  const project = data ? data[0] : null
  return {
    title: project?.name,
    description: project?.description,
  }
}
dayjs.extend(relativeTime)
const page = async ({ params }: Props) => {
  const OWNER = "YZ13-ENV"
  const REPO = "yz13"
  const id = params.project
  const { data } = await getProject(id)
  const project = data ? data[0] : null
  const created_at = dayjs(project?.created_at).fromNow(true)
  const repo_id = project?.repo_id
  const repo_owner = project?.repo_owner
  return (
    <>
      <div className="container py-6">
        <div className="max-w-6xl mx-auto w-full flex md:flex-row flex-col-reverse gap-6 items-center justify-between">
          <div className="w-full flex flex-row flex-wrap gap-2">
            <ProjectTabsV2 id={id} />
          </div>
          <div className="flex items-center gap-4 w-full justify-end">
            <ThemeSwitcher />
            <User />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-6xl font-bold">{project?.name}</h1>
        </div>
      </div>
      <div className="w-full container py-12 gap-6">
        <div className="max-w-6xl mx-auto w-full flex md:flex-row flex-col gap-6">
          <div className="md:w-1/3 w-full h-full">
            <div className="relative overflow-hidden w-full aspect-[16/10] bg-accents-1 rounded-xl">
              {
                project?.thumbnail
                  ? <Image src={project.thumbnail} fill alt="project-thumbnail" />
                  : <div className="w-full h-full flex items-center justify-center"><BiImage size={48} className="text-secondary" /></div>
              }
            </div>
          </div>
          <div className="md:w-2/3 w-full h-full flex sm:flex-row gap-3 flex-col-reverse">

            <div className="sm:w-1/2 w-full sm:h-full h-fit space-y-3">
              <div className="flex flex-wrap gap-3">

                <div className="flex flex-col justify-center">
                  <span className="text-sm text-secondary">Status</span>
                  <span className="text-sm text-foreground">{project?.status}</span>
                </div>

                <div className="flex flex-col justify-center">
                  <span className="text-sm text-secondary">Duration</span>
                  <span className="text-sm text-foreground">{created_at}</span>
                </div>
                <div className="flex w-fit flex-col justify-center">
                  <span className="text-sm text-secondary">Domain</span>
                  <Link href={project?.link || ""} className="text-sm hover:underline text-foreground">{project?.link}</Link>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm text-secondary">Source</span>
                {
                  repo_owner && repo_id
                    ?
                    <Link
                      target="_blank"
                      href={`https://github.com/${repo_owner}/${repo_id}`}
                      className="mt-1 inline-flex border items-center w-fit h-fit gap-1 rounded-full bg-accents-1 px-2.5 py-1"
                    >
                      <BsGithub size={16} className="" />
                      <span className="text-sm">{repo_owner}/{repo_id}</span>
                    </Link>
                    : <span></span>
                }
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-sm text-secondary">Description </span>
                <span className="text-sm text-foreground">{project?.description}</span>
              </div>
            </div>
            <div className="sm:w-1/2 w-full sm:h-full h-fit items-end flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2"><BiUser /><span className="text-inherit">Share</span></Button>
                <Button className="gap-2"><span className="text-inherit">Visit</span><BiRightArrowAlt size={18} /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Details id={id} />
      <Footer className="bg-accents-1/50 max-w-6xl mx-auto border-x border-t mt-auto" />
    </>
  )
}
export default page