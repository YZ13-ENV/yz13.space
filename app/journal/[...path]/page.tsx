import { Video } from "@/app/_components/video"
import { Dock } from "@/components/dock"
import { Logo } from "@/components/logo"
import { getLocale, Locales } from "@/dictionaries/tools"
import { compileMDX } from 'next-mdx-remote/rsc'
import Image from "next/image"
import Link from "next/link"
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
  if (!isExist) return "not exist"
  const fullPath = path.join("/") + ".mdx"
  const source = getMDX(lang, fullPath)
  const { content, frontmatter } = await compileMDX({
    source: source,
    components: {
      Image: props => <Image {...props} />,
      Video: props => <Video {...props} />
    },
    options: { parseFrontmatter: true }
  })
  const head = frontmatter
  const title = head?.title as string | undefined
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
        <h1 className="text-3xl font-medium inline-flex items-center gap-2">
          {title}
          <span className="uppercase text-xl text-secondary">{lang}</span>
        </h1>
        <div className="md-layout">
          {content}
        </div>
        <div className="h-20 w-full"></div>
      </div>
    </>
  )
}
export default page