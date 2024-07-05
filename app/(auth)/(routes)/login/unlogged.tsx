import { Separator } from "@/packages/ui/src/components/separator"
import { GithubButton } from "./github-button"
import { GoogleButton } from "./google-button"

type Props = {
  continue?: string
}
const UnLogged = ({ continue: continueLink }: Props) => {
  return (
    <>
      <h1 className="text-4xl font-bold">Login in to YZ13</h1>
      <div className="flex flex-col w-full max-w-sm gap-3 px-6 py-12 mx-auto">
        <GithubButton continue={continueLink} />
        <GoogleButton continue={continueLink} />
        <Separator />
        <button
          disabled
          className="flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl disabled:opacity-60"
        >
          Sign in with Email
        </button>
      </div>
    </>
  )
}
export { UnLogged }
