import { Video } from "@/app/_components/video"
import { TechStack } from "@/app/home/tech-stack"
import { Dock } from "@/components/dock"
import { DynamicImage } from "@/components/dynamic-image"
import { Logo } from "@/components/logo"
import { getDict, getLocale, Locales } from "@/dictionaries/tools"
import { getStorageItem } from "@yz13/supabase/storage"
import { compileMDX } from 'next-mdx-remote/rsc'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getMDX, isMDXExist } from "./get-mdx"

type Props = {
  params: {
    path: string[]
  }
  searchParams: {
    lang?: string
  }
}

const page = async ({ params, searchParams }: Props) => {
  const searchParamLang = searchParams.lang
  const locale = getLocale()
  const lang = (searchParamLang ? searchParamLang : locale) as Locales
  const path = params.path
  const isExist = isMDXExist(lang, path)
  if (!isExist) return notFound()
  const fullPath = path.join("/") + ".mdx"
  const source = getMDX(lang, fullPath)
  const { content, frontmatter } = await compileMDX({
    source: source,
    components: {
      Image: props => <Image {...props} />,
      Video: props => <Video {...props} />,
      DynamicImage: props => <DynamicImage {...props} image={{ dark: getStorageItem(["journal", props.image.dark]), light: getStorageItem(["journal", props.image.light]) }} />,
      TechStack: props => <TechStack {...props} />
    },
    options: { parseFrontmatter: true }
  })
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