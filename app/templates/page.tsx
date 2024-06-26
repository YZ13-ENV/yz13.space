import { Button } from "@/packages/ui/src/components/button"
import { Input } from "@/packages/ui/src/components/input"
import { Separator } from "@/packages/ui/src/components/separator"
import { BiDollar } from "react-icons/bi"
import { Header } from "../_components/header"

const page = () => {
  return (
    <>
      <Header />
      <div className="w-full max-w-2xl space-y-2 mx-auto py-12 px-3 h-fit">
        <h1 className="text-6xl text-center font-bold">
          Templates
        </h1>
        <p className="text-secondary text-xl text-center">
          There is a free and paid templates, we tried to create a different types of templates, so
          everyone can find favorite template
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto flex lg:flex-row flex-col py-6 h-fit">
        <aside className="lg:max-w-80 max-w-full w-full p-3 space-y-3">
          <Input placeholder="Search" />
          <Separator />
          <Button className="w-full justify-start" variant="secondary">Paid</Button>
          <Button className="w-full justify-start" variant="secondary">Free</Button>
          <Separator />
          <Button className="w-full justify-start" variant="secondary">Commercial</Button>
          <Button className="w-full justify-start" variant="secondary">Blog</Button>
        </aside>
        <div className="w-full h-full p-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 auto-rows-auto">

          <div className="w-full aspect-[4/3] border relative rounded-xl">
            <span className="absolute top-3 right-3 border bg-background rounded-full w-6 h-6 flex items-center justify-center">
              <BiDollar className="text-secondary" size={16} />
            </span>
            <div
              className="absolute left-0 bottom-0 border-r border-t py-1 px-1.5 bg-background rounded-tr-xl rounded-bl-xl"
            >
              <span className="text-sm text-secondary">Template name</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
export default page