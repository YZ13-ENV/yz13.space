import { Video } from "@/app/_components/video"
import { FrontendTechStack } from "@/app/home/tech-stack/frontend"
import { stack } from "@/app/home/tech-stack/frontend/frontend-stack"
import { Dock } from "@/components/dock"
import { DynamicImage } from "@/components/dynamic-image"
import { Logo } from "@/components/logo"
import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import { dynamicMetadata, Page } from "@/metadata"
import { getStorageItem } from "@yz13/supabase/storage"
import { Metadata } from "next"
import { compileMDX } from 'next-mdx-remote/rsc'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getMDX, isMDXExist } from "./get-mdx"

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const page: Page = "journal"
  const metadata = dynamicMetadata(lang, page)
  const path = params.path
  const isExist = isMDXExist(lang, path)
  if (!isExist) return metadata
  const fullPath = path.join("/") + ".mdx"
  const source = getMDX(lang, fullPath)
  const { frontmatter } = await compile(source)
  const head = frontmatter
  const title = head?.title as string | undefined
  return {
    title,
    ...metadata
  }
}

type Props = {
  params: {
    path: string[]
  }
  searchParams: {
    lang?: string
  }
}

const compile = (source: string) => compileMDX({
  source: source,
  components: {
    Image: props => <Image {...props} />,
    Video: props => <Video {...props} />,
    DynamicImage: props => <DynamicImage {...props} image={{ dark: getStorageItem(["journal", props.image.dark]), light: getStorageItem(["journal", props.image.light]) }} />,
    TechStack: props => <FrontendTechStack {...props} stack={stack} />
  },
  options: { parseFrontmatter: true }
})

const page = async ({ params, searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const path = params.path
  const isExist = isMDXExist(lang, path)
  if (!isExist) return notFound()
  const fullPath = path.join("/") + ".mdx"
  const source = getMDX(lang, fullPath)
  const { content, frontmatter } = await compile(source)
  const head = frontmatter
  const title = head?.title as string | undefined
  const dict = await getDict<any>("journal", lang)
  const name = dict.name
  return (
    <>
      <Link href="/journal">
        <Logo
          width={36} height={36}
          className="xl:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <Suspense fallback={<></>}>
        <Dock lang={searchParamLang as Locales | undefined} />
      </Suspense>
      <div className="max-w-2xl w-full mx-auto p-6 space-y-6">
        <div className="flex items-center gap-1">
          <Link href="/journal" className="text-3xl text-secondary hover:text-foreground transition-colors font-medium">{name}</Link>
          <span className="text-3xl font-medium text-secondary">/</span>
          <h1 className="text-3xl font-medium line-clamp-1">{title}</h1>
        </div>
        <div className="md-layout">
          {content}
        </div>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page