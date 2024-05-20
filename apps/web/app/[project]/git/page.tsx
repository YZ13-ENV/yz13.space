import { getProject } from "@/api/projects"
import { getRepoFile } from "@/api/repo"
import { CommitsList } from "@/app/_components/widgets/commits"
import { DeploymentsList } from "@/app/_components/widgets/deployments"
import { LanguagesWrapper } from "@/app/_components/widgets/languages"
import { Footer } from "@/components/shared/footer"
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
  const readme = await getRepoFile(OWNER, REPO, "README.md")
  return (
    <>
      <SectionContainer className="py-6">
        <h1 className="text-6xl font-bold">GIT</h1>
      </SectionContainer>
      {/* {
        readme &&
        <div className="container mt-12">
          <div className="max-w-md mx-auto w-full">
            <div className="w-full h-fit border rounded-xl">
              <div className="py-4 px-6 flex items-center justify-center w-full border-b">
                <span>README.md</span>
              </div>
              <div className="md-layout px-6 pb-6">
                <MDXRemote source={readme} />
              </div>
            </div>
          </div>
        </div>
      } */}
      <SectionContainer className="py-6 space-y-6 mx-auto w-full">
        <div className="w-full space-y-2">
          <LanguagesWrapper owner={OWNER} repo={REPO} />
        </div>
        <div className="flex md:flex-row flex-col gap-6">
          <div className="lg:w-1/3 md:w-1/2 w-full">
            <DeploymentsList owner={OWNER} repo={REPO} />
          </div>
          <div className="lg:w-2/3 md:w-1/2 w-full">
            <CommitsList owner={OWNER} repo={REPO} />
          </div>
        </div>
      </SectionContainer>
      <Footer className="" />
    </>
  )
}
export default page