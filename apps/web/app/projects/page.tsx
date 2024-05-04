import { getProjects } from "@/api/projects"
import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { randomNumber } from "@/helpers/random-number"
import { Input } from "@repo/ui/input"
import { list, ListBlobResult, ListBlobResultBlob } from "@vercel/blob"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
import { BiSearch } from "react-icons/bi"
import { EventsProvider } from "../_components/entities/events"
import { Event } from "../_components/entities/events/store/events-store"
import { ProjectCard } from "../_components/entities/project"
import { Rulers } from "../_components/entities/rulers"
import { VideoPlayer } from "../_components/entities/video-player"
import { SectionBackgroundBlur, SectionOverlay } from "../_components/widgets/section-switcher/ui/section-template"

const page = async () => {
  unstable_noStore()
  // const insights_projects = await insightsProjects()
  const { data } = await getProjects()
  const background_mode = await get("background_mode")
  const isLocalMode = background_mode === "local"
  const events: Readonly<Event[]> = await get("events") || []
  const blobs: ListBlobResult = isLocalMode ? { blobs: [], hasMore: false } : await list({ prefix: "backgrounds" })
  const videos: ListBlobResultBlob[] = blobs.blobs
  const random_index = Math.round(randomNumber(0, videos.length - 2))
  const random_video = videos[random_index]
  const local_video = "/background/fallback-background.mp4"

  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="w-full flex flex-col items-center justify-center relative h-[40dvh]">
        <h1 className="text-7xl leading-tight text-center w-full mb-36 font-bold">Projects</h1>
        <VideoPlayer src={isLocalMode ? local_video : random_video?.downloadUrl} className='grayscale' />
        <SectionBackgroundBlur />
        <SectionOverlay />
        <EventsProvider events={events as Event[]} />
        <Rulers />
      </div>
      <div className="w-full flex items-start justify-center h-fit">
        <Nav />
      </div>
      <div className="relative w-full h-fit py-12">
        <div className="container">
          <div className="w-full relative">
            <div className="w-12 h-12 flex items-center absolute left-0 justify-center">
              <BiSearch size={20} className="text-muted-foreground" />
            </div>
            <Input className="pl-12 h-12 focus-visible:ring-2 rounded-xl text-base" placeholder="Search projects" />
          </div>
        </div>
      </div>
      <div className="relative w-full min-h-screen">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-auto h-fit gap-6 w-full container">
          {
            data &&
            data.map(
              pr =>
                <ProjectCard key={pr.id} project={pr} />
            )
          }
        </div>
      </div>
      <div className="w-full h-36" />
      <Footer />
    </>
  )
}

// const page = async () => {
//   const { data } = await getProjects()
//   const projects: Project[] = data || []
//   return (
//     <>
//       <DefaultHeader trigger={100} />
//       <div className="page-wrapper w-full -top-16 relative">
//         <div className="w-full pt-32 bg-card">
//           <div className="container">
//             <h1 className="text-7xl font-semibold">Projects</h1>
//           </div>
//         </div>
//         <div className="w-full py-12 bg-card">
//           <div className="container space-y-4">
//             <div className="w-full relative">
//               <div className="absolute w-16 left-0 h-full flex items-center justify-center">
//                 <BiSearch size={24} className="text-muted-foreground" />
//               </div>
//               <Input className="pl-14 text-lg focus-visible:ring focus-visible:ring-primary h-14 rounded-2xl" placeholder="Search projects" />
//             </div>
//             <Button className="gap-2" variant="secondary">
//               <MdFilterListAlt size={16} />
//               Filters
//             </Button>
//           </div>
//         </div>
//         <div className='w-full h-fit'>
//           {
//             projects
//               .map((item, i) =>
//                 <ProjectSection reverse={i % 2 !== 0} key={item.id} project={item} />
//               )
//           }
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }
export default page