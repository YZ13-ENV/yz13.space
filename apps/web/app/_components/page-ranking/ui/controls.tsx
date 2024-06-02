"use client"
import { Button } from "@repo/ui/button"
import { usePathname } from "next/navigation"
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md"

const RankingControl = () => {
  const path = usePathname()
  return (
    <div className="flex flex-col w-full divide-y">
      <Button variant="outline" className="p-1 !border-t rounded-b-none"><MdOutlineThumbUp /></Button>
      <Button variant="outline" className="p-1 !border-b rounded-t-none"><MdOutlineThumbDown /></Button>
    </div>
  )
}
export { RankingControl }
