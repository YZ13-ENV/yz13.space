import { Stack } from "@/components/stack"
import { Locales, getDict } from "@/dictionaries/tools"
import { Separator } from "@yz13/mono/components/separator"
import { BiCheckCircle } from "react-icons/bi"

const WhatIOffer = async ({ lang = "en" }: { lang?: Locales }) => {
  const dict = await getDict<any>("home", lang)
  const offer_dict = dict["what-i-offer"]
  const title = offer_dict.title
  const description = offer_dict.description
  const offer_ul: string[] = offer_dict.ul
  return (
    <Stack.Wrapper>
      <Stack.Header>{title}</Stack.Header>
      <Stack.Content>
        <p className="text-sm text-foreground/60">{description}</p>
        <Separator className="mb-2 mt-3" />
        <ul>
          {
            offer_ul.map((text, index) =>
              <li className="h-9" key={`${text}#${index}`}>
                <div className="flex items-center gap-2 h-full">
                  <BiCheckCircle size={18} />
                  <span className="text-sm text-foreground/60">{text}</span>
                </div>
              </li>
            )
          }
        </ul>
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { WhatIOffer }
