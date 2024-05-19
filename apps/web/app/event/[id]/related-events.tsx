import { getMDXData } from "@/utils/mdx"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import path from "path"
import { RelatedEventCard } from "./related-event"

const RelatedEvents = async () => {
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  const today = dayjs()
  const next_events = allMDX.filter(item => {
    const event_date = dayjs(item.metadata.created_at)
    return event_date.diff(today, "date")
  })
  const onlyTwo = next_events.slice(0, 2)
  return (
    <>
      {
        onlyTwo.length !== 0 &&
        <>
          <Separator />
          <div className="w-full container">
            <section className="max-w-4xl mx-auto w-full lg:p-12 md:p-6 py-6 space-y-6">
              <h2 className="text-2xl font-bold">Read more</h2>
              <div className="w-full grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 grid-rows-2 gap-4">
                {
                  onlyTwo.map(
                    event => <RelatedEventCard key={event.slug} event={event} />
                  )
                }
              </div>
            </section>
          </div>
        </>
      }
    </>
  )
}
export { RelatedEvents }
