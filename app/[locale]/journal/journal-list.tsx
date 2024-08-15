import { DynamicImage } from "@/components/dynamic-image"
import { Locales } from "@/dictionaries/tools"
import { JournalHead } from "@/journal/types"
import dayjs from "dayjs"
import Link from "next/link"
import { PiDotDuotone } from "react-icons/pi"
import { getStorageItem } from "yz13/supabase/storage"

const List = ({ children }: { children?: React.ReactNode }) => {
  return <ul className="space-y-3">{children}</ul>
}

const Item = ({ head, locale }: { head: JournalHead, locale: Locales }) => {
  const { authors, createdAt, id, title, description } = head
  const date = dayjs(createdAt)
  const formatted = date.locale(locale).format("DD MMMM, HH:mm")
  const joinedAuthors = authors.join(", ")
  const localeParam = `?lang=${locale}`
  const thumbnail = { dark: getStorageItem(["journal", head.thumbnail.dark]), light: getStorageItem(["journal", head.thumbnail.light]) }
  return (
    <li className="h-fit relative w-full flex flex-col items-start gap-3">
      <Link href={`/journal/${id}${localeParam}`} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative w-full aspect-video border rounded-xl bg-yz-neutral-200">
        <DynamicImage
          className="rounded-xl"
          image={thumbnail}
          alt="thumbnail"
        />
      </div>
      <div className="flex flex-col gap-0.5 py-2">
        <span className="font-medium text-2xl text-foreground">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <span className="text-sm text-foreground/75">{joinedAuthors}</span>
          <PiDotDuotone size={16} />
          <span className="text-sm text-foreground/75">{formatted}</span>
        </div>
        <span className="text-base mt-1 text-foreground/80">
          {description}
        </span>
      </div>
    </li>
  )
}

export { Item, List }
