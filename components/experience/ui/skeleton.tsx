
import { Separator } from "@repo/ui/separator"

const ExperienceListSkeleton = () => {
  return (
    <>
      <Separator />
      <div className="w-full rounded-xl border">
        <ul className="divide-y">
          <li className="relative h-[54px] animate-pulse rounded-t-xl border-collapses bg-yz-neutral-300" />
          <li className="relative h-[54px] animate-pulse rounded-b-xl border-collapses bg-yz-neutral-300" />
        </ul>
      </div>
    </>
  )
}
export { ExperienceListSkeleton }
