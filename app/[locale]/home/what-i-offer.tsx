import { Stack } from "@/components/stack"
import { Locales, getI18n } from "@/locales/server"
import { Separator } from "@yz13/mono/components/separator"

const WhatIOffer = async ({ lang = "en" }: { lang?: Locales }) => {
  const t = await getI18n()
  return (
    <Stack.Wrapper>
      <Stack.Header>{t("home.widget.offer.title")}</Stack.Header>
      <Stack.Content>
        <p className="text-sm text-foreground/60">{t("home.widget.offer.description")}</p>
        <Separator className="mb-2 mt-3" />
        <ul>
          {/* {
            offer_ul.map((text, index) =>
              <li className="h-9" key={`${text}#${index}`}>
                <div className="flex items-center gap-2 h-full">
                  <BiCheckCircle size={18} />
                  <span className="text-sm text-foreground/60">{text}</span>
                </div>
              </li>
            )
          } */}
        </ul>
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { WhatIOffer }
