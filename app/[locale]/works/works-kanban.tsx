import { works } from "@/actions/works"
import { GroupedAvatars } from "@/components/avatar-group/group"
import { Locales } from "@/locales/server"
import { Skeleton } from "@yz13/mono/components/skeleton"
import dayjs from "dayjs"
import { uniq } from "lodash"
import { LuPackage } from "react-icons/lu"
import { cn } from "yz13/cn"
import { Work } from "./abc/abc-store"

type KanbanProps = {
  lang?: Locales
}

const WorksKanban = async ({ lang = "en" }: KanbanProps) => {
  const allWorksResponse = await works()
  const allWorks = allWorksResponse?.data ?? []
  const types = uniq(allWorks.map(work => work.type))
  return (
    <div className="w-full flex items-start gap-3 py-3 px-4 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
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

type ColumnProps = {
  lang?: Locales
  title?: string
  data?: Work[]
  filter?: { key: keyof Work, value: Work[keyof Work] }
}

const KanbanColumn = ({ title, data = [], filter, lang = "en" }: ColumnProps) => {
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
      <div className="w-full flex flex-col gap-1">
        {
          filtered.map(
            item =>
              <KanbanCard
                key={`${item.type}/${item.id}`}
                work={item}
                lang={lang}
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
}
const KanbanCard = ({ work, lang = "en" }: CardProps) => {
  const created_at = dayjs(work.created_at).locale(lang).format("ddd, DD MMMM YYYY")
  const authors = work.authors
  return (
    <div
      className={cn(
        "w-96 rounded-xl bg-yz-background border h-fit p-3 flex gap-3 transition-colors cursor-pointer",
        "hover:border-foreground"
      )}
    >
      <div className="size-7 shrink-0 rounded-md bg-yz-neutral-50 border flex items-center justify-center">
        <LuPackage size={16} className="text-secondary" />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <span className="font-regular text-foreground">
          {work.name}
        </span>
        <span className="text-xs text-secondary">{created_at}</span>
      </div>
      <GroupedAvatars className="-space-x-3" size={24} users={authors} />
    </div>
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
export { KanbanSkeleton, WorksKanban }

