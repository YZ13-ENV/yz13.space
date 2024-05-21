import { Nav } from "@/components/entities/header/ui/nav"
import { Footer } from "@/components/shared/footer"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import { Separator } from "@repo/ui/separator"
import { Metadata } from "next"
import { Suspense } from "react"
import { ThemeSwitcher } from "../_components/entities/theme"
import { ProjectsList } from "./projects-list"

export const metadata: Metadata = {
  title: "Projects",
};

const page = () => {
  return (
    <>
      <header className="p-6 flex items-center justify-between max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-4">
          <ThemedLogo mode="symbol" width={32} height={32} alt="logo" />
          <Nav />
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <User />
        </div>
      </header>
      <div className="w-full px-6 max-w-4xl mx-auto h-fit py-12 min-h-screen">
        <div className="relative w-full h-fit">
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2 auto-rows-auto h-fit">
            <Suspense fallback={
              <>
                <div className="w-full h-36 bg-muted rounded-xl animate-pulse" />
              </>
            }>
              <ProjectsList />
            </Suspense>
          </div>
        </div>
      </div>
      <Separator />
      <Footer className="max-w-4xl mx-auto" />
    </>
  )
}
export default page