import { Separator } from "@repo/ui/separator"
import { getRepoCommits } from "@yz13/api/gh/repo"
import { Commit as CommitType } from "@yz13/api/gh/types"
import dayjs from "dayjs"
import { groupBy, keys } from "lodash"
import { RiGitRepositoryCommitsLine } from "react-icons/ri"
import { Commit } from "./commit"

type Props = {
  owner: string
  repo: string
}
const CommitsList = async ({ owner, repo }: Props) => {
  const commits: CommitType[] = await getRepoCommits(owner, repo)
  const grouped_commits = groupBy(commits, item => dayjs(item.commit.committer.date).format("YYYY-MM-DD"))
  const grouped_commits_keys = keys(grouped_commits)
  return (
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
                <ul className="w-full px-0 space-y-2">
                  {
                    group.map(
                      commit => {
                        return (
                          <li key={commit.sha} className="w-full before:hidden group/commit hover:bg-accents-2 transition-colors cursor-pointer p-1 rounded-lg">
                            <Commit commit={commit} />
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
  )
}
export { CommitsList }
