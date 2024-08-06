import { LocalizedHeading } from "@/components/localized-heading"
import { Stack } from "@/components/stack"
import { Locales } from "@/dictionaries/tools"
import dayjs from "dayjs"
import { getFullJournal } from "./get-journal"

type JournalProps = {
  locale?: Locales
}
const UpcomingJournal = async ({ locale = "en" }: JournalProps) => {
  const journal = await getFullJournal(locale)
  const guessed = dayjs.tz.guess()
  const now = dayjs().tz(guessed, true)
  const filtered = journal
    .filter(item => {
      const date = dayjs(item.frontmatter.createdAt)
      return now.diff(date) < 0 ? true : false
    })
    .sort((a, b) => {
      const a_date = dayjs(a.frontmatter.createdAt)
      const b_date = dayjs(b.frontmatter.createdAt)
      return a_date.diff(b_date)
    })

  const isEmpty = !filtered.length
  if (isEmpty) return
  return (
    <Stack.Wrapper>
      <Stack.Header>
        <LocalizedHeading
          lang={locale}
          dict="journal"
          field="upcoming.name"
          className="text-lg font-medium text-foreground"
        />
        {/* <h2 className="text-lg font-medium text-foreground">Upcoming</h2> */}
      </Stack.Header>
      <Stack.Content>
        {
          filtered.map(item => {
            const date = dayjs(item.frontmatter.createdAt)
            const formattedDate = date.format("HH:mm DD.MM.YYYY")
            return <div
              key={item.frontmatter.id + "-upcoming"}
              className="relative h-32"
            >
              <div className="flex items-center justify-center rounded-xl h-full w-full border bg-yz-neutral-100">
                <span>{formattedDate}</span>
              </div>
            </div>
          })
        }
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { UpcomingJournal }
