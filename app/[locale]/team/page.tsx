import { members } from "@/actions/team-members"
import { UserAvatar } from "@/components/avatar-group/user-avatar"
import { Aside } from "@/components/container/aside"
import { Content } from "@/components/container/content"
import { Main } from "@/components/container/main"
import { LogoHeader } from "@/components/header/logo"
import { UserHeader } from "@/components/header/user"
import { NavList } from "@/components/nav/list"
import { getCurrentLocale, getI18n } from "@/locales/server"
import Link from "next/link"
import { cn } from "yz13/cn"

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
          <h1 className="text-4xl font-medium">{t("team.title")}</h1>
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
