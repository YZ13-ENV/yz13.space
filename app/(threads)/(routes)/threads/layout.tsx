import { LeftSide } from "@/app/_components/left"
import { RightSide } from "@/app/_components/right"
import { SplitViewContainer } from "@/app/_components/split-view-container"
import Link from "next/link"
import { ReactNode } from "react"
import { SearchBar } from "../../_components/search-bar"

type Props = {
  children?: ReactNode
}
const layout = ({ children }: Props) => {
  return (
    <>
      <SplitViewContainer>
        <LeftSide>
          <div className="p-6 h-screen">
            <div className="w-full h-1/3">
              <div className="w-full">
                <h1 className="lg:text-9xl md:text-7xl text-9xl font-bold">Blog</h1>
              </div>
              <div className="w-full h-fit flex gap-3 xl:flex-row py-6 flex-col">
                <div className="xl:w-2/3 w-full space-y-3">
                  <span className="text-lg text-secondary">Filters</span>
                  <div className="w-full flex flex-row flex-wrap gap-1">
                    <span className="text-sm border rounded-lg px-2 py-1 bg-yz-neutral-100">All</span>
                    <Link href="?lang=ru" className="text-sm border rounded-lg px-2 py-1 bg-yz-neutral-100">RU</Link>
                    <Link href="?lang=en" className="text-sm border rounded-lg px-2 py-1 bg-yz-neutral-100">EN</Link>
                  </div>
                </div>
                <div className="xl:w-1/3 w-full space-y-3">
                  <span className="text-lg text-secondary">Search</span>
                  <SearchBar />
                </div>
              </div>
            </div>
            <div className="w-full h-2/3 space-y-3">
              <span className="text-lg font-semibold">Changelog</span>
              <ul className="space-y-1.5">
                {/* <li className="w-full h-9">
                  <button className="w-full h-full flex gap-2 items-center rounded-lg hover:px-2 transition-all hover:bg-yz-neutral-100">
                    <span className="text-secondary">12 Nov, 12:00</span>
                    <span className="line-clamp-1">New service is out</span>
                  </button>
                </li> */}
              </ul>
            </div>
          </div>
        </LeftSide>
        <RightSide>
          {children}
        </RightSide>
      </SplitViewContainer>
    </>
  )
}
export default layout