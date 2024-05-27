import { User } from "@/components/shared/user"
import { links } from "@/const/nav-links"
import { getMDXData } from "@/utils/mdx"
import { cn } from "@repo/ui/cn"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import Link from "next/link"
import path from "path"
import { BiChevronRight, BiHeart } from "react-icons/bi"
import { BsGithub, BsTelegram } from "react-icons/bs"
import { ThemeSwitcher } from "../_components/entities/theme"
import { Time } from "../_components/time"

export interface AsideProps
  extends React.HTMLAttributes<HTMLButtonElement> { }
const SidebarLarge = ({ className, children, ...props }: AsideProps) => {

  const Navigation = () => {
    return (
      <div className="space-y-3">
        <span className="text-xs">Navigation</span>
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
    )
  }

  const Socials = () => {
    return (
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
    )
  }

  const AboutCard = () => {
    return (
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
    )
  }
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'yz13', 'event', 'events'))
  const onlyThree = allMDX.slice(0, 3)
  return (
    <aside className={cn("md:w-96 py-6 w-full h-full px-3 space-y-6 overflow-y-auto no-scrollbar", className)} {...props}>
      <div className="w-full flex items-center justify-between">
        <Time format="HH:mm:ss" className="text-3xl font-semibold font-headings" />
        <User />
      </div>
      <ThemeSwitcher />
      <AboutCard />
      <div className="w-full border rounded-xl divide-y">
        {
          onlyThree.map(
            mdx => {
              const created_at = dayjs(mdx.metadata.created_at).format("MMMM DD, YYYY")
              return <div key={`sidebar-${mdx.slug}`} className="w-full relative first:rounded-t-xl last:rounded-b-xl rounded-none p-3 hover:bg-accents-1">
                <Link href={`/event/${mdx.slug}`} className="absolute left-0 top-0 w-full h-full" />
                <h4 className="text-lg font-semibold text-foreground">{mdx.metadata.title}</h4>
                <p className="text-sm">{mdx.metadata.description}</p>
                <div className="flex h-4 mt-3 items-center gap-2">
                  <span className="text-xs">{mdx.metadata.theme}</span>
                  <Separator orientation="vertical" />
                  <span className="text-xs">{created_at}</span>
                </div>
              </div>
            }
          )
        }
      </div>
      <Navigation />
      <Socials />
      {children}
    </aside>
  )
}
export { SidebarLarge }
