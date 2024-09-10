import { Work } from "@/actions/work"
import { works } from "@/actions/works"
import { GroupedAvatars } from "@/components/avatar-group/group"
import { DynamicImage } from "@/components/dynamic-image"
import { Locales } from "@/locales/server"
import { Skeleton } from "@yz13/mono/components/skeleton"
import dayjs from "dayjs"
import { uniq } from "lodash"
import { ExternalLinkIcon, Package } from "lucide-react"
import Link from "next/link"
import { cn } from "yz13/cn"

type KanbanProps = {
  lang?: Locales
}

const WorksKanban = async ({ lang = "en" }: KanbanProps) => {
  const allWorksResponse = await works()
  const allWorks = allWorksResponse?.data ?? []
  const types = uniq(allWorks.map(work => work.type))
  return (
    <div className="w-full flex items-start gap-3 py-3 px-1 overflow-x-auto no-scrollbar">
      {
        types.map(
          type =>
            <KanbanColumn
              key={`column/${type}`}
              lang={lang}
              data={allWorks}
              filter={{ key: "type", value: type }}
              title={type}
            />
        )
      }
    </div>
  )
}
const WorksList = async ({ lang = "en" }: KanbanProps) => {
  const allWorksResponse = await works()
  const allWorks = allWorksResponse?.data ?? []
  const types = uniq(allWorks.map(work => work.type))
  return (
    <>
      {
        types.map(
          type =>
            <KanbanColumn
              key={`column/${type}`}
              lang={lang}
              data={allWorks}
              filter={{ key: "type", value: type }}
              title={type}
              className="w-full bg-yz-neutral-50"
              colClassName="sm:!grid-cols-2 grid grid-cols-1"
            />
        )
      }
    </>
  )
}


type ColumnProps = {
  lang?: Locales
  title?: string
  data?: Work[]
  filter?: { key: keyof Work, value: Work[keyof Work] }
  colClassName?: string
  className?: string
}

const KanbanColumn = ({ colClassName = "", className = "", title, data = [], filter, lang = "en" }: ColumnProps) => {
  const filtered = data.filter(item => filter ? item[filter.key] === filter.value : item)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="font-medium inline-flex items-center gap-2 capitalize">
          {title ?? filter?.key ?? "Untitled"}
        </span>
        <span className="px-2 py-1 rounded-md bg-yz-neutral-200 text-secondary text-xs">
          {filtered.length}
        </span>
      </div>
      <div
        className={cn(
          "w-full flex flex-col gap-1",
          colClassName
        )}
      >
        {
          filtered.map(
            item =>
              <KanbanCard
                key={`${item.type}/${item.id}`}
                work={item}
                lang={lang}
                className={className}
              />
          )
        }
      </div>
    </div>
  )
}

type CardProps = {
  lang?: Locales
  work: Work
  className?: string
}
const KanbanCard = ({ className = "", work, lang = "en" }: CardProps) => {
  const created_at = dayjs(work.created_at).locale(lang).format("ddd, DD MMMM YYYY")
  const description = work.description
  const authors = work.authors
  const icon = work.icon
  const href = work.link
  return (
    <div
      className={cn(
        "w-96 rounded-xl bg-yz-background border h-fit p-3 flex gap-3 cursor-pointer",
        "group hover:border-foreground transition-colors",
        className
      )}
    >
      <div
        className={cn(
          "size-7 p-1 relative shrink-0 rounded-md bg-yz-neutral-50 border flex items-center justify-center",
          "group-hover:border-foreground group-hover:bg-yz-neutral-100 transition-colors"
        )}
      >
        {
          (icon && icon.dark && icon.light)
            ?
            <div className="relative size-4">
              <DynamicImage image={{ dark: icon.dark, light: icon.light }} alt="work-icon" />
            </div>
            : <Package size={16} className="text-secondary" />
        }
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-regular text-foreground line-clamp-1">
              {work.name}
            </span>
            <span className="text-xs text-secondary border rounded-full px-1.5 py-0 capitalize">
              {work.public ? "Public" : "Private"}
            </span>
          </div>
          {
            href
              ?
              <Link
                href={href}
                className="group/link hover:underline text-xs text-secondary inline-flex items-center gap-1"
              >
                <span className="line-clamp-1">{href}</span>
                <ExternalLinkIcon size={12} className="group-hover/link:inline-block hidden" />
              </Link>
              : <span className="text-xs text-secondary">-</span>
          }
        </div>
        <span className="text-xs text-secondary">{created_at}</span>
      </div>
      <GroupedAvatars className="-space-x-3" size={24} users={authors} />
    </div>
  )
}

const WorksListSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <span className="font-medium inline-flex items-center gap-2 capitalize">
          [ --- ]
        </span>
        <div className="w-full sm:!grid-cols-2 grid grid-cols-1 gap-1">
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium inline-flex items-center gap-2 capitalize">
          [ --- ]
        </span>
        <div className="w-full sm:!grid-cols-2 grid grid-cols-1 gap-1">
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
        </div>
      </div>
    </>
  )
}
const KanbanSkeleton = () => {
  return (
    <div className="w-full flex items-start gap-3 py-3 px-4 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
      <div className="flex flex-col gap-3">
        <span className="font-medium inline-flex items-center gap-2 capitalize">
          [ --- ]
        </span>
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-96 h-24 rounded-xl" />
          <Skeleton className="w-96 h-24 rounded-xl" />
          <Skeleton className="w-96 h-24 rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium inline-flex items-center gap-2 capitalize">
          [ --- ]
        </span>
        <div className="w-full flex flex-col gap-1">
          <Skeleton className="w-96 h-24 rounded-xl" />
          <Skeleton className="w-96 h-24 rounded-xl" />
          <Skeleton className="w-96 h-24 rounded-xl" />
          <Skeleton className="w-96 h-24 rounded-xl" />
          <Skeleton className="w-96 h-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
export { WorksList, WorksListSkeleton, KanbanSkeleton, WorksKanban, KanbanCard }

