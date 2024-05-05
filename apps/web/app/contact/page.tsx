import { user as user_api } from "@/api/user"
import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { Button } from "@repo/ui/button"
import { get } from "@vercel/edge-config"
import { Metadata } from "next"
import { unstable_noStore } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { BiChevronRight } from "react-icons/bi"
import { BsGithub, BsTelegram } from "react-icons/bs"
import { EventsProvider } from "../_components/entities/events"
import { Event } from "../_components/entities/events/store/events-store"
import { Rulers } from "../_components/entities/rulers"
import { Time } from "../_components/time"
import { Background } from "../_components/widgets/background"

export const metadata: Metadata = {
  title: "Contact",
};

const page = async () => {
  unstable_noStore()
  const events: Readonly<Event[]> = await get("events") || []
  const user = await user_api.get()
  return (
    <>
      <HomeHeader className='fixed top-0 z-20 w-full p-6 h-fit' />
      <div className="w-full flex flex-col items-center justify-center relative pt-24 min-h-[40dvh]">
        <div className="w-full p-6 mb-20 space-y-6">
          <h1 className="w-full font-bold leading-tight text-center text-7xl">Contact</h1>
          <div className='flex justify-center w-full gap-2'>
            <Nav />
            <Button className="border rounded-full bg-muted/50 backdrop-blur-sm" variant="secondary">
              <Time format="dd, DD MMMM HH:mm" className="" />
            </Button>
          </div>
        </div>
        <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
        <EventsProvider events={events as Event[]} />
        <Suspense fallback={<div className="w-full h-32 bg-muted animate-pulse" />}>
          <Rulers />
        </Suspense>
      </div>
      <div className="container py-12">
        <div className="grid w-full auto-rows-auto contact-card-grid">
          <div className="w-full p-4 space-y-3 border h-fit bg-card rounded-xl">
            <div className="relative w-full overflow-hidden aspect-square bg-muted rounded-xl">
              {
                user &&
                <Image src={user.avatar_url} fill alt={user.login} />
              }
            </div>
            <div className="w-full space-y-1.5">
              <section className="flex items-center justify-between w-full gap-2">
                <h3 className="text-lg">Vladimir</h3>
                <span className="text-sm text-muted-foreground">@YZ13</span>
              </section>
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-sm text-muted-foreground">Frontend developer</span>
                <span className="text-sm text-muted-foreground">Russia</span>
              </div>
            </div>
            <ul className="w-full overflow-hidden border divide-y rounded-xl bg-card">
              <li>
                <Link target="_blank" href="https://t.me/YZTHECEO" className="inline-flex items-center justify-between w-full h-10 px-3 text-sm transition-colors hover:bg-muted">
                  <span className="inline-flex items-center gap-2">
                    <BsTelegram size={18} />
                    <span>@YZTHECEO</span>
                  </span>
                  <BiChevronRight size={18} />
                </Link>
              </li>
              <li>
                <Link target="_blank" href="https://github.com/yz13-env" className="inline-flex items-center justify-between w-full h-10 px-3 text-sm transition-colors hover:bg-muted">
                  <span className="inline-flex items-center gap-2">
                    <BsGithub size={18} />
                    <span>YZ13-ENV</span>
                  </span>
                  <BiChevronRight size={18} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-48"></div>
      <Footer />
    </>
  )
}
export default page