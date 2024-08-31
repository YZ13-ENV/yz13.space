import { DynamicImage } from "@/components/dynamic-image"
import { Locales } from "@/locales/server"
import { cookies } from "next/headers"
import { createClient } from "yz13/supabase/server"
import { Logged } from "./logged"
import { UnLogged } from "./unlogged"

type Props = {
  params: {
    locale: Locales
  }
  searchParams: {
    lang?: string
    continue?: string
  }
}
const page = async ({ searchParams, params }: Props) => {
  const lang = params.locale
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  const continueLink = searchParams.continue
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
      <div className="flex relative flex-col items-center h-full justify-center w-full">
        {
          isLogged
            ? <Logged user={user} continue={continueLink} />
            : <UnLogged lang={lang} continue={continueLink} />
        }
      </div>
    </div>
  )
}
export default page