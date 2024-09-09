import { works } from "@/actions/works"
import { Header } from "@/components/header/tiny-header/header"
import { getCurrentLocale } from "@/locales/server"
import { KanbanCard } from "../../works/works-kanban"

const page = async () => {
  const allWorksResponse = await works()
  const allWorks = allWorksResponse?.data ?? []
  const lang = getCurrentLocale()
  return (
    <div className="max-w-4xl w-full mx-auto space-y-0">
      <Header />
      <div className="w-full grid md:!grid-cols-2 grid-cols-1 auto-rows-auto gap-2 p-2">
        {
          allWorks.map(
            work => <KanbanCard key={work.id} work={work} lang={lang} className="w-full bg-yz-neutral-50" />
          )
        }
      </div>
    </div>
  )
}
export default page
