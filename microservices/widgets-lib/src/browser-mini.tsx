import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { BiDotsHorizontalRounded, BiGlobe, BiLock, BiPlus, BiRightArrowAlt, BiUser } from "react-icons/bi"
import { GrStatusGood } from "react-icons/gr"
import { TbNotes } from "react-icons/tb"

const Header = () => {
  return (
    <div className="w-full flex items-center p-2 justify-between border-b">
      <Button size="icon" variant="ghost"><BiPlus size={16} /></Button>
      <Input className="max-w-[70%] text-center rounded-xl" placeholder="Search" />
      <Button size="icon" variant="ghost"><BiDotsHorizontalRounded size={16} /></Button>
    </div>
  )
}

const ListItem = () => {
  return (
    <div className="w-full flex px-2 items-center gap-2">
      <div className="w-8 aspect-square rounded-lg bg-accents-2" />
      <div className="flex flex-col">
        <span className="text-sm text-foreground line-clamp-1 font-medium">Site</span>
        <span className="text-xs text-secondary line-clamp-1">Site description</span>
      </div>
    </div>
  )
}

const SiteList = () => {
  return (
    <>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </>
  )
}

const SiteDetails = () => {
  return (
    <>
      <div className="w-full flex p-2 border-b items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 aspect-square rounded-lg bg-accents-2" />
          <span className="font-medium text-foreground">YZ13</span>
        </div>
        <Button size='sm' className="gap-2">
          Visit
          <BiRightArrowAlt size={16} />
        </Button>
      </div>
      <div className="p-2 space-y-2">

        <div className="w-full flex items-center gap-2">
          <div className="w-8 aspect-square flex items-center justify-center">
            <BiUser size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-secondary">Username</span>
            <span className="text-sm text-foreground">YZ13</span>
          </div>
        </div>

        <div className="w-full flex items-center gap-2">
          <div className="w-8 aspect-square flex items-center justify-center">
            <BiLock size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-secondary">Password</span>
            <span className="text-sm text-foreground">******</span>
          </div>
        </div>

        <div className="w-full flex items-center gap-2">
          <div className="w-8 aspect-square flex items-center justify-center">
            <BiGlobe size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-secondary">Website</span>
            <span className="text-sm text-foreground">https://yz13.space</span>
          </div>
        </div>

        <div className="w-full flex items-center gap-2 rounded-xl">
          <div className="w-8 aspect-square flex items-center justify-center">
            <GrStatusGood size={20} className="text-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-secondary">Password strength</span>
            <span className="text-sm font-medium text-success-foreground">Strong</span>
          </div>
        </div>

        <div className="w-full flex items-center gap-2">
          <div className="w-8 aspect-square flex items-center justify-center">
            <TbNotes size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-secondary">Note</span>
            <span className="text-sm text-foreground">-</span>
          </div>
        </div>

      </div>
      <div className="flex items-center justify-between border-t p-2">
        <span className="text-xs text-secondary">Last updated</span>
        <span className="text-xs text-secondary">Yesterday at 13:08</span>
      </div>
    </>
  )
}

const BrowserMini = () => {
  return (
    <div className="w-full rounded-xl bg-background border">
      <Header />
      <div className="w-full divide-x h-fit flex">
        <div className="w-1/3 h-fit py-2 space-y-2">
          <SiteList />
        </div>
        <div className="w-2/3 h-full">
          <SiteDetails />
        </div>
      </div>
    </div>
  )
}
export { BrowserMini }
