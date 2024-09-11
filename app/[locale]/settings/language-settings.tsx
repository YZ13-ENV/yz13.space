"use client"

import { useChangeLocale, useI18n } from "@/locales/client"
import { Locales } from "@/locales/server"
import variables from "@/locales/variables"
import { Button } from "@yz13/mono/components/button"
import { Info, Properties, Wrapper } from "./settings"

type Props = {
  lang?: Locales
}
const LanguageSettings = ({ lang = "en" }: Props) => {
  const changeLocale = useChangeLocale()
  const t = useI18n()
  return (
    <Wrapper>
      <Info>
        <span className="text-sm">{t("settings.language.title")}</span>
      </Info>
      <Properties className="flex items-center overflow-x-auto gap-2">
        {
          variables.map(
            locale =>
              <Button
                onClick={() => changeLocale(locale as Locales)}
                key={locale}
                className="uppercase"
                variant={locale === lang ? "default" : "outline"}
                size="sm"
              >
                {locale}
              </Button>
          )
        }
      </Properties>
    </Wrapper>
  )
}
export { LanguageSettings }
