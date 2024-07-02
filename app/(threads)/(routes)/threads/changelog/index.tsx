import { getChangelog } from "@/packages/api/src/db/changelog"
import dayjs from "dayjs"


const Changelog = async ({ lang }: { lang?: string }) => {
  const changelogs = await getChangelog(lang)
  return (
    <div className="w-full h-2/3 space-y-3">
      <span className="text-lg font-semibold">Changelog</span>
      <ul className="space-y-1.5">
        {
          changelogs.map(changelog => {
            const created_at = dayjs(changelog.created_at).format("DD MMMM, HH:mm")
            return <li key={`changelog#${changelog.id}`} className="w-full h-9">
              <button className="w-full h-full flex gap-2 items-center rounded-lg hover:px-2 transition-all hover:bg-yz-neutral-100">
                <span className="text-secondary">{created_at}</span>
                <span className="line-clamp-1">{changelog.title}</span>
              </button>
            </li>
          }
          )
        }
      </ul>
    </div>
  )
}

const ChangelogSkeleton = () => {
  return (
    <div className="w-full h-2/3 space-y-3">
      <span className="w-48 h-5 rounded-md bg-yz-neutral-100 animate-pulse"></span>
      <ul className="space-y-1.5">
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
        <li className="w-full h-9 rounded-md bg-yz-neutral-100 animate-pulse"></li>
      </ul>
    </div>
  )
}
export { Changelog, ChangelogSkeleton }
