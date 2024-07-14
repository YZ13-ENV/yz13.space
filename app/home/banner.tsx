import { DynamicImage } from "@/components/dynamic-image"
import { cn } from "@repo/ui/cn"
import { get } from "@vercel/edge-config"

const Banner = async ({ className = "" }: { className?: string }) => {
  const banner = await get<{ dark: string, light: string }>("home-banner")
  return (
    <div
      itemScope itemType="http://schema.org/ImageObject"
      className={cn(
        "w-full aspect-video shrink-0 rounded-xl relative bg-background border",
        className
      )}
    >
      {
        banner &&
        <DynamicImage
          image={banner}
          className="rounded-xl w-full aspect-video h-full" alt="dynamic-image"
          itemProp="contentUrl"
        />
      }
    </div>
  )
}

const BannerSkeleton = () => {
  return (
    <div className="w-full aspect-video rounded-xl relative bg-yz-neutral-300 animate-pulse border" />
  )
}
export { Banner, BannerSkeleton }
