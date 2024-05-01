import { DefaultHeader } from "@/components/entities/header"
import { Footer } from "@/components/shared/footer"

const page = () => {
  return (
    <>
      <DefaultHeader />
      <div className="page-wrapper w-full -top-16 relative">
        <div className="w-full pt-32">
          <div className="container flex flex-col gap-4">
            <h1 className="text-7xl font-semibold">About. <span className="text-muted-foreground">YZ13.</span></h1>
            <p className="text-3xl">
              There you can know me better, when i end up this section
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default page