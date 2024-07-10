import { DynamicImage } from "@/components/dynamic-image"
import { get } from "@vercel/edge-config"

const Banner = async () => {
  const banner = await get<{ dark: string, light: string }>("home-banner")
  return (
    <div className="w-full aspect-video shrink-0 rounded-xl relative bg-background border">
      {
        banner &&
        <DynamicImage image={banner} className="rounded-xl w-full aspect-video h-full" />
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
