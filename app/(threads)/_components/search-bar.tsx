"use client"
import { Input } from "@repo/ui/input"
import { useDebounceEffect } from "ahooks"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { BiSearchAlt } from "react-icons/bi"

const SearchBar = () => {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") || ""
  const [text, setText] = useState<string>(filter)
  const pathname = usePathname()
  const router = useRouter()
  useDebounceEffect(() => {
    if (text !== "") router.push(`${pathname}?filter=${text}`)
    if (text === "") router.push(pathname)
  }, [text, setText], { wait: 1000 })
  return (
    <div className="relative">
      <div className="absolute left-0 w-9 h-9 flex items-center justify-center">
        <BiSearchAlt size={18} className="text-secondary" />
      </div>
      <Input
        placeholder="Search"
        className="rounded-lg pl-9"
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </div>
  )
}
export { SearchBar }
