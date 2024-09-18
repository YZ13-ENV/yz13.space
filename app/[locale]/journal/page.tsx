import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { JournalLastList } from "./journal-last"
import { JournalList } from "./journal-list"
import Link from "next/link"
import { Header } from "@/components/header/header"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const lang = getCurrentLocale()
  const page: Page = "journal"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ }: Props) => {
  const lang = getCurrentLocale()
  const t = await getI18n()
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="flex flex-col">
          <Suspense
            fallback={
              <Skeleton className="h-10 w-36" />
            }
          >
            <h1 className="text-4xl font-medium">{t("journal.title")}</h1>
          </Suspense>
          <section className="w-full h-fit pb-12 pt-6 space-y-6">
            <h2 className="text-2xl font-medium text-foreground/80">{t("journal.section.picked.title")}</h2>
            <ul className="w-full h-fit grid sm:!grid-cols-2 grid-cols-1 auto-rows-auto gap-6">
              <Suspense fallback={
                <>
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                  <Skeleton className="w-1/2 h-6 rounded-lg" />
                </>
              }>
                <JournalList lang={lang} />
              </Suspense>
            </ul>
          </section>
          <section className="space-y-6 w-full h-fit min-h-[52.5dvh]">
            <h2 className="text-2xl font-medium text-foreground/80">{t("journal.section.all.title")}</h2>
            <div className="w-full grid md:!grid-cols-2 grid-cols-1 auto-rows-auto gap-6">
              <JournalLastList lang={lang} />
            </div>
          </section>
          <footer className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary">Powered by</span>
              <Link href="https://cms.yz13.space" target="_blank" className="text-sm hover:underline">YZ13/CMS</Link>
            </div>
          </footer>
        </Content>
      </Main>
    </>
  )
}
export default page
