import { Dock } from "@/components/dock";
import { Logo } from "@/components/logo";
import { Locales, getLocale } from "@/dictionaries/tools";
import { Page, dynamicMetadata } from "@/metadata";
import { Metadata } from "next";
import { Suspense } from "react";
import { LocalizedTitle } from "../../components/changelog";
import { JournalSection, JournalSkeleton } from "../journal/journal";
import { Contacts, ContactsSkeleton } from "./contacts";
import { Developer, DeveloperSkeleton } from "./developer";
import { Stack, StackSkeleton } from "./stack";
import { Status } from "./status";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "home"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type Props = {
  searchParams: {
    lang?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  return (
    <>
      <Logo
        width={36} height={36}
        className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
      />
      <Suspense fallback={<></>}>
        <Dock lang={lang} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="w-full rounded-3xl bg-transparent h-fit flex flex-col gap-6">
          <Suspense fallback={<DeveloperSkeleton />}>
            <Developer lang={lang} />
          </Suspense>
          <div className="w-full h-fit flex sm:flex-row flex-col items-start gap-4">
            <div className="sm:w-1/2 w-full">
              <Suspense fallback={<></>}>
                <Status lang={lang} title={LocalizedTitle} />
              </Suspense>
            </div>
            <div className="sm:w-1/2 w-full">
              <Suspense fallback={<ContactsSkeleton />}>
                <Contacts lang={lang} title={LocalizedTitle} />
              </Suspense>
            </div>
          </div>
          <Suspense fallback={<StackSkeleton />}>
            <Stack lang={lang} />
          </Suspense>
          <Suspense fallback={<JournalSkeleton />}>
            <JournalSection locale={lang} />
          </Suspense>
        </div>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page