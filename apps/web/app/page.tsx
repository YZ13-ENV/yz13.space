"use server"
import { getProjects } from '@/api/projects'
import { HomeHeader } from '@/components/entities/header'
import { Footer } from '@/components/shared/footer'
import { switcher_delay } from '@/const/default-settings'
import { Project } from '@/types'
import { AppsGrid } from './_components/apps-grid'
// import { ProjectSection } from './_components/widgets/project/ui/project-section'
import { SectionSwitcher, sections } from './_components/widgets/section-switcher'



export default async function Home() {
  const { data } = await getProjects()
  const projects: Project[] = data ? data : []
  return (
    <>
      <HomeHeader />
      <div className="relative w-full min-h-screen -top-16">
        <SectionSwitcher
          className="h-[80dvh]"
          delay={switcher_delay}
          sections={sections}
        />
        <AppsGrid className='min-h-[30dvh] py-6' projects={projects} />
        <div className='w-full h-fit'>
          {
            // projects
            //   .map((item, i) =>
            //     <ProjectSection reverse={i % 2 !== 0} key={item.id} project={item} />
            //   )
          }
        </div>
      </div >
      <Footer />
    </>

  )
}
