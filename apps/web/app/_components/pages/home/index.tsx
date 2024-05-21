import { Nav } from "@/components/entities/header/ui/nav"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import { getMDXData } from "@/utils/mdx"
import { unstable_noStore } from "next/cache"
import dynamic from "next/dynamic"
import Link from "next/link"
import path from "path"
import { Suspense } from "react"
import { DateProvider } from "../../entities/date"
import { EventsProvider } from "../../entities/events"
import { Rulers } from "../../entities/rulers"
import { ThemeSwitcher } from "../../entities/theme"
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
      <header className='fixed z-20 top-0 w-full h-fit p-6 flex items-center justify-between'>
        <ThemedLogo mode="symbol" width={36} height={36} alt="header-logo" />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <User />
        </div>
      </header>
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
            <Nav exclude={["/"]} />
          </div>
          <DateProvider />
          <EventsProvider events={events} />
          <div className="w-full flex flex-col">

            <Suspense fallback={<div className="w-full h-32 bg-muted animate-pulse" />}>
              <Rulers />
            </Suspense>
            <div className="w-full bg-background h-9 px-3 flex items-center justify-end">
              <div className="flex items-center gap-4">
                <Link href="https://t.me/YZTHECEO" className="text-xs transition-colors text-secondary hover:text-foreground">Telegram</Link>
                <Link href="https://github.com/yz13-env" className="text-xs transition-colors text-secondary hover:text-foreground">Github</Link>
                <Link href="https://github.com/yz13-env/yz13.space" className="text-xs transition-colors text-secondary hover:text-foreground">Source code</Link>
                <ThemedLogo mode="symbol" width={20} height={20} alt="footer-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default HomePage