import { attachment } from "@/actions/attachment"
import { journal } from "@/actions/journal"
import { Locales } from "@/locales/server"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "yz13/cn"

const JournalLastFive = async ({ lang = "en" }: { lang?: Locales }) => {
  const list: any[] = await journal(lang)
  const sliced = list.slice(0, 5)
  return (
    <>
      <ul className="w-full space-y-2">
        {
          sliced.map(
            (item, index) => {
              const id = item["publication-id"]
              const title = item?.markdown?.title
              const description = item?.markdown?.description
              const thumbnail = item?.markdown?.thumbnail
              const href = `/journal/${id}`
              return (
                <li key={`${id}/${item.created_at}`} className="group/five">
                  <div className="flex items-center flex-row gap-2">
                    <div className={cn(
                      "h-10 aspect-video rounded-md border relative flex items-center justify-center",
                      "group-hover/five:border-foreground"
                    )}
                    >
                      {
                        thumbnail
                          ? <Image src={attachment(thumbnail)} className="rounded-md" fill alt="item-alt" />
                          : <ImageIcon size={16} className="text-secondary" />
                      }
                    </div>
                    <Link
                      href={href}
                      className="w-full h-full flex flex-col text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <span className="text-base text-foreground">{title}</span>
                      <span className="text-secondary group-hover/five:text-foreground/80 text-xs">{description}</span>
                    </Link>
                  </div>
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
