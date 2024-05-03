import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { randomNumber } from "@/helpers/random-number"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Separator } from "@repo/ui/separator"
import { list, ListBlobResultBlob } from "@vercel/blob"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
import { BiDotsHorizontalRounded, BiGroup, BiRightArrowAlt, BiSearch, BiShow, BiStar, BiTime } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { GrStatusGoodSmall } from "react-icons/gr"
import { EventsProvider } from "../_components/entities/events"
import { Event } from "../_components/entities/events/store/events-store"
import { Rulers } from "../_components/entities/rulers"
import { VideoPlayer } from "../_components/entities/video-player"
import { SectionBackgroundBlur, SectionOverlay } from "../_components/widgets/section-switcher/ui/section-template"

const page = async () => {
  unstable_noStore()
  const events: Readonly<Event[]> = await get("events") || []
  const blobs = await list({ prefix: "backgrounds" })
  const videos: ListBlobResultBlob[] = blobs.blobs
  const random_index = Math.round(randomNumber(0, videos.length - 2))
  const random_video = videos[random_index]
  const Project = () => {
    return (
      <div className="w-full h-fit flex flex-col gap-4 border hover:border-primary transition-colors p-4 cursor-pointer rounded-xl">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-muted" />
            <div className="flex flex-col justify-center">
              <span className="text-base">Project-name</span>
              <span className="text-muted-foreground text-sm">https://project-name.com</span>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="text-muted-foreground"><BiRightArrowAlt size={24} /></Button>
        </div>
        <div className="w-full flex items-center justify-between gap-3">
          <span className="inline-flex border items-center w-fit h-fit gap-1 rounded-full bg-muted/50 px-2.5 py-1">
            <BsGithub size={16} className="" />
            <span className="text-sm">nickname/repo-id</span>
          </span>
          <div className="flex items-center gap-2">
            <Button className="w-8 h-8" size="icon" variant="ghost">
              <BiStar size={18} className="text-muted-foreground" />
            </Button>
            <Button className="w-8 h-8" size="icon" variant="ghost">
              <BiDotsHorizontalRounded size={18} className="text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div className="w-full h-10 p-1 rounded-lg border gap-1 flex items-center">
          <div className="w-1/4 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
            <BiGroup size={18} />
            <span className="text-sm">10</span>
          </div>
          <Separator orientation="vertical" />
          <div className="w-1/4 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
            <BiShow size={18} />
            <span className="text-sm">1.1k</span>
          </div>
          <Separator orientation="vertical" />
          <div className="w-1/4 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
            <BiTime size={18} />
            <span className="text-sm">10 h.</span>
          </div>
          <Separator orientation="vertical" />
          <div className="w-1/4 h-full flex bg-green-900/60 group/status hover:bg-green-600 transition-colors p-1 rounded-md items-center justify-center gap-1">
            <GrStatusGoodSmall size={10} className="transition-colors text-green-600 group-hover/status:text-accent-foreground" />
            <span className="transition-colors text-sm text-green-600 group-hover/status:text-accent-foreground">Good</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="w-full flex flex-col items-center justify-center relative h-[40dvh]">
        <h1 className="text-7xl leading-tight text-center w-full mb-36 font-bold">Projects</h1>
        <VideoPlayer src={random_video?.downloadUrl} className='grayscale' />
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
          <Project /><Project /><Project />
          <Project /><Project /><Project />
          <Project /><Project /><Project />
          <Project /><Project /><Project />
          <Project /><Project /><Project />
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