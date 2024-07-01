import { Header } from "@/app/_components/header";
import { Suspense } from "react";
import { Contacts, ContactsSkeleton } from "../../_components/contacts";
import { Footer } from "../../_components/footer";
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
      <div className="w-full divide-y">
        <Header />
        <Suspense fallback={<Skeleton />}>
          <ThreadsList filter={filter} />
        </Suspense>
        <Suspense fallback={<ContactsSkeleton />}>
          <Contacts className="p-6" />
        </Suspense>
        <Footer className="p-6" />
      </div>
    </>
  )
}
export default page