import { getProject } from "@/api/projects"
import { getRepoCommits, getRepoDeployments, getRepoEvents, getRepoLanguages } from "@/api/repo"
import { HomeHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { groupBy, keys } from "lodash"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import { AiOutlineDeploymentUnit } from "react-icons/ai"
import { MdCommit } from "react-icons/md"
import { RiGitRepositoryCommitsLine } from "react-icons/ri"
import { ProjectCharts } from "../_components/widgets/project-charts"
import { ProjectBanner } from "./project-banner"
type Props = {
  params: {
    project: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.project

  const { data } = await getProject(id)
  const project = data ? data[0] : null
  return {
    title: project?.name,
    description: project?.description,
  }
}
dayjs.extend(relativeTime)
const page = async ({ params }: Props) => {
  const id = params.project
  const events = await getRepoEvents("YZ13-ENV", "yz13")
  const deployments: any[] = await getRepoDeployments("YZ13-ENV", "yz13")
  const stack: any = await getRepoLanguages("YZ13-ENV", "yz13")
  const stack_keys = keys(stack)
  const stack_values = stack_keys.map(item => stack[item])
  const stack_sum: number = stack_values.length !== 0 ? stack_values.reduce((a, b) => a + b) : 0
  const commits: any[] = await getRepoCommits("YZ13-ENV", "yz13")
  const grouped_commits = groupBy(commits, item => dayjs(item.commit.committer.date).format("YYYY-MM-DD"))
  const grouped_commits_keys = keys(grouped_commits)
  return (
    <>
      <HomeHeader className='fixed top-0 z-20 w-full p-6 h-fit' />
      <ProjectBanner project_id={id} />
      <div className="w-full py-24 h-fit">
        <section className="w-full space-y-6 py-12">
          <div className="container">
            <h2 className="text-4xl font-bold">Speed insights</h2>
          </div>
          <Suspense fallback={<div className="w-full aspect-[4/3] bg-muted animate-pulse" />}>
            <ProjectCharts project_id={id} />
          </Suspense>
        </section>
        <Separator />
        <div className="py-12 bg-accents-1">
          <div className="container flex lg:flex-row gap-6 flex-col items-start">
            <section className="w-full max-w-sm space-y-6 shrink-0">
              <h3 className="text-xl font-semibold">Deployments</h3>
              <div className="w-full space-y-3">
                {
                  deployments
                    .filter((_, i) => i <= 4)
                    .map(
                      (dep: any) => <div key={dep.id} className="w-full p-4 space-y-2 transition-colors bg-accents-1 group/deployment border cursor-pointer hover:border-accents-8 rounded-xl">
                        <div className="w-full">
                          <div className="flex items-center gap-2">
                            <div className="relative flex items-center justify-center rounded-full w-9 h-9 bg-accents-2">
                              <AiOutlineDeploymentUnit size={20} />
                              <div className="absolute w-5 h-5 border-2 rounded-full -bottom-1 -right-1 border-background bg-accents-1">
                                <Image src={dep.creator.avatar_url} className="rounded-full" width={20} height={20} alt="deploy-creator-avatar" />
                              </div>
                            </div>
                            <div className="flex flex-col justify-center">
                              <span>{dep.environment}</span>
                              <span className="text-xs text-secondary">by {dep.creator.login}</span>
                            </div>
                          </div>
                        </div>
                        {
                          dep.description &&
                          <div className="w-full">
                            <span className="text-xs text-secondary">{dep.description}</span>
                          </div>
                        }
                        <div className="w-full">
                          <span className="text-xs text-secondary">{dayjs(dep.created_at).format("DD MMMM YYYY, HH:mm")}</span>
                        </div>
                      </div>
                    )
                }
              </div>
            </section>
            <section className="w-full space-y-6">
              <h3 className="text-xl font-semibold">Details</h3>
              <div className="w-full space-y-12">
                <div className="w-full space-y-3">
                  <span className="text-base font-medium">Languages</span>
                  <div className="flex items-center w-full h-10 gap-1 p-1 border-accents-2 border rounded-lg">
                    {
                      stack_keys.map(
                        key => {
                          const stack_value: number = stack[key]
                          const percent = ((stack_value / stack_sum) * 100).toFixed(1)
                          return (
                            <div
                              key={"bar-" + key} style={{ width: `${percent}%` }}
                              className="w-full h-full min-w-6 rounded-md bg-accents-1 border border-accents-2 flex items-center justify-center hover:bg-muted cursor-pointer transition-colors"
                            >
                              <span className="text-xs text-accents-7">{percent}</span>
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                  <div className="flex flex-wrap items-start w-full gap-1">
                    {
                      stack_keys.map(key => {
                        const stack_value: number = stack[key]
                        const percent = ((stack_value / stack_sum) * 100).toFixed(1)
                        return <div key={key} className="flex items-center gap-1 px-2 rounded-md bg-accents-2 py-1">
                          <span className="text-xs font-medium text-accent-foreground">{key}</span>
                          <span className="text-xs text-secondary">{percent}%</span>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <span>Commits</span>
                  <div className="w-full space-y-6">

                    {
                      grouped_commits_keys.map(
                        key => {
                          const group = grouped_commits[key] || []
                          const created_at = dayjs(key).fromNow()
                          return (
                            <div key={"commits-group-" + key} className="w-full py-2 relative flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-9 h-9 relative z-[1] bg-accents-2 border-2 border-accents-1 inline-flex rounded-full items-center justify-center">
                                  <RiGitRepositoryCommitsLine size={18} />
                                </div>
                                <span>{created_at} was added {group.length} commits</span>
                              </div>
                              <ul className="w-full space-y-2">
                                {
                                  group.map(
                                    commit => {
                                      const commit_id = commit.sha.slice(0, 7)
                                      // const created_at = dayjs(commit.commit.committer.date).fromNow()
                                      return (
                                        <li key={commit.sha} className="w-full group/commit hover:bg-accents-2 transition-colors cursor-pointer p-1 rounded-lg">
                                          <div className="w-full flex items-center gap-2">
                                            <div className="w-7 z-[1] shrink-0 h-7 inline-flex rounded-full bg-accents-2 border-2 border-accents-1 items-center justify-center">
                                              <MdCommit size={18} />
                                            </div>
                                            <div className="w-full space-x-2">
                                              <div className="inline-block w-fit h-fit space-x-2">
                                                <Image src={commit.committer.avatar_url} className="mb-0.5 inline-block rounded-full" width={20} height={20} alt={commit.committer.name} />
                                                <span className="text-sm text-secondary">{commit.committer.login}</span>
                                              </div>
                                              <span className="text-sm px-2 rounded-md group-hover/commit:bg-accents-1 transition-colors bg-accents-2">{commit_id}</span>
                                              <span className="text-sm">{commit.commit.message}</span>
                                            </div>
                                          </div>
                                        </li>
                                      )
                                    }
                                  )
                                }
                              </ul>
                              <Separator orientation="vertical" className="absolute bg-accents-2 left-[17px] -top-0.5" />
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Separator />
      </div>
      <Footer />
    </>
  )
}
export default page