import { Nav } from "@/app/_components/nav";
import { Suspense } from "react";
import { Contacts, ContactsSkeleton } from "../../_components/contacts";
import { Footer } from "../../_components/footer";
import { SearchBar } from "../../_components/search-bar";
import { AdBanner } from "../ad-banner";
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
            <Nav />
          </div>
          <div className="w-full divide-y">
            <Suspense fallback={<Skeleton />}>
              <ThreadsList filter={filter} />
            </Suspense>
            <Suspense fallback={<ContactsSkeleton />}>
              <Contacts className="p-6" />
            </Suspense>
            <Footer className="p-6" />
          </div>
        </div>
      </div>
    </>
  )
}
export default page