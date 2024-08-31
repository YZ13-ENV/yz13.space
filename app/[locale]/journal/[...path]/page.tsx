import { DynamicImage } from "@/components/dynamic-image"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Page, dynamicMetadata } from "@/metadata"
import { Metadata } from "next"
import { compileMDX } from 'next-mdx-remote/rsc'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getStorageItem } from "yz13/supabase/storage"
import { getMDX, isMDXExist } from "./get-mdx"

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const lang = getCurrentLocale()
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
    DynamicImage: props => <DynamicImage {...props} image={{ dark: getStorageItem(["journal", props.image.dark]), light: getStorageItem(["journal", props.image.light]) }} />,
  },
  options: { parseFrontmatter: true }
})

const page = async ({ params, searchParams }: Props) => {
  const lang = getCurrentLocale()
  const path = params.path
  const isExist = isMDXExist(lang, path)
  if (!isExist) return notFound()
  const fullPath = path.join("/") + ".mdx"
  const source = getMDX(lang, fullPath)
  const { content, frontmatter } = await compile(source)
  const head = frontmatter
  const title = head?.title as string | undefined
  const t = await getI18n()
  return (
    <>
      <div className="max-w-2xl w-full mx-auto p-6 space-y-6">
        <div className="flex items-center gap-1">
          <Link href="/journal" className="text-3xl text-secondary hover:text-foreground transition-colors font-medium">
            {t("journal.title")}
          </Link>
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