"use client"

import { isDev } from "@/packages/api/src/const"
import { createClient } from "@/packages/supabase/src/supabase/client"
import { cn } from "@/packages/ui/lib/utils"

const GithubButton = () => {
  const signInWithGithub = async () => {
    const callback_url = isDev ? "http://localhost:3000" : "https://www.yz13.space"
    const sp = createClient()
    const { data, error } = await sp.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: callback_url + "/auth/callback"
      }
    })
    console.log(data, error)
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
