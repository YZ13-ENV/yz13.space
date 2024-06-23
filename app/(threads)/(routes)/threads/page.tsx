import Link from "next/link";
import { Suspense } from "react";
import { Contacts } from "../../_components/contacts";
import { Footer } from "../../_components/footer";
import { SearchBar } from "../../_components/search-bar";
import { AdBanner } from "../ad-banner";
import { nav_links } from "../nav-links";
import { Skeleton } from "./skeleton";
import { ThreadsList } from "./threads-list";

type Props = {
  searchParams: {
    filter?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const filter = searchParams.filter
  return (
    <>
      <AdBanner />
      <div className="w-full">
        <div className="border-t lg:border-l-0 border-l  border-r">
          <div className="p-6 border-b w-full space-y-3">
            <SearchBar />
            <nav className="space-x-2">
              {
                nav_links.map(nav =>
                  <Link
                    key={nav.link}
                    className="inline-flex transition-colors gap-1 hover:bg-accents-1 items-center text-foreground/80 hover:text-foreground px-2 py-1 text-sm hover:border-foreground rounded-md border"
                    href={nav.link}
                  >
                    {nav.icon && nav.icon({ className: "text-inherit", size: 16 })}
                    <span className="text-inherit">{nav.label}</span>
                  </Link>
                )
              }
            </nav>
          </div>
          <div className="w-full divide-y">
            <Suspense fallback={<Skeleton />}>
              <ThreadsList filter={filter} />
            </Suspense>
            <Contacts className="p-6" />
            <Footer className="p-6" />
          </div>
        </div>
      </div>
    </>
  )
}
export default page