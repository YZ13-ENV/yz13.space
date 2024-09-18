import { publicationMarkdown } from "@/actions/journal-markdown/action"
import { getPublication } from "@/actions/journal-publication/action"
import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { DynamicImage } from "@/components/dynamic-image"
import { Header } from "@/components/header/header"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { compileMDX } from 'next-mdx-remote/rsc'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getStorageItem } from "yz13/supabase/storage"


type Props = {
  params: {
    id: string
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
  options: { parseFrontmatter: false }
})

const page = async ({ params, searchParams }: Props) => {
  const lang = getCurrentLocale()
  const id = params.id
  const t = await getI18n()
  const publication = await getPublication({ id })
  const data = publication?.data
  // console.log(data)
  if (!data) return notFound()
  const path = data?.markdown?.path
  const md = await publicationMarkdown({ path })
  const source = md?.data
  // console.log(source)
  const title = data?.markdown?.title
  const description = data?.markdown?.description
  const { content } = await compile(source)
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content>
          <div className="max-w-2xl w-full mx-auto space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                <Link href="/journal" className="text-3xl text-secondary hover:text-foreground transition-colors font-medium">
                  {t("journal.title")}
                </Link>
                <span className="text-3xl font-medium text-secondary">/</span>
                <h1 className="text-3xl font-medium line-clamp-1">{title}</h1>
              </div>
              <span className="text-lg inline-block text-secondary">{description}</span>
            </div>
            <div className="md-layout">
              {content}
            </div>
            <div className="h-20 w-full"></div>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
