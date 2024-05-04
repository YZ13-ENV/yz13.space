import { getProject } from "@/api/projects"
import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { randomNumber } from "@/helpers/random-number"
import { Separator } from "@repo/ui/separator"
import { list, ListBlobResultBlob } from "@vercel/blob"
import { get } from "@vercel/edge-config"
import { unstable_noStore } from "next/cache"
import { EventsProvider } from "../_components/entities/events"
import { Event } from "../_components/entities/events/store/events-store"
import { Rulers } from "../_components/entities/rulers"
import { VideoPlayer } from "../_components/entities/video-player"
import { ProjectCharts } from "../_components/widgets/project-charts"
import { SectionBackgroundBlur, SectionOverlay } from "../_components/widgets/section-switcher/ui/section-template"

type Props = {
  params: {
    project: string
  }
}

const page = async ({ params }: Props) => {
  unstable_noStore()
  const id = params.project
  const { data } = await getProject(id)
  const project = data ? data[0] : null
  const events: Readonly<Event[]> = await get("events") || []
  const blobs = await list({ prefix: "backgrounds" })
  const videos: ListBlobResultBlob[] = blobs.blobs
  const random_index = Math.round(randomNumber(0, videos.length - 2))
  const random_video = videos[random_index]
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="w-full flex flex-col items-center justify-center relative h-[40dvh]">
        <h1 className="text-7xl leading-tight text-center w-full mb-36 font-bold">{project?.name}</h1>
        <VideoPlayer src={random_video?.downloadUrl} className='grayscale' />
        <SectionBackgroundBlur />
        <SectionOverlay />
        <EventsProvider events={events as Event[]} />
        <Rulers />
      </div>
      <div className="w-full flex items-start justify-center h-fit">
        <Nav />
      </div>

      <div className="w-full h-fit py-12 space-y-12">
        <ProjectCharts project_id={id} />
        <Separator />
        <div className="container">
          <section className="border space-y-4 rounded-3xl w-full h-fit p-4">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg">Performance <span className="text-muted-foreground">report</span></h1>
              <div className="w-36 h-9 rounded-full bg-muted"></div>
              <div className="w-24 h-9 rounded-full bg-muted"></div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-4">
              <div className="w-full aspect-square rounded-xl bg-card"></div>
              <div className="w-full aspect-square flex flex-col gap-4">
                <div className="w-full h-1/2 rounded-xl bg-card"></div>
                <div className="w-full h-1/2 rounded-xl bg-card"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

// const page = async ({ params }: Props) => {
//   const id = parseInt(params.project)
//   const { data } = await getProject(id)
//   const projects = await getProjects()
//   const project: Project | null = data ? data[0] || null : null
//   const projectBlocks = await getProjectBlocks(id)
//   const blocks: Block[] = projectBlocks.data ? projectBlocks.data : []
//   const createdAt = project ? dayjs(project.created_at) : undefined
//   const all_without_current = projects.data ? projects.data.filter(pr => parseInt(pr.id) !== id) : []
//   const random = parseInt(randomNumber(0, all_without_current.length - 1).toFixed(0))
//   const randomProject = all_without_current[random]
//   if (!project) return null
//   return (
//     <>
//       <DynamicHeaderWrapper
//         trigger={500}
//         activeClassName="backdrop-blur"
//       >
//         <Link href="/" className='text-2xl font-semibold'>YZ13</Link>
//         <div className="flex items-center gap-3">
//           <Nav />
//           <Button className="hidden rounded-full md:flex bg-muted/50 backdrop-blur-sm" variant="secondary">
//             <Time format="dd, DD MMMM HH:mm" />
//           </Button>
//         </div>
//         <User />
//       </DynamicHeaderWrapper>
//       <div className="container max-w-5xl relative w-full p-6 mx-auto md:p-12">
//         {
//           project.thumbnail &&
//           isVideo(project.thumbnail) &&
//           <video
//             src={project.thumbnail}
//             className="w-full aspect-[4/3] rounded-3xl"
//             autoPlay
//             muted
//             loop
//             controls={false}
//           />
//         }
//         {
//           project.thumbnail &&
//           isImage(project.thumbnail) &&
//           <Image className="w-full !relative aspect-[4/3] rounded-3xl" src={project.thumbnail} fill alt="thumbnail" />
//         }
//         {
//           !project.thumbnail &&

//           <div className="w-full aspect-video bg-muted rounded-3xl"></div>
//         }
//       </div>
//       <div className="w-full border-b">
//         <div className="max-w-5xl px-0 py-6 mx-auto md:py-12 sm:py-6 md:px-12 sm:px-6">
//           <div className="container space-y-6">
//             <div className='w-full space-y-2'>
//               <h1 className='text-3xl font-semibold lg:text-5xl text-muted-foreground'>P. {project.name}</h1>
//               <p className='text-3xl font-semibold lg:text-5xl'>{project.description}</p>
//             </div>
//             <div className="flex flex-col gap-2">
//               <span className="block text-muted-foreground">Published in {createdAt?.year()}</span>
//               {
//                 !!project.part_of.length &&
//                 project.part_of.map(
//                   part =>
//                     <span
//                       key={"part" + part + "-" + id}
//                       className="px-2 w-fit h-fit py-0.5 text-sm bg-muted text-muted-foreground rounded-full"
//                     >
//                       {part}
//                     </span>
//                 )
//               }
//             </div>
//             <Separator />
//             <div className="w-full space-y-4">
//               <span className="text-muted-foreground">Tech stack</span>
//               {
//                 project.stack &&
//                 <ProjectStack
//                   stack={project.stack}
//                   className="p-0"
//                 />
//               }
//             </div>
//             {
//               !!project.tags.length &&
//               <>
//                 <Separator />
//                 <div className="w-full space-y-4">
//                   <span className="text-muted-foreground">Tags</span>
//                   <ProjectTags project_id={String(id)} tags={project.tags} />
//                 </div>
//               </>
//             }
//             {/* <Separator />
//             <div className="w-full space-y-4">
//               <span className="text-muted-foreground">Created by </span>
//               <div className="grid w-full gap-3 team-avatar-grid auto-rows-auto">
//                 <div className="rounded-full w-11 h-11 bg-muted" />
//               </div>
//             </div> */}
//             <Separator />
//             <div className="flex flex-col w-full h-fit md-layout">
//               {
//                 blocks.map(block => {
//                   if (block.type === "text") return (
//                     <MDXRemote
//                       key={block.id + "-" + block.project_id}
//                       source={block.value}
//                     />
//                   )
//                   if (block.type === "image") return <Image src={block.value} className="!relative rounded-xl aspect-[4/3]" fill alt="image-block" />
//                 })
//               }
//             </div>
//           </div>
//         </div>
//       </div>
//       {randomProject && <ProjectSection project={randomProject} />}
//       <Footer />
//     </>
//   )
// }
export default page