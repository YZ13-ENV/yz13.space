import { HomeHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { Suspense } from "react"
import { Time } from "../_components/time"
import { Background } from "../_components/widgets/background"
import { CalendarWidget } from "./components/widgets/calendar"

const page = () => {
  const apps = Array.from({ length: 50 }).map((_, i) => i)
  const AppItem = () => {
    return (
      <div className="w-fit flex h-fit flex-col gap-1">
        <div className="w-16 aspect-square rounded-3xl bg-accents-2" />
        <span className="text-center text-sm">App</span>
      </div>
    )
  }
  return (
    <>
      <HomeHeader className='absolute z-20 top-0 w-full h-fit p-6' />
      <div className="relative pt-20 w-full min-h-screen">
        <div className="w-full py-12 flex flex-col items-center justify-center gap-2">
          <Time format="HH:mm" className="text-9xl font-bold text-center" />
          <Time format="dddd, MMMM DD" className="text-2xl text-center font-medium" />
          <div className="grid w-full mx-auto h-fit widgets-grid gap-4 max-w-5xl my-12 px-6">
            <CalendarWidget />
          </div>
        </div>
        <div className="w-full max-h-[40dvh] md:block hidden h-full">
          <div className="max-w-md w-full mx-auto px-6">
            <div className="w-full h-16 bg-accents-1 rounded-xl"></div>
          </div>
        </div>
        <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
      </div>
      <div className="w-full min-h-screen py-12">
        <div className="container max-w-5xl grid apps-widget-grid gap-12">
          {
            apps.map(app =>
              <AppItem key={app} />
            )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
export default page