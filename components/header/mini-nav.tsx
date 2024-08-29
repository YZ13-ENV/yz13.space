import { getI18n } from "@/locales/server"
import { Button } from "@yz13/mono/components/button"
import { FolderCodeIcon, HomeIcon, StickerIcon } from "lucide-react"
import Link from "next/link"

const MiniNav = async () => {
  const t = await getI18n()
  return (
    <div className="w-fit flex items-center h-7">
      <Button className="w-1/3 gap-2 h-full rounded-xl" variant="ghost" size="sm" asChild>
        <Link href="/home">
          <HomeIcon size={16} />
          {t("nav.home")}
        </Link>
      </Button>
      <Button className="w-1/3 gap-2 h-full rounded-xl" variant="ghost" size="sm" asChild>
        <Link href="/works">
          <FolderCodeIcon size={16} />
          {t("nav.works")}
        </Link>
      </Button>
      <Button className="w-1/3 gap-2 h-full rounded-xl" variant="ghost" size="sm" asChild>
        <Link href="/journal">
          <StickerIcon size={16} />
          {t("nav.journal")}
        </Link>
      </Button>
    </div>
  )
}
export { MiniNav }
