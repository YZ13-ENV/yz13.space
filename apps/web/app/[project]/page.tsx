import { getProject } from "@/api/projects"
import { HomeHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Metadata, ResolvingMetadata } from "next"
import { Suspense } from "react"
import { CommitsList } from "../_components/widgets/commits"
import { DeploymentsList } from "../_components/widgets/deployments"
import { LanguagesWrapper } from "../_components/widgets/languages"
import { ProjectCharts } from "../_components/widgets/project-charts"
import { ProjectBanner } from "./project-banner"
type Props = {
  params: {
    project: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
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
  return (
    <>
      <HomeHeader className='fixed top-0 z-20 w-full p-6 h-fit' />
      <ProjectBanner project_id={id} />
      <div className="w-full py-24 h-fit">
        <section className="w-full space-y-6 py-12">
          <div className="container">
            <h2 className="text-4xl font-bold">Speed insights</h2>
          </div>
          <Suspense fallback={<div className="w-full aspect-[4/3] bg-muted animate-pulse" />}>
            <ProjectCharts project_id={id} />
          </Suspense>
        </section>
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
      <Footer />
    </>
  )
}
export default page