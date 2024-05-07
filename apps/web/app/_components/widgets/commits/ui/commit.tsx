import { Commit as CommitType } from "@/types/repo"
import Image from "next/image"
import { MdCommit } from "react-icons/md"

type Props = {
  commit: CommitType
}
const Commit = ({ commit }: Props) => {
  const commit_id = commit.sha.slice(0, 7)
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-7 z-[1] shrink-0 h-7 inline-flex rounded-full bg-accents-2 border-2 border-accents-1 items-center justify-center">
        <MdCommit size={18} />
      </div>
      <div className="w-full space-x-2">
        <div className="inline-block w-fit h-fit space-x-2">
          <Image src={commit.committer.avatar_url} className="mb-0.5 inline-block rounded-full" width={20} height={20} alt={commit.committer.login} />
          <span className="text-sm md:inline hidden text-secondary">{commit.committer.login}</span>
        </div>
        <span className="text-sm px-2 rounded-md group-hover/commit:bg-accents-1 transition-colors bg-accents-2">{commit_id}</span>
        <span className="text-sm">{commit.commit.message}</span>
      </div>
    </div>
  )
}
export { Commit }
