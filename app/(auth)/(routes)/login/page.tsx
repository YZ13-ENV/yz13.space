import { LeftSide } from "@/app/_components/left"
import { Nav } from "@/app/_components/nav"
import { RightSide } from "@/app/_components/right"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import { isDev } from "@/packages/api/src/const"
import { createClient } from "@/packages/supabase/src/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import { Logged } from "./logged"
import { UnLogged } from "./unlogged"

const page = async () => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="flex relative flex-col items-center justify-center w-full h-screen">
          {
            isLogged
              ? <Logged user={user} />
              : <UnLogged />
          }
          {
            !isDev &&
            <div className="w-full absolute backdrop-blur-sm flex bg-background/40 items-center justify-center z-50 h-full">
              <span className="text-sm">Section in dev</span>
            </div>
          }
        </div>
      </LeftSide>
      <RightSide>
        <div className="w-full flex items-center justify-center relative lg:h-screen h-fit">
          <Nav className="w-full absolute p-6 top-0 left-0" />
          <Link href="/signup" className="text-sm">or create account</Link>
        </div>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page