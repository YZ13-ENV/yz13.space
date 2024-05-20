import { getProject } from "@/api/projects"
import { getRepoFile } from "@/api/repo"
import { ThemeSwitcher } from "@/app/_components/entities/theme"
import { CommitsList } from "@/app/_components/widgets/commits"
import { DeploymentsList } from "@/app/_components/widgets/deployments"
import { LanguagesWrapper } from "@/app/_components/widgets/languages"
import { Footer } from "@/components/shared/footer"
import { User } from "@/components/shared/user"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { MDXRemote } from "next-mdx-remote/rsc"
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
  const readme = await getRepoFile(OWNER, REPO, "README.md")
  console.log(readme)
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
          <h1 className="text-6xl font-bold">GIT</h1>
        </div>
      </div>
      {
        readme &&
        <div className="container mt-12">
          <div className="max-w-6xl mx-auto w-full">
            <div className="w-full h-fit border rounded-xl">
              <div className="py-4 px-6 border-b">
                <span>README.md</span>
              </div>
              <div className="md-layout px-6 pb-6">
                <MDXRemote source={readme} />
              </div>
            </div>
          </div>
        </div>
      }
      <div className="container min-h-screen py-12">
        <div className="max-w-6xl space-y-6 mx-auto w-full">
          <div className="w-full space-y-2">
            <LanguagesWrapper owner={OWNER} repo={REPO} />
          </div>
          <div className="flex md:flex-row flex-col gap-6">
            <div className="w-1/3">
              <DeploymentsList owner={OWNER} repo={REPO} />
            </div>
            <div className="w-2/3">
              <CommitsList owner={OWNER} repo={REPO} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default page