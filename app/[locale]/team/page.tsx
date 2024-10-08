import { members } from "@/actions/team-members"
import { UserAvatar } from "@/components/avatar-group/user-avatar"
import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import { dynamicMetadata, Page } from "@/metadata"
import { Skeleton } from "@yz13/mono/components/skeleton"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { cn } from "yz13/cn"
import { TeamInfo } from "../home/team-info/team-info"
import { Separator } from "@yz13/mono/components/separator"
import { UserActivity } from "../home/activity/activity-widget"
import { Header } from "@/components/header/header"

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const lang = getCurrentLocale()
  const page: Page = "team"
  const metadata = dynamicMetadata(lang, page)
  return metadata
}

type PageProps = {
  searchParams: {
    uid?: string
    filter?: string
  }
}

const page = async ({ searchParams }: PageProps) => {
  const lang = getCurrentLocale()
  const t = await getI18n()
  const all = await members()
  const data = all?.data
  return (
    <>
      <Header lang={lang} />
      <Main>
        <Aside>
          <NavList />
        </Aside>
        <Content className="space-y-4">

          <h1 className="text-4xl font-medium">{t("team.title")}</h1>
          <div className="w-full flex lg:!flex-row flex-col">
            <div className="w-full lg:!h-full h-fit gap-6  flex flex-col">
              <Suspense fallback={<Skeleton className="rounded-xl w-full h-40" />}>
                <TeamInfo />
              </Suspense>
              <Separator />
              <Suspense fallback={<Skeleton className="rounded-xl w-full h-36" />}>
                <UserActivity uid="d5f98156-1776-42da-8f20-686d6a1ae2a8" lang={lang} />
              </Suspense>
              <Separator />
            </div>
          </div>

          <div className="w-full flex flex-col relative">
            <div className="w-full h-fit grid md:!grid-cols-2 auto-rows-auto gap-4">
              {
                data && data.map(
                  member => {
                    return (
                      <div
                        key={member.uid}
                        className={cn(
                          "p-4 rounded-2xl bg-yz-neutral-50 border w-full flex gap-2 relative",
                          "hover:border-foreground"
                        )}
                      >
                        <UserAvatar uid={member.uid} size={36} />
                        <div className="flex flex-col gap-2">
                          <div className="relative flex items-center gap-2">
                            <Link href={`?uid=${member.uid}`} className="absolute left-0 top-0 w-full h-full" />
                            <div className="flex flex-col">
                              <span className="text-base font-medium">{member.name} @{member.username}</span>
                              <span className="text-xs text-secondary">{member.position ?? "-"}</span>
                            </div>
                          </div>
                          <div className="flex w-full flex-col">
                            <ul className="w-full space-y-1">
                              {
                                (member.link as { link: string, label: string }[])
                                  .map(
                                    link => <li
                                      key={`${member.uid}/${link.link}`}
                                      className="h-fit w-full"
                                    >
                                      <div className="flex h-full flex-col gap-0">
                                        <span
                                          className="text-xs shrink-0 text-secondary"
                                        >
                                          {link.label}
                                        </span>
                                        <Link
                                          href={link.link}
                                          className={cn(
                                            "text-sm text-foreground group/link inline-flex items-center hover:underline gap-2",
                                            "line-clamp-1"
                                          )}
                                        >
                                          {link.link}
                                        </Link>
                                      </div>
                                    </li>
                                  )
                              }
                            </ul>
                          </div>
                        </div>

                      </div>
                    )
                  }
                )
              }
            </div>
          </div>
        </Content>
      </Main>
    </>
  )
}
export default page
