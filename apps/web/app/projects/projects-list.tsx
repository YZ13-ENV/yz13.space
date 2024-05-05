import { getProjects } from "@/api/projects"
import { unstable_noStore } from "next/cache"
import { ProjectCard } from "../_components/entities/project"

const ProjectsList = async () => {
  unstable_noStore()
  const { data } = await getProjects()
  return (
    <>
      {
        data &&
        data.map(
          pr =>
            <ProjectCard key={pr.id} project={pr} />
        )
      }
    </>
  )
}
export { ProjectsList }
