import HomePageV1 from "./home-page-v1"
import HomePageV2 from "./home-page-v2"

const page = () => {
  return (
    <div className="space-y-6 py-6">
      <section className="px-6">
        <div className="relative rounded-2xl border overflow-hidden">
          <span className="absolute left-6 top-6 px-2 py-1 text-sm border bg-background">V1</span>
          <HomePageV1 />
        </div>
      </section>
      <section className="px-6">
        <div className="relative rounded-2xl border overflow-hidden">
          <span className="absolute left-6 top-6 px-2 py-1 text-sm border bg-background">V2</span>
          <HomePageV2 />
        </div>
      </section>
    </div>
  )
}
export default page