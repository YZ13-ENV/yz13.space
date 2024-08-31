import { journal } from "@/actions/journal"
import { Locales } from "@/locales/server"
import Link from "next/link"

const JournalLastFive = async ({ lang = "en" }: { lang?: Locales }) => {
  const list: any[] = await journal(lang)
  const sliced = list.slice(0, 5)
  return (
    <>
      <ul className="w-full">
        {
          sliced.map(
            (item, index) => {
              const id = item["publication-id"]
              const title = item?.markdown?.title
              const href = `/journal/${id}`
              return (
                <li className="h-9" key={`${id}/${item.created_at}`}>
                  <Link
                    href={href}
                    className="w-full h-full flex items-center text-foreground/60 hover:text-foreground transition-colors line-clamp-1"
                  >
                    {index} - {title}
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
