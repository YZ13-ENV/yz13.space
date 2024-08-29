"use client"
import { useI18n } from "@/locales/client"
import { User } from "@supabase/supabase-js"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"
import { Button } from "@yz13/mono/components/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "yz13/supabase/client"

type Props = {
  user: User
  continue?: string
}
const Logged = ({ user, continue: continueLink }: Props) => {
  const email = user.email
  const phone = user.phone
  const metadata = user?.user_metadata
  const avatar_url = metadata?.avatar_url
  const name = metadata?.name ?? "User"
  const router = useRouter()
  const t = useI18n()
  const signOut = () => {
    const sp = createClient()
    sp.auth.signOut()
    router.refresh()
  }
  return (
    <>
      <div className="flex flex-col w-full max-w-sm gap-3 justify-center items-center px-6 py-12 mx-auto">
        <Avatar className="size-16 border rounded-full">
          <AvatarImage src={avatar_url} />
          <AvatarFallback className="uppercase">{name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-center font-medium text-lg">{name}</span>
          <span className="text-center text-secondary text-sm">{email ?? phone}</span>
        </div>
        <span>{t("login.authorized.title")}</span>
        <div className="flex items-center gap-2 mt-4">
          <Button size="icon" variant="secondary" asChild>
            <Link href={continueLink ?? "/"}><ArrowLeft size={16} /></Link>
          </Button>
          <Button onClick={signOut}>{t('login.authorized.sign-out')}</Button>
        </div>
      </div>
    </>
  )
}
export { Logged }
