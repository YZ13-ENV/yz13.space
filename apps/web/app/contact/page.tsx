import { getTeamMembers } from "@/api/team-members"
import { HomeHeader } from "@/components/entities/header"
import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { Button } from "@repo/ui/button"
import { Metadata } from "next"
import { unstable_noStore } from "next/cache"
import { Suspense } from "react"
import { Time } from "../_components/time"
import { Background } from "../_components/widgets/background"
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
      <HomeHeader className='fixed top-0 z-20 w-full p-6 h-fit' />
      <div className="w-full flex flex-col items-center justify-center relative pt-24 min-h-[40dvh]">
        <div className="w-full p-6 mb-20 space-y-6">
          <h1 className="w-full font-bold leading-tight text-center text-7xl">Contact</h1>
          <div className='flex justify-center w-full gap-2'>
            <Nav />
            <Button className="border rounded-full bg-background/50 backdrop-blur" variant="secondary">
              <Time format="dd, DD MMMM HH:mm" className="" />
            </Button>
          </div>
        </div>
        <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
          <Background />
        </Suspense>
        <div className="container py-12">
          <div className="grid w-full auto-rows-auto contact-card-grid">
            {members.map(member => <MemberCard key={member.username + "-" + member.username} member={member} />)}
          </div>
        </div>
        <div className="w-full h-48"></div>
        <Footer />
      </div>
    </>
  )
}
export default page