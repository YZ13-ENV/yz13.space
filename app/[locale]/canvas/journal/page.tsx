import { attachment } from "@/actions/attachment"
import { journal } from "@/actions/journal"
import { GroupedAvatars } from "@/components/avatar-group/group"
import { Header } from "@/components/header/tiny-header/header"
import { getCurrentLocale } from "@/locales/server"
import dayjs from "dayjs"
import { ImageIcon } from "lucide-react"
import Image from "next/image"

const page = async () => {
  const lang = getCurrentLocale()
  const list: any[] = await journal(lang)
  return (
    <div className="max-w-4xl w-full mx-auto space-y-0">
      <Header />
      <div className="w-full grid md:!grid-cols-2 grid-cols-1 auto-rows-auto gap-2 p-2">
        {
          list.map(
            item => {
              const id = item["publication-id"]
              const title = item?.markdown?.title
              const description = item?.markdown?.description
              const authors = item?.authors ?? []
              const href = `/journal/${id}`
              const thumbnail = item?.markdown?.thumbnail
              const published_at = dayjs(item.published_at).locale(lang).format("dd, DD MMMM YYYY")
              return (
                <div key={id} className="p-0 flex gap-2 flex-row">
                  <div className="h-12 aspect-video rounded-md border relative flex items-center justify-center">
                    {
                      thumbnail
                        ? <Image src={attachment(thumbnail)} className="rounded-md" fill alt="thumbnail" />
                        : <ImageIcon size={16} />
                    }
                  </div>
                  <div className="flex flex-col">
                    <span className="line-clamp-1">{title}</span>
                    <span className="text-sm text-secondary line-clamp-2">{description}</span>
                    <div className="flex mt-2 items-center gap-2">
                      <GroupedAvatars users={authors} size={20} />
                      <span className="text-sm text-secondary">{published_at}</span>
                    </div>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}
export default page
