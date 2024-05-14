import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { getMDXData } from "@/utils/mdx"
import { unstable_noStore } from "next/cache"
import dynamic from "next/dynamic"
import path from "path"
import { Suspense } from "react"
import { DateProvider } from "../../entities/date"
import { EventsProvider } from "../../entities/events"
import { Rulers } from "../../entities/rulers"
import { Time } from "../../time"
const Background = dynamic(() => import("../../widgets/background"), {
  ssr: false,
  loading: () => <div className="w-full h-full absolute z-[-3] bg-muted animate-pulse" />
})

const HomePage = async () => {
  unstable_noStore()
  const events = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  return (
    <>
      <HomeHeader className='fixed z-20 top-0 w-full h-fit p-6' />
      <div className="relative w-full h-screen">
        <Suspense fallback={<div className="w-full h-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
        <div className='w-full lg:h-[60%] h-[40%] pt-20 flex flex-col items-center justify-center gap-6'>
          <Time format="HH:mm" className="text-[12.5dvw] font-bold text-center" />
          <Time format="dddd, MMMM DD" className="text-2xl text-center font-medium" />
          <div className="space-y-2">
          </div>
        </div>
        <div className="w-full lg:h-[40%] h-[60%] pt-6 flex flex-col overflow-y-hidden justify-between">
          <div className='w-full flex justify-center gap-2'>
            <Nav />
          </div>
          <DateProvider />
          <EventsProvider events={events} />
          <Suspense fallback={<div className="w-full h-32 bg-muted animate-pulse" />}>
            <Rulers />
          </Suspense>
        </div>
      </div>
    </>
  )
}
export default HomePage