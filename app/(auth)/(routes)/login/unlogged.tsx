import { Logo } from "@/app/_components/logo"
import { Separator } from "@/packages/ui/src/components/separator"
import { GithubButton } from "./github-button"

const UnLogged = () => {
  return (
    <>
      <Logo size={96} />
      <h1 className="text-4xl font-bold">Login in to YZ13</h1>
      <div className="flex flex-col w-full max-w-sm gap-3 px-6 py-12 mx-auto">
        <GithubButton />
        <Separator />
        <button
          className="flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl"
        >
          Sign in with Email
        </button>
      </div>
    </>
  )
}
export { UnLogged }
