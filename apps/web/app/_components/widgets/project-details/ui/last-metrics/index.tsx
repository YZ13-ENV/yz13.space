import { AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/info-accordion"
import { Content } from "./content"
import { Trigger } from "./trigger"

type Props = {
  id: string
}
const LastMetrics = ({ id }: Props) => {
  return (
    <AccordionItem value="metrics">
      <AccordionTrigger>
        <Trigger />
      </AccordionTrigger>
      <AccordionContent className="divide-y p-0">
        <Content id={id} />
      </AccordionContent>
    </AccordionItem>
  )
}
export { LastMetrics }
