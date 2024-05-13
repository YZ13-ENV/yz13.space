import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { Button } from "@repo/ui/button"
import { Separator } from "@repo/ui/separator"
import { Metadata } from "next"
import { unstable_noStore } from "next/cache"
import { Suspense } from "react"
import { Time } from "../_components/time"
import { Background } from "../_components/widgets/background"
import { ProjectsList } from "./projects-list"

export const metadata: Metadata = {
  title: "Projects",
};


const page = async () => {
  unstable_noStore()
  return (
    <>
      <HomeHeader className='fixed top-0 z-20 w-full p-6 h-fit' />
      <div className="w-full flex flex-col items-center justify-center relative pt-24 min-h-[40dvh]">
        <div className="w-full p-6 mb-20 space-y-6">
          <h1 className="w-full font-bold leading-tight text-center text-7xl">Projects</h1>
          <div className='flex justify-center w-full gap-2'>
            <Nav />
            <Button className="border rounded-full bg-background/50 backdrop-blur" variant="secondary">
              <Time format="dd, DD MMMM HH:mm" className="" />
            </Button>
          </div>
        </div>
        <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
      </div>
      <Separator />
      <div className="w-full h-fit py-12 min-h-screen">
        {/* <div className="relative w-full h-fit">
          <div className="container">
            <div className="relative w-full">
              <div className="absolute left-0 flex items-center justify-center w-12 h-12">
                <BiSearch size={20} className="text-muted-foreground" />
              </div>
              <Input className="h-12 pl-12 text-base bg-background focus-visible:ring-2 rounded-xl" placeholder="Search projects" />
            </div>
          </div>
        </div> */}
        <div className="relative w-full h-fit mt-12">
          <div className="container grid w-full grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2 auto-rows-auto h-fit">
            <Suspense fallback={
              <>
                <div className="w-full h-36 bg-muted rounded-xl animate-pulse" />
              </>
            }>
              <ProjectsList />
            </Suspense>
          </div>
        </div>
      </div>
      <Separator />
      <Footer className="bg-accents-1" />
    </>
  )
}

// const page = async () => {
//   const { data } = await getProjects()
//   const projects: Project[] = data || []
//   return (
//     <>
//       <DefaultHeader trigger={100} />
//       <div className="relative w-full page-wrapper -top-16">
//         <div className="w-full pt-32 bg-card">
//           <div className="container">
//             <h1 className="font-semibold text-7xl">Projects</h1>
//           </div>
//         </div>
//         <div className="w-full py-12 bg-card">
//           <div className="container space-y-4">
//             <div className="relative w-full">
//               <div className="absolute left-0 flex items-center justify-center w-16 h-full">
//                 <BiSearch size={24} className="text-muted-foreground" />
//               </div>
//               <Input className="text-lg pl-14 focus-visible:ring focus-visible:ring-primary h-14 rounded-2xl" placeholder="Search projects" />
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