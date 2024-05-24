import { getRepoContributors } from "@yz13/api/gh/repo"
import { Project } from "@yz13/api/gh/types"
import Image from "next/image"

type Props = {
  project: Project
}
const Contributors = async ({ project }: Props) => {
  const repo_id = project.repo_id
  const repo_owner = project.repo_owner
  const contributors = repo_id && repo_owner ? await getRepoContributors(repo_owner, repo_id) : []
  return (
    <div className="flex items-center mt-auto -space-x-3">
      {
        contributors.map(user =>
          <div
            key={"contributor-" + user.login}
            className="w-6 aspect-square bg-accents-1 rounded-full relative border border-accents-3">
            <Image src={user.avatar_url} className="rounded-full" fill alt="contributor-image" />
          </div>
        )
      }
    </div>
  )
}
export { Contributors }
