import { journal } from "@/actions/journal"
import Link from "next/link"

const JournalLastFive = async () => {
  const list: any[] = await journal()
  const sliced = list.slice(0, 5)
  return (
    <>
      <ul className="w-full">
        {
          sliced.map(
            item => {
              const id = item["publication-id"]
              const title = item?.markdown?.title
              const href = `/journal/${id}`
              return (
                <li className="h-9" key={`${id}/${item.created_at}`}>
                  <Link
                    href={href}
                    className="w-full h-full flex items-center text-foreground/60 hover:text-foreground transition-colors line-clamp-1"
                  >
                    {title}
                  </Link>
                </li>
              )
            }
          )
        }
      </ul>
    </>
  )
}
export { JournalLastFive }
