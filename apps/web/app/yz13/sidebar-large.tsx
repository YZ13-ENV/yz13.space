import { User } from "@/components/shared/user"
import { links } from "@/const/nav-links"
import { cn } from "@repo/ui/cn"
import Link from "next/link"
import { BiChevronRight, BiHeart } from "react-icons/bi"
import { BsGithub, BsTelegram } from "react-icons/bs"
import { Time } from "../_components/time"

export interface AsideProps
  extends React.HTMLAttributes<HTMLButtonElement> { }
const SidebarLarge = ({ className, ...props }: AsideProps) => {
  return (
    <aside className={cn("md:w-96 w-full h-full p-3 overflow-y-auto no-scrollbar", className)} {...props}>
      <div className="w-full flex py-3 items-center justify-between">
        <Time format="HH:mm:ss" className="text-3xl font-semibold font-headings" />
        <User />
      </div>
      <div className="py-3">
        <div className="w-full space-y-3 p-3 rounded-xl border">
          <p className="text-sm">
            Hi, i am a frontend developer. Love my work :)
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <BiHeart size={14} />
              <span className="text-xs">0</span>
            </div>
            <span className="text-xs">Tyumen, Russia</span>
          </div>
        </div>
      </div>
      <div className="py-3">
        <div className="w-full h-14 grid grid-cols-2 grid-rows-1 gap-3">
          <div className="w-full p-3 flex items-center justify-center hover:bg-accents-1 relative gap-2 h-full border rounded-xl">
            <Link href="https://github.com/yz13-env" className="w-full h-full absolute left-0 top-0 rounded-xl" />
            <BsGithub size={24} />
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Github</span>
              <span className="text-xs">YZ13-ENV</span>
            </div>
          </div>
          <div className="w-full p-3 flex items-center justify-center hover:bg-accents-1 relative gap-2 h-full border rounded-xl">
            <Link href="https://t.me/YZTHECEO" className="w-full h-full absolute left-0 top-0 rounded-xl" />
            <BsTelegram size={24} />
            <div className="flex flex-col">
              <span className="text-sm text-foreground">Telegram</span>
              <span className="text-xs">YZTHECEO</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-3">
        <span className="text-xs">Navigation</span>
      </div>
      <div className="py-3">
        <div className="w-full border divide-y rounded-xl">
          {
            links.map(link =>
              <button key={link.value} className="w-full p-3 flex hover:bg-accents-1 items-center gap-2 first:rounded-t-xl last:rounded-b-xl rounded-none">
                {link.icon && link.icon({ size: 18, className: "shrink-0" })}
                <div className="flex flex-col w-full items-start">
                  <span className="text-sm font-medium text-foreground">{link.label}</span>
                  {/* <span className="text-xs">0 items</span> */}
                </div>
                <div className="h-full flex items-center">
                  <BiChevronRight size={18} className="shrink-0" />
                </div>
              </button>
            )
          }
        </div>
      </div>
    </aside>
  )
}
export { SidebarLarge }
