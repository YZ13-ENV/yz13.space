"use server"
import { Nav } from '@/components/entities/header';
import { ThemedLogo } from '@/components/shared/theme-logo';
import { User } from '@/components/shared/user';
import { getMDXData } from '@/utils/mdx';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';
import path from 'path';
import { Suspense } from 'react';
import { DateProvider } from '../_components/entities/date';
import { EventsProvider } from '../_components/entities/events';
import { Rulers } from '../_components/entities/rulers';
import { Time } from '../_components/time';
import Background from '../_components/widgets/background';

const HomePageV1 = async () => {
  unstable_noStore()
  const events = getMDXData(path.join(process.cwd(), 'app', 'yz13', 'event', 'events'))
  return (
    <>
      <header className='absolute z-20 top-0 left-0 w-full h-fit p-6 flex items-center justify-between'>
        <ThemedLogo mode="symbol" width={36} height={36} alt="header-logo" />
        <div className="flex items-center gap-4">
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
export default HomePageV1