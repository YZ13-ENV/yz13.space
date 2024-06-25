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
          <div className="w-full h-full flex divide-x">
            <div className="w-1/2 h-full divide-y">
              <div className="w-full h-1/3 flex gap-2 items-start flex-col justify-center p-12">
                <h2 className="text-4xl font-bold">
                  Open to talk
                </h2>
                <p className="text-lg text-secondary">
                  Send me message to my socials or fill form and i text you back.
                </p>
              </div>
              <div className="h-2/3 w-full"></div>
            </div>
            <div className="w-1/2 h-full"></div>
          </div>
          <div className="w-full h-16 border-t"></div>
        </div>
      </div>
    </>
  )
}
export default page