import { getProjects } from "@yz13/api/db/project"
import Image from "next/image"
import { SidebarLarge } from "./sidebar-large"

const page = async () => {
  const { data } = await getProjects()
  const projects = (data || [])
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="md:block hidden w-full no-scrollbar overflow-y-auto h-full p-3 space-y-3">
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2 auto-rows-auto h-fit">
          {
            projects.map(pr =>
              <div key={pr.id} className="rounded-xl border border-border/20 relative overflow-hidden w-full aspect-[4/3]">
                {
                  pr.thumbnail &&
                  <Image src={pr.thumbnail} fill className="rounded-xl object-cover" alt="project-thumbnail" />
                }
                <div className="w-fit absolute bottom-3 right-3 flex flex-col items-end gap-1">
                  <span className="px-2 py-1 text-xs rounded-md bg-accents-1 w-fit">{pr.name}</span>
                  {
                    pr.description &&
                    <span className="px-2 py-1 text-xs rounded-md bg-accents-1 w-fit">{pr.description}</span>
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
      <SidebarLarge />
    </div>
  )
}
export default page