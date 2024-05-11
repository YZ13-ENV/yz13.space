import { HomeHeader } from "@/components/entities/header"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { BiCalendarPlus, BiFolder, BiFolderPlus } from "react-icons/bi"

const page = () => {
  const Folder = () => {
    return (
      <div className="w-full flex gap-2 items-center justify-start h-12 bg-accents-1 hover:bg-accents-2 cursor-pointer transition-colors rounded-lg px-3">
        <BiFolder size={32} />
        <div className="h-full flex flex-col justify-center">
          <span className="text-sm">folder name</span>
          <span className="text-xs text-secondary">{"{count}"} files</span>
        </div>
      </div>
    )
  }
  return (
    <>
      <HomeHeader />
      <div className="w-full container">
        <div className="max-w-4xl mx-auto w-full p-12 space-y-6">
          <div className="w-full gap-3 grid grid-cols-3 auto-rows-auto">
            <Folder />
            <Folder />
            <Folder />
            <Folder />
            <Folder />
            <div className="w-full flex gap-2 items-center justify-start h-12 bg-accents-1 rounded-lg px-3">
              <BiFolderPlus size={32} className="text-secondary" />
              <span className="text-sm text-secondary">New folder</span>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between w-full">
            <Input className="text-4xl font-bold h-fit !ring-0 p-0 !border-0" placeholder="Enter title" />
            <Button variant="outline" className="gap-2 justify-start" size="lg">
              <BiCalendarPlus size={20} />
              <span>Select date</span>
            </Button>
          </div>
          <div className="w-full space-y-6">
            <Input placeholder="Enter custom id (optional)" />
            <div className="w-full md-layout">
              <h1>Heading h1</h1>
              <p>Event text</p>
              <ul>
                <li>list item</li>
                <li>also list item</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default page