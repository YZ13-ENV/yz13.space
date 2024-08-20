import Image, { ImageProps } from "next/image"
import { cn } from "yz13/cn"


export type ThemedImage = {
  dark: string
  light: string
}

type DynamicImageProps = {
  image: ThemedImage
  alt?: string
  className?: string
} & Omit<ImageProps, "src">
const DynamicImage = async ({ image, alt = "", className, ...props }: DynamicImageProps) => {
  const { dark, light } = image
  const getBASE64 = async (url: string): Promise<`data:image/${string}`> => {
    try {
      const res = await fetch(url, { method: "GET" })
      const blob = await (await res.blob()).arrayBuffer()
      const base64Image = `data:${res.headers.get('content-type')};base64,` + Buffer.from(blob).toString('base64') as `data:image/${string}`;
      return base64Image
    } catch (e) {
      console.log(e)
      return "data:image/" as `data:image/${string}`
    }
  }
  // const darkPlaceholder = await getBASE64(dark)
  // const lightPlaceholder = await getBASE64(light)
  return (
    <>
      <Image
        {...props}
        src={dark}
        // placeholder={darkPlaceholder}
        className={cn("dark-mode-thumbnail", className)}
        fill
        alt={alt || "dark-img"}
      />
      <Image
        {...props}
        src={light}
        // placeholder={lightPlaceholder}
        className={cn("light-mode-thumbnail", className)}
        fill
        alt={alt || "light-img"}
      />
    </>
  )
}
export { DynamicImage }
