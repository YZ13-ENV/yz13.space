import { DefaultHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"
import Link from "next/link"
import { BsGithub, BsTelegram } from "react-icons/bs"

const page = () => {
  return (
    <>
      <DefaultHeader />
      <div className="page-wrapper w-full -top-16 relative">
        <div className="w-full pt-32">
          <div className="container space-y-12">
            <h1 className="text-7xl text-center font-semibold">Contact.</h1>
            <div className='mx-auto w-fit flex flex-col gap-4'>
              <Link href="https://t.me/YZTHECEO" className="inline-flex items-center gap-2">
                <BsTelegram size={24} />
                <span>YZTHECEO</span>
              </Link>
              <Link href="https://github.com/YZ13-ENV" className="inline-flex items-center gap-2">
                <BsGithub size={24} />
                <span>YZ13</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default page