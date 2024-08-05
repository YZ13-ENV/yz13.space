import { Locales } from "@/dictionaries/tools";
import dayjs from "dayjs";
import { PiDotDuotone } from "react-icons/pi";
import { isDev } from "../(auth)/(routes)/login/get-url";
import { getFullJournal } from "./get-journal";
import * as Journal from "./journal-list";

const JournalSection = async ({ locale = "en", max }: { locale?: Locales, max?: number }) => {
  const journal = await getFullJournal(locale)

  const isEmpty = !journal.length
  const maxedJournal = max ? journal.slice(0, max) : journal
  const now = dayjs()
  const filtered = maxedJournal
    .filter(item => {
      if (isDev) return true
      const date = dayjs(item.frontmatter.createdAt)
      return now.diff(date) > 0 ? true : false
    })
    .sort((a, b) => {
      const a_date = dayjs(a.frontmatter.createdAt)
      const b_date = dayjs(b.frontmatter.createdAt)
      return b_date.diff(a_date)
    })
  if (isEmpty) return (
    <div className="w-full aspect-square h-full flex items-center justify-center">
      <span>No journal's records yet</span>
    </div>
  )
  return (
    <>
      <Journal.List>
        {
          filtered
            .map(item => {
              const head = item.frontmatter
              const id = head.id
              return <Journal.Item key={locale + "#" + id} head={head} locale={locale} />
            })
        }
      </Journal.List>
    </>
  )
}

const JournalSkeleton = () => {
  return (
    <>
      <div className="sm:h-32 h-fit relative w-full flex sm:flex-row flex-col items-start gap-3">
        <div className="relative sm:h-full h-fit sm:w-fit w-full aspect-video border rounded-xl bg-yz-neutral-200" />
        <div className="flex flex-col gap-0.5 py-2 w-full">
          <span className="inline-block w-3/4 h-8 rounded-md bg-yz-neutral-200" />
          <div className="flex items-center gap-1">
            <span className="inline-block w-1/6 h-5 rounded-md bg-yz-neutral-200" />
            <PiDotDuotone size={16} />
            <span className="inline-block w-1/4 h-5 rounded-md bg-yz-neutral-200" />
          </div>
          <span className="inline-block w-2/3 h-6 rounded-md bg-yz-neutral-200" />
          <span className="inline-block w-1/2 mt-1 h-6 rounded-md bg-yz-neutral-200" />
        </div>
      </div>
    </>
  )
}

export { JournalSection, JournalSkeleton };
