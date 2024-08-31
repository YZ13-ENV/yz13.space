import { journal } from "@/actions/journal"
import { GroupedAvatars } from "@/components/avatar-group/group"
import Link from "next/link"

const JournalList = async () => {
  const list: any[] = await journal()
  const sliced = list.slice(0, 6)
  return (
    <>
      {
        sliced.map(
          (item, index) => {
            const id = item["publication-id"]
            const title = item?.markdown?.title
            const description = item?.markdown?.description
            const authors = item?.authors ?? []
            const href = `/journal/${id}`
            return (
              <li
                key={`${id}/${item.created_at}`}
                className="min-h-9 group"
              >
                <Link
                  href={href}
                  className="w-full h-full inline-flex gap-2"
                >
                  <span className="text-secondary">{index}</span>
                  <GroupedAvatars className="-space-x-3" size={24} users={authors} />
                  <span className="text-foreground font-medium">{title}</span>
                  <span className="transition-colors text-secondary group-hover:text-foreground">{description}</span>
                </Link>
              </li>
            )
          }
        )
      }
    </>
  )
}
export { JournalList }
