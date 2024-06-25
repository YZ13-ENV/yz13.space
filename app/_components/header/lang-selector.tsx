"use client"
import { cn } from "@/packages/ui/lib/utils"
import { Button } from "@/packages/ui/src/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/packages/ui/src/components/dropdown-menu"
import { useCookieState } from "ahooks"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LuGlobe } from "react-icons/lu"

type Props = {
  defaultLocale?: string
  className?: string
}

type Locales = {
  label: string
  value: string
}

const locales: Locales[] = [
  {
    label: "EN",
    value: "en-US"
  },
  {
    label: "RU",
    value: "ru-RU"
  }
]

const LangSelector = ({ defaultLocale = "en", className = "" }: Props) => {
  const [_, setLocaleCode] = useCookieState("locale")
  const [locale, setLocale] = useState<string>(defaultLocale)
  const router = useRouter()
  const changeLocale = (newLocal: string) => {
    const targetIndex = locales.findIndex(item => item.label === newLocal)
    const localToSet = locales[targetIndex]?.value
    const labelToSet = locales[targetIndex]?.label
    if (localToSet && labelToSet) {
      setLocaleCode(localToSet)
      setLocale(labelToSet)
      router.refresh()
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className={(cn("gap-2 uppercase", className))}>
          <LuGlobe size={16} />
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeLocale("EN")}>EN</DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("RU")}>RU</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export { LangSelector }
