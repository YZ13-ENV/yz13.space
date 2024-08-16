"use client"
import { Locales, useChangeLocale } from "@/locales/client"
import variables from "@/locales/variables"
import { Button } from "@yz13/mono/components/button"
import { cn } from "yz13/cn"

const LanguageSwitcher = ({ lang = "en" }: { lang?: Locales }) => {
  const changeLocale = useChangeLocale()
  return (
    <div className="flex items-center gap-1">
      {
        variables.map(variable =>
          <Button
            key={`variable/${variable}`}
            size="sm"
            variant={lang === variable ? "secondary" : "ghost"}
            className={cn(
              "uppercase",
              variable === lang ? "text-foreground/80" : "text-secondary"
            )}
            onClick={() => changeLocale(variable as Locales)}
          >
            {variable}
          </Button>
        )
      }
    </div>
  )
}
export { LanguageSwitcher }
