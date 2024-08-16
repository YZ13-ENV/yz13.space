import Dock from "@/components/dock"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Page, dynamicMetadata } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import { LuLoader } from "react-icons/lu"
import { Abc } from "./abc/abc"
import { AbcReset } from "./abc/abc-reset"
import { AbcWorkListSkeleton, AbcWorksList } from "./abc/abc-works-list"
import { Modal } from "./work-modal/modal"
import { Work } from "./work-modal/work"

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const lang = getCurrentLocale()
  const page: Page = "works"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
    lt?: string
    workId?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const t = await getI18n()
  const lang = getCurrentLocale()
  const lt = searchParams.lt
  const workId = searchParams.workId
  return (
    <>
      {
        !!workId &&
        <Modal
          queryParam="workId"
        >
          <Suspense fallback={<LuLoader size={20} className="animate-spin" />}>
            <Work id={workId} />
          </Suspense>
        </Modal>
      }
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <main className="space-y-6 w-full pt-36 pl-6 pr-10 pb-12">
        <div className="w-full flex flex-col gap-2 p-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <Suspense
              fallback={
                <Skeleton className="h-10 w-36" />
              }
            >
              <h1 className="text-4xl font-medium">{t("works.title")}</h1>
            </Suspense>
            {
              !!lt &&
              <AbcReset lt={lt} />
            }
          </div>
        </div>
        <Suspense fallback={<AbcWorkListSkeleton />}>
          <AbcWorksList lt={lt} />
        </Suspense>
      </main>
      <Abc defaultValue={lt} />
    </>
  )
}
export default page
