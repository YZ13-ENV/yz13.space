import { Logo } from "@/app/_components/logo"
import { Nav } from "@/app/_components/nav"
import { LeftSide } from "@/app/_components/split-view/left"
import { RightSide } from "@/app/_components/split-view/right"
import { SplitViewContainer } from "@/app/_components/split-view/split-view-container"
import { Button } from "@/packages/ui/src/components/button"
import { Input } from "@/packages/ui/src/components/input"
import Link from "next/link"

const page = () => {
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="flex flex-col items-center relative justify-center w-full h-screen">
          <Logo size={96} />
          <h1 className="max-w-sm mx-auto text-4xl font-bold text-center">
            Create your YZ13&nbsp;Account
          </h1>
          <div className="w-full max-w-md py-12 space-y-6">
            <div className="w-full max-w-md mx-auto">
              <div className="flex flex-col w-full gap-3">
                <div className="flex w-full p-2.5 border rounded-lg h-fit">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">Person</span>
                    <span className="text-sm text-secondary">
                      I'm working on personal projects
                    </span>
                  </div>
                  <div className="flex items-center ml-auto">
                    <div className="w-4 border rounded-md aspect-square"></div>
                  </div>
                </div>
                <div className="flex w-full h-16 p-2.5 border rounded-lg">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">Team</span>
                    <span className="text-sm text-secondary">
                      I'm working on commercial projects
                    </span>
                  </div>
                  <div className="flex items-center ml-auto">
                    <div className="w-4 border rounded-md aspect-square"></div>
                  </div>
                </div>
                <div className="flex w-full h-16 p-2.5 border rounded-lg">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">Company</span>
                    <span className="text-sm text-secondary">
                      I'm from company, i have a deal
                    </span>
                  </div>
                  <div className="flex items-center ml-auto">
                    <div className="w-4 border rounded-md aspect-square"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full py-3 space-y-1">
              <span className="text-xs text-secondary">Name</span>
              <Input placeholder="Write there" className="h-10 rounded-lg" />
            </div>
            <Button className="w-full h-10" disabled>Continue</Button>
            <div className="py-6">
              <span className="text-sm">
                By joining, you agree to our <b className="text-foreground">this</b> and <b className="text-foreground">this</b>
              </span>
            </div>
          </div>
        </div>
      </LeftSide>
      <RightSide>
        <div className="w-full flex relative items-center justify-center lg:h-screen h-fit">
          <Nav className="w-full absolute p-6 top-0 left-0" />
          <Link href="/login" className="text-sm">or log in with existing account</Link>
        </div>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page