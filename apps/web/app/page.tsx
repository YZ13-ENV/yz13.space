"use server"
import { HomeHeader } from '@/components/entities/header'
import { switcher_delay } from '@/const/default-settings'
import { SectionSwitcher, sections } from './_components/widgets/section-switcher'



export default async function Home() {
  return (
    <>
      <div className='fixed z-10 top-0 w-full p-6'>
        <HomeHeader />
      </div>
      <div className="relative w-full h-screen">
        <SectionSwitcher
          className="h-[90dvh]"
          delay={switcher_delay}
          sections={sections}
        />
      </div>
    </>

  )
}
