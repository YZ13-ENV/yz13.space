import { getProject } from "@/api/projects"
import { ThemeSwitcher } from "@/app/_components/entities/theme"
import { ProjectKanban } from "@/app/_components/widgets/project-kanban"
import { User } from "@/components/shared/user"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { ProjectTabsV2 } from "../project-tabs"

type Props = {
  params: {
    project: string
  }
}
dayjs.extend(relativeTime)
const page = async ({ params }: Props) => {
  const OWNER = "YZ13-ENV"
  const REPO = "yz13"
  const id = params.project
  const { data } = await getProject(id)
  const project = data ? data[0] : null
  const created_at = dayjs(project?.created_at).fromNow(true)
  return (
    <>
      <div className="container py-6">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="w-full flex flex-row flex-wrap gap-2">
            <ProjectTabsV2 id={id} />
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <User />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-6xl font-bold">Kanban</h1>
        </div>
      </div>
      <div className="container h-[84dvh] py-12">
        <div className="max-w-6xl mx-auto w-full">
          <ProjectKanban />
        </div>
      </div>
    </>
  )
}
export default page