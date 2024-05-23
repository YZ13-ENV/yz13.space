import { ProjectKanban } from "@/app/_components/widgets/project-kanban"
import { getProject } from "@yz13/api/db/project"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { SectionContainer } from "../containers"

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
      <SectionContainer className="py-6">
        <h1 className="text-6xl font-bold">Kanban</h1>
      </SectionContainer>
      <SectionContainer className="py-6">
        <ProjectKanban />
      </SectionContainer>
    </>
  )
}
export default page