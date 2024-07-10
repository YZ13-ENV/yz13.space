import { cn } from "@repo/ui/cn"
import Image from "next/image"


type DynamicImageProps = {
  image: {
    dark: string
    light: string
  }
  alt?: string
  className?: string
}
const DynamicImage = async ({ image, alt = "", className }: DynamicImageProps) => {
  const { dark, light } = image
  const getBASE64 = async (url: string): Promise<`data:image/${string}`> => {
    const res = await fetch(url, { method: "GET" })
    const blob = await (await res.blob()).arrayBuffer()
    const base64Image = `data:${res.headers.get('content-type')};base64,` + Buffer.from(blob).toString('base64') as `data:image/${string}`;
    return base64Image
  }
  const darkPlaceholder = await getBASE64(dark)
  const lightPlaceholder = await getBASE64(light)
  return (
    <>
      <Image
        src={dark}
        placeholder={darkPlaceholder}
        className={cn("dark-mode-thumbnail", className)}
        fill
        alt={alt || "dark-img"}
      />
      <Image
        src={light}
        placeholder={lightPlaceholder}
        className={cn("light-mode-thumbnail", className)}
        fill
        alt={alt || "light-img"}
      />
    </>
  )
}
export { DynamicImage }
