import { getTeamMembers } from "@/api/team-members"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import { Metadata } from "next"
import { unstable_noStore } from "next/cache"
import { ThemeSwitcher } from "../_components/entities/theme"
import { MemberCard } from "./member-card"

export const metadata: Metadata = {
  title: "Contact",
};

const page = async () => {
  unstable_noStore()
  const response = await getTeamMembers()
  const members = response.data || []
  return (
    <>
      <header className="p-6 flex items-center justify-between max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-4">
          <ThemedLogo mode="symbol" width={32} height={32} alt="logo" />
          <Nav />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <User />
        </div>
      </header>
      <div className="container py-12">
        <div className="grid w-full px-6 max-w-4xl mx-auto auto-rows-auto contact-card-grid">
          {members.map(member => <MemberCard key={member.username + "-" + member.username} member={member} />)}
        </div>
      </div>
      <div className="w-full h-48"></div>
      <Footer className="max-w-4xl mx-auto" />
    </>
  )
}
export default page