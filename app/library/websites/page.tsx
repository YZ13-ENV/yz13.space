import { Header } from "@/app/_components/header"
import { WebsiteWrapper } from "./website-wrapper"

const page = () => {
  return (
    <>
      <Header />
      <div className="w-full my-20 flex justify-center">
        <h1 className="text-6xl font-bold text-center">Websites</h1>
      </div>
      <div className="w-full divide-y">
        <WebsiteWrapper />
        <WebsiteWrapper />
        <WebsiteWrapper />
        <WebsiteWrapper />
        <WebsiteWrapper />
        <WebsiteWrapper />
        <WebsiteWrapper />
        <WebsiteWrapper />
        <WebsiteWrapper />
      </div>
    </>
  )
}
export default page