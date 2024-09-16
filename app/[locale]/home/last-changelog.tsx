import json from "@/package.json"
import { Locales } from "@/locales/server";
import { logs } from "@/changelog/log-list";
import { Button } from "@yz13/mono/components/button";


const LastChangelog = ({ lang = "en" }: { lang?: Locales }) => {
  const currentVersion = json.version
  const last = logs.find(log => log.lang.includes(lang) && log.version === currentVersion)
  console.log(last, logs)
  if (!last) return
  return (
    <Button
      size="sm"
      variant="ghost"
      className="!font-normal w-fit h-6"
    >
      {last.version} - {last.title}
    </Button>
  )
}

export { LastChangelog }
