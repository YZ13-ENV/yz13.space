import { inspiration } from "@/actions/inspiration"
import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { getStorageItem } from "@/lib/getStorageItem"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { Button } from "@yz13/mono/components/button"
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

type PageProps = {
  params: {
    id: string
  }
}

const page = async ({ params }: PageProps) => {
  const id = params.id
  const lang = getCurrentLocale()
  const t = await getI18n()
  const item = await inspiration(id)
  if (!item) return notFound()
  const title = item.title
  const description = item.description
  const href = item.url
  const hasPreviewPath = !!item?.previewPath ?? false
  const hasPreview = (hasPreviewPath && item?.preview) ?? false
  return (
    <>
      <header className="flex h-12 lg:!px-6 px-3 max-w-7xl mx-auto w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 flex justify-center items-center">
            <LogoHeader className="size-7" />
          </div>
          <span className="text-xl text-foreground font-pixel">YZ13</span>
        </div>
        <div className="flex items-center h-9">
          <UserHeader size={28} lang={lang} />
        </div>
      </header>
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-medium">{title}</h1>
            <p className="text-base text-secondary">{description}</p>
          </div>

          <div className="w-full aspect-video rounded-lg border relative">
            <Image
              src={hasPreview ? getStorageItem("inspiration", item?.previewPath) : item.thumbnail}
              className="rounded-lg"
              fill
              alt="cover"
            />
          </div>

          <div className="flex items-center justify-between w-full">
            <Button
              variant="secondary"
              className="gap-2"
              asChild
            >
              <Link href="/inspiration">
                <ArrowLeftIcon size={14} />
                {t("inspiration.action.back")}
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="gap-2"
              asChild
            >
              <Link href={href}>
                {t("inspiration.action.visit")} <ExternalLinkIcon size={14} />
              </Link>
            </Button>
          </div>
        </Content>
      </Main>

    </>
  )
}
export default page
