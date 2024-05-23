import { yz13_full_dark } from "@yz13/assets/brand"
import Image from "next/image"

const page = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 h-dvh">
      <div className="flex items-center gap-3">
        <Image src={yz13_full_dark} height={36} alt="image" />
        <span className="text-2xl">/</span>
        <h1 className="text-4xl font-bold">HUB</h1>
      </div>
      <span>This website should provide ability to serve developers portfolio</span>
    </div>
  )
}
export default page