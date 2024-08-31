import { getI18n, Locales } from "@/locales/server"
import { Separator } from "@yz13/mono/components/separator"
import Link from "next/link"
import { GithubButton } from "./github-button"
import { GoogleButton } from "./google-button"

type Props = {
  continue?: string
  lang?: Locales
}
const UnLogged = async ({ continue: continueLink, lang = "en" }: Props) => {
  const signUpLink = "/signup" + (continueLink ? `?continue=${continueLink}` : "")
  const emailLoginLink = "/login/email" + (continueLink ? `?continue=${continueLink}` : "")
  const t = await getI18n()
  return (
    <>
      <h1 className="text-4xl font-bold">{t("login.title")}</h1>
      <div className="flex flex-col w-full max-w-sm gap-3 px-6 py-12 mx-auto">
        <GithubButton continue={continueLink}>
          {t("login.method.social", { "name": "Github" })}
        </GithubButton>
        <GoogleButton continue={continueLink}>
          {t("login.method.social", { "name": "Google" })}
        </GoogleButton>
        <Separator />
        <Link
          href={emailLoginLink}
          className="flex items-center justify-center w-full h-12 gap-2 font-medium rounded-xl disabled:opacity-60"
        >
          {t("login.method.email")}
        </Link>
        {/* <Button variant="ghost" asChild disabled>
          <Link href={signUpLink} className="line-through">
            Looking for a demo?
          </Link>
        </Button> */}
      </div>
    </>
  )
}
export { UnLogged }
