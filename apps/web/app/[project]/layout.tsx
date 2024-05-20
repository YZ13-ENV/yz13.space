import { User } from "@/components/shared/user"
import { ReactNode } from "react"
import { ThemeSwitcher } from "../_components/entities/theme"
import { PageContainer, SectionContainer } from "./containers"
import { ProjectTabsV2 } from "./project-tabs"

type Props = {
  params: {
    project: string
  }
  children?: ReactNode
}
const layout = ({ params, children }: Props) => {
  const id = params.project
  return (
    <>
      <PageContainer>
        <SectionContainer className="py-6 w-full flex md:flex-row flex-col-reverse gap-6 items-center justify-between">
          <div className="w-full flex flex-row flex-wrap gap-2">
            <ProjectTabsV2 id={id} />
          </div>
          <div className="flex items-center gap-4 w-full justify-end">
            <ThemeSwitcher />
            <User />
          </div>
        </SectionContainer>
        {children}
      </PageContainer>
    </>
  )
}
export default layout