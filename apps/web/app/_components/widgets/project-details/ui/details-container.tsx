import { SectionContainer } from "@/app/[project]/containers"
import { Accordion } from "@repo/ui/info-accordion"
import { Attachments } from "./attachments"
import { LastMetrics } from "./last-metrics"
import { UserExperience } from "./user-experience"

type Props = {
  id: string
}
const Details = ({ id }: Props) => {
  return (
    <SectionContainer className="py-6 space-y-6 bg-accents-1/50 rounded-3xl border">
      <section className="container space-y-6">
        <h3 className="text-2xl font-bold">Project details</h3>
        <div className="rounded-xl bg-accents-1 border">
          <Accordion type="multiple" className="divide-y">
            <LastMetrics id={id} />
            <UserExperience id={id} />
            <Attachments id={id} />
          </Accordion>
        </div>
      </section>
    </SectionContainer>
  )
}
export { Details }
