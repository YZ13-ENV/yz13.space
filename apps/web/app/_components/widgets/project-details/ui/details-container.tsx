import { SectionContainer } from "@/app/[project]/containers"
import { Accordion } from "@repo/ui/info-accordion"
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
            {/* <AccordionItem value="commits">
              <AccordionTrigger>Commits</AccordionTrigger>
              <AccordionContent>
                ...
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="task-in-progress">
              <AccordionTrigger>Task in progress</AccordionTrigger>
              <AccordionContent>
                ...
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </div>
      </section>
      {/* <div className="container">
        <div className="w-full h-24 grid-cols-3 grid-rows-1 gap-6 grid">
          <div className="w-full h-full rounded-xl bg-accents-1 border p-4 flex items-center justify-center gap-3 hover:bg-accents-2/70 cursor-pointer">
            <div className="p-2 bg-accents-2 aspect-square rounded-full border">
              <BiBarChart size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-foreground">Analytics</span>
              <span className="text-xs text-secondary">Analyze data & traffic metrics</span>
            </div>
          </div>
          <div className="w-full h-full rounded-xl bg-accents-1 border p-4 flex items-center justify-center gap-3 hover:bg-accents-2/70 cursor-pointer">
            <div className="p-2 bg-accents-2 aspect-square rounded-full border">
              <BiTimer size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-foreground">Speed insights</span>
              <span className="text-xs text-secondary">View performance metrics</span>
            </div>
          </div>
          <div className="w-full h-full rounded-xl bg-accents-1 border p-4 flex items-center justify-center gap-3 hover:bg-accents-2/70 cursor-pointer">
            <div className="p-2 bg-accents-2 aspect-square rounded-full border">
              <BiListUl size={24} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm text-foreground">Details</span>
              <span className="text-xs text-secondary">View project details</span>
            </div>
          </div>
        </div>
      </div> */}
    </SectionContainer>
  )
}
export { Details }
