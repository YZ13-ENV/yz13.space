import { Deployment as DeploymentType } from "@/types/repo"
import dayjs from "dayjs"
import Image from "next/image"
import { AiOutlineDeploymentUnit } from "react-icons/ai"


type Props = {
  deployment: DeploymentType
}
const Deployment = ({ deployment }: Props) => {
  const dep = deployment
  return (
    <div key={dep.id} className="w-full p-4 space-y-2 transition-colors hover:bg-accents-1 group/deployment border cursor-pointer hover:border-foreground rounded-xl">
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
export { Deployment }
