import { works } from "@/actions/works"
import { uniq } from "lodash"
import { AbcProvider } from "./abc-provider"
import { AbcScroller } from "./abc-scroller"
import { WorksList } from "./works-list"

type AbcWorksListProps = {
  lt?: string
}


const AbcWorksList = async ({ lt }: AbcWorksListProps) => {
  const allWorksResponse = await works()
  const allWorks = allWorksResponse?.data ?? []
  const abcFromWorks = uniq(allWorks.length ? allWorks.map(item => String((item.name ?? "")?.slice(0, 1)).toLowerCase()) : []).sort()
  return (
    <>
      <AbcScroller lt={lt} />
      <AbcProvider initialValue={abcFromWorks} />
      <WorksList abc={abcFromWorks} works={allWorks} lt={lt} />
    </>
  )
}

const AbcWorkListSkeleton = () => {
  return (
    <>
      <div className="w-full rounded-xl max-w-lg mx-auto border-2 bg-yz-neutral-100 animate-pulse h-24" />
      <div className="w-full rounded-xl max-w-lg mx-auto border-2 bg-yz-neutral-100 animate-pulse h-24" />
      <div className="w-full rounded-xl max-w-lg mx-auto border-2 bg-yz-neutral-100 animate-pulse h-64" />
      <div className="w-full rounded-xl max-w-lg mx-auto border-2 bg-yz-neutral-100 animate-pulse h-24" />
      <div className="w-full rounded-xl max-w-lg mx-auto border-2 bg-yz-neutral-100 animate-pulse h-24" />
    </>
  )
}

export { AbcWorkListSkeleton, AbcWorksList }

