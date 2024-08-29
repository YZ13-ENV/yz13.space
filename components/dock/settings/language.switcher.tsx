"use client"
import { Locales, useChangeLocale } from "@/locales/client"
import variables from "@/locales/variables"
import { Button } from "@yz13/mono/components/button"
import { cn } from "yz13/cn"

const LanguageSwitcher = ({ lang = "en", className = "" }: { className?: string, lang?: Locales }) => {
  const changeLocale = useChangeLocale()
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {
        variables.map(variable =>
          <Button
            key={`variable/${variable}`}
            size="sm"
            variant={lang === variable ? "secondary" : "ghost"}
            className={cn(
              "uppercase hover:bg-yz-neutral-200",
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
