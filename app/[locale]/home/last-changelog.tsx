import json from "@/package.json"
import { Locales } from "@/locales/server";
import { logs } from "@/changelog/log-list";
import Link from "next/link";
import { cn } from "yz13/cn";


const LastChangelog = ({ lang = "en" }: { lang?: Locales }) => {
  const currentVersion = json.version
  const last = logs.find(log => log.lang.includes(lang) && log.version === currentVersion)
  if (!last) return
  return (
    <Link
      href="/changelog"
      className={cn(
        "sm:!line-clamp-none line-clamp-1",
        "text-xs shrink-0",
        "text-secondary hover:text-foreground",
        "sm:!max-w-none max-w-16 transition-colors"
      )}
    >
      {last.version} - {last.title}
    </Link>
  )
}

export { LastChangelog }
