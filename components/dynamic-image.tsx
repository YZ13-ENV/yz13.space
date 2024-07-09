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
const DynamicImage = ({ image, alt = "", className }: DynamicImageProps) => {
  const { dark, light } = image
  return (
    <>
      <Image
        src={dark}
        className={cn("dark-mode-thumbnail", className)}
        fill
        alt={alt || "dark-img"}
      />
      <Image
        src={light}
        className={cn("light-mode-thumbnail", className)}
        fill
        alt={alt || "light-img"}
      />
    </>
  )
}
export { DynamicImage }
