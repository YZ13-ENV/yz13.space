import { DynamicImage } from "@/components/dynamic-image"
import { RadioGroup, RadioItem, RadioLabel } from "@/components/radio-group"
import { Button } from "@/packages/ui/src/components/button"
import { Input } from "@/packages/ui/src/components/input"
import Link from "next/link"
import { MdOpenInNew } from "react-icons/md"

type Props = {
  searchParams: {
    lang?: string
    continue?: string
  }
}
const page = async ({ searchParams }: Props) => {
  const continueLink = searchParams.continue
  const loginLink = "/login" + (continueLink ? `?continue=${continueLink}` : "")
  return (
    <div className="max-w-3xl w-full mx-auto h-screen">
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
      <div className="flex flex-col items-center relative justify-center w-full h-screen">
        <h1 className="max-w-sm mx-auto text-4xl font-bold text-center">
          Not working
          {/* Create your YZ13&nbsp;Account */}
        </h1>
        <div className="w-full max-w-md py-12 space-y-6">
          <div className="w-full max-w-md mx-auto">
            <RadioGroup className="flex flex-col w-full gap-3">
              <RadioLabel value="person" className="flex w-full p-2.5 rounded-lg h-fit">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">Person</span>
                  <span className="text-sm text-secondary">
                    I'm working on personal projects
                  </span>
                </div>
                <div className="flex items-center ml-auto">
                  <RadioItem value="person" />
                </div>
              </RadioLabel>
              <RadioLabel value="team" className="flex w-full h-16 p-2.5 border rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">Team</span>
                  <span className="text-sm text-secondary">
                    I'm working on commercial projects
                  </span>
                </div>
                <div className="flex items-center ml-auto">
                  <RadioItem value="team" />
                </div>
              </RadioLabel>
              <RadioLabel value="guest" className="flex w-full h-16 p-2.5 border rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-foreground">Guest</span>
                  <span className="text-sm text-secondary">
                    I just want to try demo
                  </span>
                </div>
                <div className="flex items-center ml-auto">
                  <RadioItem value="guest" />
                </div>
              </RadioLabel>
            </RadioGroup>
          </div>
          <div className="w-full space-y-3">
            <div className="w-full space-y-1">
              <span className="text-xs text-secondary">Name</span>
              <Input placeholder="Write there" className="h-10 rounded-lg" />
            </div>
          </div>
          <Button className="w-full h-10" disabled>Continue</Button>
          <Button className="w-full" variant="ghost" asChild>
            <Link href={loginLink}>
              Already have account?
            </Link>
          </Button>
          <div className="py-6">
            <span className="text-sm inline-flex gap-1 items-center flex-wrap">
              By joining, you agree to our
              <Link href="/legal/terms" className="text-foreground inline-flex items-center gap-1 hover:underline">Terms of Service <MdOpenInNew size={14} /></Link>
              and
              <Link href="/legal/privacy-policy" className="text-foreground inline-flex items-center gap-1 hover:underline">Privacy Policy <MdOpenInNew size={14} /></Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default page