"use client"
import { useTheme } from "@/app/_components/entities/theme"
import Image, { ImageProps } from "next/image"

const SYMBOL_DARK_VARIANT_LOGO = "/brand/yz13-dark.svg"
const SYMBOL_LIGHT_VARIANT_LOGO = "/brand/yz13-light.svg"
const FULL_DARK_VARIANT_LOGO = "/brand/yz13-full-dark.svg"
const FULL_LIGHT_VARIANT_LOGO = "/brand/yz13-full-light.svg"

type Props = {
  mode?: "full" | "symbol"
} & Omit<ImageProps, "src">

const ThemedLogo = ({ mode = "full", ...props }: Props) => {
  const theme = useTheme(state => state.theme)
  const src = theme === "dark" ? mode === "full" ? FULL_DARK_VARIANT_LOGO : SYMBOL_DARK_VARIANT_LOGO : mode === "full" ? FULL_LIGHT_VARIANT_LOGO : SYMBOL_LIGHT_VARIANT_LOGO
  return <Image {...props} src={src} />
}
export { ThemedLogo }
