import { Locales } from "@/dictionaries/tools";
import { PiDotDuotone } from "react-icons/pi";
import { getFullJournal } from "./get-journal";
import * as Journal from "./journal-list";

const JournalSection = async ({ locale = "en" }: { locale?: Locales }) => {
  const journal = await getFullJournal(locale)
  const isEmpty = !journal.length
  if (isEmpty) return (
    <div className="w-full aspect-square h-full flex items-center justify-center">
      <span>No journal's records yet</span>
    </div>
  )
  return (
    <>
      <Journal.List>
        {
          journal.map(item => {
            const head = item.frontmatter
            const id = head.id
            return <Journal.Item key={locale + "#" + id} head={head} locale={locale} />
          }
          )
        }
      </Journal.List>
    </>
  )
}

const JournalSkeleton = () => {
  return (
    <>
      <div className="h-32 relative w-full flex items-start gap-3">
        <div className="relative h-full aspect-video border rounded-xl bg-yz-neutral-200" />
        <div className="flex flex-col gap-0.5 py-2 w-full">
          <span className="inline-block w-3/4 h-8 rounded-md bg-yz-neutral-200" />
          <div className="flex items-center gap-1">
            <span className="inline-block w-1/6 h-5 rounded-md bg-yz-neutral-200" />
            <PiDotDuotone size={16} />
            <span className="inline-block w-1/4 h-5 rounded-md bg-yz-neutral-200" />
          </div>
          <span className="inline-block w-2/3 h-6 rounded-md bg-yz-neutral-200" />
          <span className="inline-block w-1/2 h-6 rounded-md bg-yz-neutral-200" />
        </div>
      </div>
    </>
  )
}

export { JournalSection, JournalSkeleton };
