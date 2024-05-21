import { AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/info-accordion"
import { Content } from "./content"
import { Trigger } from "./trigger"

type Props = {
  id: string
}
const UserExperience = ({ id }: Props) => {
  return (
    <AccordionItem value="user-experience">
      <AccordionTrigger>
        <Trigger />
      </AccordionTrigger>
      <AccordionContent>
        <Content id={id} />
      </AccordionContent>
    </AccordionItem>
  )
}

export { UserExperience }
