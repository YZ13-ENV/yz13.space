import { Button } from "@repo/ui/button"
import { BiChevronDown, BiDislike, BiDotsVerticalRounded, BiHistory, BiLike, BiPlay, BiRepeat, BiShare, BiShuffle, BiSkipNext, BiSkipPrevious, BiTimer } from "react-icons/bi"
import { MdOutlineLyrics } from "react-icons/md"

const MusicPlayer = () => {
  return (
    <>
      <div className="w-full aspect-square rounded-xl bg-accents-1 border flex items-center justify-center">
        <div className="max-w-72 p-2 w-full h-fit flex items-center gap-2 rounded-2xl bg-background border">
          <div className="w-12 h-12 rounded-xl bg-accents-1 border"></div>
          <div className="w-fit flex flex-col">
            <span className="font-medium text-foreground text-base">Song name</span>
            <div className="text-sm text-secondary">Artist</div>
          </div>
          <div className="flex items-center ml-auto gap-2">
            <Button size="icon" variant="ghost"><BiPlay size={20} /></Button>
            <Button size="icon" variant="ghost"><BiSkipNext size={20} /></Button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-full border rounded-2xl">
        <div className="w-full flex justify-between px-6 py-4">
          <Button size="icon" variant="ghost" className="text-secondary"><BiChevronDown size={24} /></Button>
          <div className="flex items-center">
            <Button size="icon" variant="ghost" className="text-secondary"><BiHistory size={24} /></Button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-6 overflow-hidden lg:h-80 h-64">
          <div className="h-full flex items-center justify-center aspect-square rounded-xl bg-accents-1 border">
            <span className="text-sm text-secondary">Song cover</span>
          </div>
          <div className="h-full flex items-center justify-center aspect-square rounded-xl bg-accents-1 border">
            <span className="text-sm text-secondary">Song cover</span>
          </div>
          <div className="h-full flex items-center justify-center aspect-square rounded-xl bg-accents-1 border">
            <span className="text-sm text-secondary">Song cover</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 w-full p-6 pb-12 max-w-sm mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 shrink-0 rounded-full bg-accents-2 border" />
            <div className="flex flex-col">
              <span className="text-xl text-start font-semibold">Song name</span>
              <span className="text-sm text-start text-secondary">Artist - album</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="text-secondary"><BiShare size={24} /></Button>
            <Button size="icon" variant="ghost" className="text-secondary"><BiDotsVerticalRounded size={24} /></Button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 w-full p-6 max-w-sm mx-auto">
          <div className="w-full flex items-center justify-between gap-2">
            <Button size="icon" variant="ghost"><BiDislike size={24} /></Button>
            <div className="flex items-center justify-center gap-4">
              <Button size="icon" variant="ghost"><BiSkipPrevious size={32} /></Button>
              <Button size="icon" className="w-14 h-14 rounded-full" variant="default"><BiPlay size={36} /></Button>
              <Button size="icon" variant="ghost"><BiSkipNext size={32} /></Button>
            </div>
            <Button size="icon" variant="ghost"><BiLike size={24} /></Button>
          </div>
        </div>
        <div className="flex justify-between pt-12 items-center gap-2 w-full p-6 max-w-sm mx-auto">
          <Button size="icon" variant="ghost"><BiTimer size={24} /></Button>
          <Button size="icon" variant="ghost"><MdOutlineLyrics size={24} /></Button>
          <Button size="icon" variant="ghost"><BiShuffle size={24} /></Button>
          <Button size="icon" variant="ghost"><BiRepeat size={24} /></Button>
        </div>
      </div>
    </>
  )
}
export { MusicPlayer }
