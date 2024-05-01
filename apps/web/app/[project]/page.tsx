import { getProject, getProjectBlocks, getProjects } from "@/api/projects"
import { Time } from "@/app/_components/time"
import { ProjectSection } from "@/app/_components/widgets/project"
import { ProjectStack } from "@/app/_components/widgets/project/ui/project-stack"
import { DynamicHeaderWrapper } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { User } from "@/components/shared/user"
import { isImage, isVideo } from "@/const/formats"
import { randomNumber } from "@/helpers/random-number"
import { Block, Project } from "@/types"
import { Button } from "@repo/ui/button"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import { ProjectTags } from "../_components/widgets/project/ui/project-tags"

type Props = {
  params: {
    project: string
  }
}
const page = async ({ params }: Props) => {
  const id = parseInt(params.project)
  const { data } = await getProject(id)
  const projects = await getProjects()
  const project: Project | null = data ? data[0] || null : null
  const projectBlocks = await getProjectBlocks(id)
  const blocks: Block[] = projectBlocks.data ? projectBlocks.data : []
  const createdAt = project ? dayjs(project.created_at) : undefined
  const all_without_current = projects.data ? projects.data.filter(pr => parseInt(pr.id) !== id) : []
  const random = parseInt(randomNumber(0, all_without_current.length - 1).toFixed(0))
  const randomProject = all_without_current[random]
  if (!project) return null
  return (
    <>
      <DynamicHeaderWrapper
        trigger={500}
        activeClassName="backdrop-blur"
      >
        <Link href="/" className='text-2xl font-semibold'>YZ13</Link>
        <div className="flex items-center gap-3">
          <Nav />
          <Button className="hidden rounded-full md:flex bg-muted/50 backdrop-blur-sm" variant="secondary">
            <Time format="dd, DD MMMM HH:mm" />
          </Button>
        </div>
        <User />
      </DynamicHeaderWrapper>
      <div className="container max-w-5xl relative w-full p-6 mx-auto md:p-12">
        {
          project.thumbnail &&
          isVideo(project.thumbnail) &&
          <video
            src={project.thumbnail}
            className="w-full aspect-[4/3] rounded-3xl"
            autoPlay
            muted
            loop
            controls={false}
          />
        }
        {
          project.thumbnail &&
          isImage(project.thumbnail) &&
          <Image className="w-full !relative aspect-[4/3] rounded-3xl" src={project.thumbnail} fill alt="thumbnail" />
        }
        {
          !project.thumbnail &&

          <div className="w-full aspect-video bg-muted rounded-3xl"></div>
        }
      </div>
      <div className="w-full border-b">
        <div className="max-w-5xl px-0 py-6 mx-auto md:py-12 sm:py-6 md:px-12 sm:px-6">
          <div className="container space-y-6">
            <div className='w-full space-y-2'>
              <h1 className='text-3xl font-semibold lg:text-5xl text-muted-foreground'>P. {project.name}</h1>
              <p className='text-3xl font-semibold lg:text-5xl'>{project.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="block text-muted-foreground">Published in {createdAt?.year()}</span>
              {
                !!project.part_of.length &&
                project.part_of.map(
                  part =>
                    <span
                      key={"part" + part + "-" + id}
                      className="px-2 w-fit h-fit py-0.5 text-sm bg-muted text-muted-foreground rounded-full"
                    >
                      {part}
                    </span>
                )
              }
            </div>
            <Separator />
            <div className="w-full space-y-4">
              <span className="text-muted-foreground">Tech stack</span>
              {
                project.stack &&
                <ProjectStack
                  stack={project.stack}
                  className="p-0"
                />
              }
            </div>
            {
              !!project.tags.length &&
              <>
                <Separator />
                <div className="w-full space-y-4">
                  <span className="text-muted-foreground">Tags</span>
                  <ProjectTags project_id={String(id)} tags={project.tags} />
                </div>
              </>
            }
            {/* <Separator />
            <div className="w-full space-y-4">
              <span className="text-muted-foreground">Created by </span>
              <div className="grid w-full gap-3 team-avatar-grid auto-rows-auto">
                <div className="rounded-full w-11 h-11 bg-muted" />
              </div>
            </div> */}
            <Separator />
            <div className="flex flex-col w-full h-fit md-layout">
              {
                blocks.map(block => {
                  if (block.type === "text") return (
                    <MDXRemote
                      key={block.id + "-" + block.project_id}
                      source={block.value}
                    />
                  )
                  if (block.type === "image") return <Image src={block.value} className="!relative rounded-xl aspect-[4/3]" fill alt="image-block" />
                })
              }
            </div>
          </div>
        </div>
      </div>
      {randomProject && <ProjectSection project={randomProject} />}
      <Footer />
    </>
  )
}
export default page