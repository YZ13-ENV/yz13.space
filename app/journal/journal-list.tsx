import { DynamicImage } from "@/components/dynamic-image"
import { Locales } from "@/dictionaries/tools"
import { JournalHead } from "@/journal/types"
import dayjs from "dayjs"
import Link from "next/link"
import { PiDotDuotone } from "react-icons/pi"

const List = ({ children }: { children?: React.ReactNode }) => {
  return <ul className="space-y-3">{children}</ul>
}

const Item = ({ head, locale }: { head: JournalHead, locale: Locales }) => {
  const { authors, createdAt, id, thumbnail, title, description } = head
  const date = dayjs(createdAt)
  const formatted = date.locale(locale).format("DD MMMM, HH:mm")
  const joinedAuthors = authors.join(", ")
  return (
    <li className="h-32 relative w-full flex items-start gap-3">
      <Link href={`/journal/${id}`} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative h-full aspect-video border rounded-xl bg-yz-neutral-200">
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
        <span className="text-base text-foreground/80">
          {description}
        </span>
      </div>
    </li>
  )
}

export { Item, List }
