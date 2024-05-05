import { getProject } from "@/api/projects"
import { HomeHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { Metadata, ResolvingMetadata } from "next"
import { Suspense } from "react"
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

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: project?.name,
    description: project?.description,
    openGraph: {
      images: previousImages,
    },
  }
}

const page = async ({ params }: Props) => {
  const id = params.project
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <ProjectBanner project_id={id} />
      <div className="w-full h-fit py-12 space-y-12">
        <Suspense fallback={<div className="w-full aspect-[4/3] bg-muted animate-pulse" />}>
          <ProjectCharts project_id={id} />
        </Suspense>
      </div>
      <Footer />
    </>
  )
}
export default page