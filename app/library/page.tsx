import Link from "next/link"
import { BiChevronRight } from "react-icons/bi"
import { Header } from "../_components/header"

const page = () => {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto w-full space-y-6 py-20">
        <section className="flex flex-col gap-3 px-6 w-full">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-bold">Websites</h2>
            <Link href="/library/websites" className="inline-flex text-sm items-center gap-0">
              See more
              <BiChevronRight size={20} />
            </Link>
          </div>
          <div className="w-full flex gap-3 overflow-x-auto no-scrollbar">
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
          </div>
        </section>
        <section className="flex flex-col gap-3 px-6 w-full">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-bold">Pages</h2>
            <Link href="/library/pages" className="inline-flex text-sm items-center gap-0">
              See more
              <BiChevronRight size={20} />
            </Link>
          </div>
          <div className="w-full flex gap-3 overflow-x-auto no-scrollbar">
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
          </div>
        </section>
        <section className="flex flex-col gap-3 px-6 w-full">
          <div className="w-full flex justify-between">
            <h2 className="text-3xl font-bold">Components</h2>
            <Link href="/library/components" className="inline-flex text-sm items-center gap-0">
              See more
              <BiChevronRight size={20} />
            </Link>
          </div>
          <div className="w-full flex gap-3 overflow-x-auto no-scrollbar">
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
            <div className="h-80 aspect-square bg-yz-neutral-100 border rounded-xl"></div>
          </div>
        </section>
      </div>
    </>
  )
}
export default page