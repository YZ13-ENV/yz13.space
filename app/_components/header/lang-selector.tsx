"use client"
import { Button } from "@/packages/ui/src/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/packages/ui/src/components/dropdown-menu"
import { useCookieState } from "ahooks"
import { useState } from "react"
import { LuGlobe } from "react-icons/lu"

type Props = {
  defaultLocale?: string
}

type Locales = {
  label: string
  value: string
}

const LangSelector = ({ defaultLocale = "en" }: Props) => {
  const [localeCode, setLocaleCode] = useCookieState("locale")
  const [locale, setLocale] = useState<string>(defaultLocale)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2 uppercase rounded-r-none">
          <LuGlobe size={16} />
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>EN</DropdownMenuItem>
        <DropdownMenuItem>RU</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export { LangSelector }
