import { getProject } from "@/api/projects"
import { Footer } from "@/components/shared/footer"
import { User } from "@/components/shared/user"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/info-accordion"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { BiBarChart, BiImage, BiListUl, BiTimer } from "react-icons/bi"
import { ThemeSwitcher } from "../_components/entities/theme"
import { ProjectTabsV2 } from "./project-tabs"

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
  const created_at = dayjs(project?.created_at).fromNow(true)
  if (!tab) return redirect(`/${id}?tab=speed-insights`)
  return (
    <>
      {/* <div className="w-full bg-accents-1 border-y">
        <div className="container py-6">
          <div className="w-full h-fit flex items-center justify-between gap-2">
            <h1 className="text-5xl font-medium">{project?.name}</h1>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <User />
            </div>
          </div>
        </div>
      </div> */}
      <div className="container py-6">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="w-full flex flex-row flex-wrap gap-2">
            <ProjectTabsV2 />
          </div>
          <div className="flex items-center gap-4">
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
        <div className="max-w-6xl mx-auto w-full flex gap-6">
          <div className="w-1/3 h-full">
            <div className="relative overflow-hidden w-full aspect-[16/10] bg-accents-1 rounded-xl">
              {
                project?.thumbnail
                  ? <Image src={project.thumbnail} fill alt="project-thumbnail" />
                  : <div className="w-full h-full flex items-center justify-center"><BiImage size={48} className="text-secondary" /></div>
              }
            </div>
          </div>
          <div className="w-2/3 h-full space-y-3">
            <div className="flex flex-wrap gap-3">

              <div className="flex flex-col justify-center">
                <span className="text-sm text-secondary">Status</span>
                <span className="text-sm text-foreground">{project?.status}</span>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-sm text-secondary">Duration</span>
                <span className="text-sm text-foreground">{created_at}</span>
              </div>

            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-secondary">Domain</span>
              <Link href={project?.link || ""} className="text-sm hover:underline text-foreground">{project?.link}</Link>
            </div>
            {/* <div className="flex flex-col justify-center">
              <span className="text-sm text-secondary">Source</span>
              <span className="text-sm text-foreground">hash</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto py-6 space-y-6 bg-accents-1/50 rounded-t-3xl border-x border-t">
        <section className="container space-y-6">
          <h3 className="text-2xl font-bold">Project details</h3>
          <div className="rounded-xl bg-accents-1 border">
            <Accordion type="multiple" className="divide-y">
              <AccordionItem value="metrics">
                <AccordionTrigger>Last performance metrics</AccordionTrigger>
                <AccordionContent>
                  ...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="user-experience">
                <AccordionTrigger>User experience</AccordionTrigger>
                <AccordionContent>
                  ...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="commits">
                <AccordionTrigger>Commits</AccordionTrigger>
                <AccordionContent>
                  ...
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="task-in-progress">
                <AccordionTrigger>Task in progress</AccordionTrigger>
                <AccordionContent>
                  ...
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <div className="container">
          <div className="w-full h-24 grid-cols-3 grid-rows-1 gap-6 grid">
            <div className="w-full h-full rounded-xl bg-accents-1 border p-4 flex items-center justify-center gap-3 hover:bg-accents-2/70 cursor-pointer">
              <div className="p-2 bg-accents-2 aspect-square rounded-full border">
                <BiBarChart size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm text-foreground">Analytics</span>
                <span className="text-xs text-secondary">Analyze data & traffic metrics</span>
              </div>
            </div>
            <div className="w-full h-full rounded-xl bg-accents-1 border p-4 flex items-center justify-center gap-3 hover:bg-accents-2/70 cursor-pointer">
              <div className="p-2 bg-accents-2 aspect-square rounded-full border">
                <BiTimer size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm text-foreground">Speed insights</span>
                <span className="text-xs text-secondary">View performance metrics</span>
              </div>
            </div>
            <div className="w-full h-full rounded-xl bg-accents-1 border p-4 flex items-center justify-center gap-3 hover:bg-accents-2/70 cursor-pointer">
              <div className="p-2 bg-accents-2 aspect-square rounded-full border">
                <BiListUl size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm text-foreground">Details</span>
                <span className="text-xs text-secondary">View project details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="bg-accents-1/50 max-w-6xl mx-auto border-x border-t mt-auto" />
    </>
  )
}
export default page