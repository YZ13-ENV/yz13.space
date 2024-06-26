import { Suspense } from "react"
import { Contacts, ContactsSkeleton } from "../(threads)/_components/contacts"
import { Header } from "../_components/header"

const page = () => {
  return (
    <>
      <Header />
      <div className="relative w-full max-w-5xl mx-auto mt-20">
        {/* <Connector className="absolute -left-[100%] top-0 w-full" /> */}
        {/* <Connector className="absolute rotate-180 -right-[100%] top-0 w-full" /> */}
        <div className="relative flex flex-col items-center justify-center w-full border h-[70dvh]">
          <div className="w-full h-16 border-b"></div>
          <div className="w-full h-full flex lg:flex-row flex-col divide-x">
            <div className="lg:w-1/2 w-full h-full divide-y">
              <div className="w-full h-fit flex gap-2 items-start flex-col justify-center p-6">
                <h2 className="text-4xl font-bold">
                  Open to talk
                </h2>
                <p className="text-lg text-secondary">
                  Send me message to my socials.
                </p>
              </div>
              <div className="h-2/3 w-full p-6">
                <Suspense fallback={<ContactsSkeleton />}>
                  <Contacts />
                </Suspense>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-full">
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-center text-sm text-secondary">
                  Форма в разработке...
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-16 border-t"></div>
        </div>
      </div>
    </>
  )
}
export default page