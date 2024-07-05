"use client"
import { createClient } from "@/packages/supabase/src/supabase/client"
import { cn } from "@/packages/ui/lib/utils"
import { useRouter } from "next/navigation"
import { getURL } from "./get-url"

type Props = {
  continue?: string
}
const GithubButton = ({ continue: continueLink = "" }: Props) => {
  const router = useRouter()
  const signInWithGithub = async () => {
    const continue_flow = continueLink ? `?continue=${continueLink}` : ""
    const sp = createClient()
    const { data, error } = await sp.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: getURL() + "/auth/callback" + continue_flow
      }
    })
    if (data.url) router.push(data.url)
  }
  return (
    <button
      onClick={signInWithGithub}
      className={cn(
        "flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl bg-foreground text-background",
        "hover:bg-foreground/90"
      )}
    >
      Sign in with Github
    </button>
  )
}
export { GithubButton }
