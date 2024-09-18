"use client"
import { useI18n } from "@/locales/client"
import { Input } from "@yz13/mono/components/input"
import { useDebounceEffect } from "ahooks"
import { Loader2Icon, SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


type Props = {
  defaultValue?: string
}
const Searchbar = ({ defaultValue = "" }: Props) => {
  const t = useI18n()
  const [query, setQuery] = useState<string>(defaultValue)
  const { push } = useRouter()
  const [typing, setTyping] = useState<boolean>(false)
  useEffect(() => {
    setTyping(true)
  }, [query, setQuery])
  useDebounceEffect(() => {
    setTyping(false)
    if (query) {
      const formatted = query.toLowerCase().replaceAll(" ", "-").replaceAll(",", "").replaceAll(".", "")
      const path = `/inspiration/search/${formatted}`
      push(path)
    }
  }, [query], { wait: 1000 })
  return (
    <div className="relative w-full h-10">
      <div className="size-10 flex items-center absolute left-0 justify-center">
        {
          typing
            ? <Loader2Icon size={16} className="animate-spin text-secondary" />
            : <SearchIcon size={16} className="text-secondary" />
        }
      </div>
      <Input
        placeholder={t("inspiration.search.placeholder")}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="h-10 rounded-xl text-base !pl-10"
      />
    </div>
  )
}
export { Searchbar }
