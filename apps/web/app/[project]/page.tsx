import { getProject } from "@/api/projects"
import { DefaultHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@repo/ui/breadcrumb"
import { Button } from "@repo/ui/button"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { BiGlobe } from "react-icons/bi"
import { BsSlash } from "react-icons/bs"
import { CommitsList } from "../_components/widgets/commits"
import { DeploymentsList } from "../_components/widgets/deployments"
import { LanguagesWrapper } from "../_components/widgets/languages"
import { ProjectCharts } from "../_components/widgets/project-charts"
import { ProjectKanban } from "../_components/widgets/project-kanban"
import { ProjectTabs } from "./project-tabs"

type Props = {
  params: {
    project: string
  }
  searchParams: {
    tab?: string
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
const page = async ({ params, searchParams }: Props) => {
  const tab = searchParams.tab
  const OWNER = "YZ13-ENV"
  const REPO = "yz13"
  const id = params.project
  const { data } = await getProject(id)
  const project = data ? data[0] : null
  return (
    <>
      <DefaultHeader className='z-20 w-full p-6 h-fit bg-accents-1' />
      <div className="w-full h-fit">
        <div className="w-full bg-accents-1 border-y">
          <div className="container pt-3">
            <div className="w-fit mb-2 h-fit flex items-center gap-2">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <BsSlash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/${id}`}>{project?.name || id}</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-5xl font-medium">{project?.name}</h1>
              <div className="flex items-center justify-end gap-2">
                <Button size="default" asChild>
                  <Link target="_blank" href={project?.link || "/"} className="inline-flex items-center gap-2">
                    <BiGlobe size={16} />
                    <span className="text-inherit">Visit</span>
                  </Link>
                </Button>
              </div>
            </div>
            <ProjectTabs id={id} />
          </div>
        </div>
        {
          tab === "speed-insights" &&
          <section className="w-full space-y-6 py-12">
            <div className="container">
              <h2 className="text-4xl font-bold">Speed insights</h2>
            </div>
            <Suspense fallback={<div className="w-full aspect-[4/3] bg-muted animate-pulse" />}>
              <ProjectCharts project_id={id} />
            </Suspense>
          </section>
        }
        {
          tab === "kanban" &&
          <section className="w-full h-[70dvh]">
            <div className="container h-full">
              <Suspense fallback={<div className="w-full aspect-[4/3] bg-muted animate-pulse" />}>
                <ProjectKanban />
              </Suspense>
            </div>
          </section>
        }
        <Separator />
        <div className="py-12 bg-accents-1">
          <div className="container flex lg:flex-row gap-6 flex-col items-start">
            <section className="w-full lg:max-w-sm space-y-6 shrink-0">
              <h3 className="text-xl font-semibold">Deployments</h3>
              <Suspense fallback={<div className="w-full h-64 rounded-lg bg-accents-2 animate-pulse" />}>
                <DeploymentsList owner={OWNER} repo={REPO} />
              </Suspense>
            </section>
            <section className="w-full space-y-6">
              <h3 className="text-xl font-semibold">Details</h3>
              <div className="w-full space-y-12">
                <div className="w-full space-y-3">
                  <span className="text-base font-medium">Languages</span>
                  <Suspense fallback={<div className="w-full h-64 rounded-lg bg-accents-2 animate-pulse" />}>
                    <LanguagesWrapper owner={OWNER} repo={REPO} />
                  </Suspense>
                </div>
                <div className="w-full space-y-3">
                  <span>Commits</span>
                  <Suspense fallback={<div className="w-full h-64 rounded-xl bg-accents-2 animate-pulse" />}>
                    <CommitsList owner={OWNER} repo={REPO} />
                  </Suspense>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Separator />
      </div>
      <Footer className="bg-accents-1" />
    </>
  )
}
export default page