import { getProject } from "@/api/projects"
import { Nav } from "@/components/entities/header/ui/nav"
import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import Link from "next/link"
import { Suspense } from "react"
import { BiLeftArrowAlt } from "react-icons/bi"
import { EventsProvider } from "../_components/entities/events"
import { Event } from "../_components/entities/events/store/events-store"
import { Rulers } from "../_components/entities/rulers"
import { Time } from "../_components/time"

type Props = {
  project_id: string
}
const ProjectBanner = async ({ project_id }: Props) => {
  const { data } = await getProject(project_id)
  const project = data ? data[0] : null
  const events: Readonly<Event[]> = await get("events") || []
  return (
    <div className="w-full flex flex-col items-center justify-center relative pt-24 min-h-[40dvh]">
      <div className="w-full mb-20 space-y-6 p-6">
        <h1 className="text-7xl leading-tight text-center w-full font-bold">{project?.name}</h1>
        <div className='w-full flex justify-center gap-2'>
          <Button size="icon" asChild className="border" variant="ghost">
            <Link href="/projects">
              <BiLeftArrowAlt size={18} />
            </Link>
          </Button>
          <Nav />
          <Button className="rounded-full border" variant="ghost">
            <Time format="dd, DD MMMM HH:mm" className="" />
          </Button>
        </div>
      </div>
      {/* <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}> */}
      {/* <Background /> */}
      {/* </Suspense> */}
      <EventsProvider events={events as Event[]} />
      <Suspense fallback={<div className="w-full h-32 bg-muted animate-pulse" />}>
        <Rulers />
      </Suspense>
    </div>
  )
}
export { ProjectBanner }
