import { DynamicImage } from "@/components/dynamic-image"
import Link from "next/link"


const NotFound = () => {
  return (
    <>
      <div className="w-full flex-col gap-6 flex items-center justify-center h-screen">
        <div className="h-64 w-64 xl:absolute shrink-0 relative top-0 left-0">
          <Link href="/home">
            <DynamicImage
              image={{
                dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
                light: "https://yzstatic.yz13.space/logo/yz-light.svg"
              }}
              className="opacity-10"
              alt="logo"
            />
          </Link>
        </div>
        <h1 className="text-4xl font-semibold text-secondary">404</h1>
      </div>
    </>
  )
}
export default NotFound