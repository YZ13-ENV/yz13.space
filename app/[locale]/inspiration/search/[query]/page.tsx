import { search_inspirations } from "@/actions/inspiration"
import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { Header } from "@/components/header/header"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale } from "@/locales/server"
import { ArrowLeftIcon } from "lucide-react"
import { InspirationCard } from "../../inspiration-card"
import Link from "next/link"
import { Searchbar } from "../../search-bar"

type PageProps = {
  params: {
    query: string
  }
}

const page = async ({ params }: PageProps) => {
  const query = params.query
  const parsedQuery = query.replaceAll("-", " ")
  const lang = getCurrentLocale()
  const searched = await search_inspirations(query)
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content>
          <div className="flex flex-col w-full gap-2">
            <Searchbar defaultValue={parsedQuery} />
            <div className="flex items-center justify-between gap-2 px-2">
              <Link
                href="/inspiration"
                className="inline-flex items-center gap-1 text-xs"
              >
                <ArrowLeftIcon size={12} /> Back
              </Link>
            </div>
          </div>
          <div className="w-full grid gap-4 lg:!grid-cols-3 sm:!grid-cols-2 grid-cols-1 auto-rows-auto">
            {
              searched.map(
                item => <InspirationCard key={item.id} inspiration={item} />
              )
            }
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
