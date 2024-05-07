import { getRepoDeployments } from "@/api/repo"
import { Deployment as DeploymentType } from "@/types/repo"
import { Deployment } from "./deployment"


type Props = {
  owner: string
  repo: string
}
const DeploymentsList = async ({ owner, repo }: Props) => {
  const deployments: DeploymentType[] = await getRepoDeployments(owner, repo)
  return (
    <div className="w-full space-y-3">
      {
        deployments
          .filter((_, i) => i <= 4)
          .map(
            (dep) => <Deployment key={dep.id} deployment={dep} />
          )
      }
    </div>
  )
}
export { DeploymentsList }
