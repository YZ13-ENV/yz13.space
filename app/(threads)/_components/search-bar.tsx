"use client"
import { Input } from "@repo/ui/input"
import { useDebounceEffect } from "ahooks"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { BiSearchAlt } from "react-icons/bi"

const SearchBar = ({ placeholder = "" }: { placeholder?: string }) => {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") || ""
  const [text, setText] = useState<string>(filter)
  const pathname = usePathname()
  const router = useRouter()
  useDebounceEffect(() => {
    const params = searchParams.toString()
    const hasFilter = searchParams.has("filter")
    console.log(hasFilter, text)
    if (hasFilter) {
      const oldFilter = `filter=${searchParams.get("filter")}`
      console.log(params, oldFilter, params.replace(oldFilter, ""))
      if (!text) {
        const updated_params = params.replace(oldFilter, "")
        const link = `${pathname}?${updated_params}`
        router.push(link)
      } else {
        const newFilter = `filter=${text}`
        const updated_params = params.replace(oldFilter, newFilter)
        const link = `${pathname}?${updated_params}`
        router.push(link)
      }
    } else {
      const link = pathname + ("?" + params) + (text ? `&filter=${text}` : "")
      if (text !== "") router.push(link)
    }
  }, [text, setText], { wait: 1000 })
  return (
    <div className="relative">
      <div className="absolute left-0 w-9 h-9 flex items-center justify-center">
        <BiSearchAlt size={18} className="text-secondary" />
      </div>
      <Input
        placeholder={placeholder}
        className="rounded-lg pl-9"
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </div>
  )
}
export { SearchBar }
