import { DynamicImage } from "@/components/dynamic-image"
import { Button } from "@yz13/mono/components/button"
import Link from "next/link"
import { EmailForm } from "./email-form"

type Props = {
  searchParams: {
    lang?: string
    continue?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const continueLink = searchParams.continue
  const backLink = "/login" + (continueLink ? `?continue=${continueLink}` : "")
  return (
    <div className="max-w-sm w-full mx-auto h-screen">
      <div className="w-full absolute top-0 left-0 flex justify-center p-6">
        <div className="size-12 relative">
          <DynamicImage
            image={{
              dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
              light: "https://yzstatic.yz13.space/logo/yz-light.svg"
            }}
            alt="logo"
          />
        </div>
      </div>
      <div className="flex relative flex-col gap-2 items-center h-full justify-center w-full">
        <EmailForm />
        <Button size="lg" className="rounded-lg w-full" variant="secondary" asChild>
          <Link href={backLink}>
            Вернуться
          </Link>
        </Button>
      </div>
    </div>
  )
}
export default page