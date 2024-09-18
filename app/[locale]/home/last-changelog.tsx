import json from "@/package.json"
import { Locales } from "@/locales/server";
import { logs } from "@/changelog/log-list";
import { Button } from "@yz13/mono/components/button";
import Link from "next/link";


const LastChangelog = ({ lang = "en" }: { lang?: Locales }) => {
  const currentVersion = json.version
  const last = logs.find(log => log.lang.includes(lang) && log.version === currentVersion)
  if (!last) return
  return (
    <Button
      size="sm"
      variant="ghost"
      className="!font-normal w-fit sm:!max-w-none sm:!line-clamp-none max-w-24 line-clamp-1 h-6"
      asChild
    >
      <Link href="/changelog">
        {last.version} - {last.title}
      </Link>
    </Button>
  )
}

export { LastChangelog }
