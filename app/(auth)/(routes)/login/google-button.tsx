"use client"

import { createClient } from "@/packages/supabase/src/supabase/client"
import { cn } from "@/packages/ui/lib/utils"

const GoogleButton = () => {
  const signInWithGoogle = async () => {
    const sp = createClient()
    const { data, error } = await sp.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "http://localhost:3000/auth/callback"
      }
    })
    console.log(data, error)
  }
  return (
    <button
      onClick={signInWithGoogle}
      className={cn(
        "flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl bg-foreground text-background",
        "hover:bg-foreground/90"
      )}
    >
      Sign in with Google
    </button>
  )
}
export { GoogleButton }
