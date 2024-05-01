import { getProjects } from "@/api/projects"
import { ProjectSection } from "@/app/_components/widgets/project"
import { DefaultHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { Project } from "@/types"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { BiSearch } from "react-icons/bi"
import { MdFilterListAlt } from "react-icons/md"

const page = async () => {
  const { data } = await getProjects()
  const projects: Project[] = data || []
  return (
    <>
      <DefaultHeader trigger={100} />
      <div className="page-wrapper w-full -top-16 relative">
        <div className="w-full pt-32 bg-card">
          <div className="container">
            <h1 className="text-7xl font-semibold">Projects</h1>
          </div>
        </div>
        <div className="w-full py-12 bg-card">
          <div className="container space-y-4">
            <div className="w-full relative">
              <div className="absolute w-16 left-0 h-full flex items-center justify-center">
                <BiSearch size={24} className="text-muted-foreground" />
              </div>
              <Input className="pl-14 text-lg focus-visible:ring focus-visible:ring-primary h-14 rounded-2xl" placeholder="Search projects" />
            </div>
            <Button className="gap-2" variant="secondary">
              <MdFilterListAlt size={16} />
              Filters
            </Button>
          </div>
        </div>
        <div className='w-full h-fit'>
          {
            projects
              .map((item, i) =>
                <ProjectSection reverse={i % 2 !== 0} key={item.id} project={item} />
              )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
export default page