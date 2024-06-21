"use client"
import dark from "@/public/redesign/yz-dark.svg"
import light from "@/public/redesign/yz-light.svg"
import Image from "next/image"
import { useMemo } from "react"
import { useMediaQuery } from "react-responsive"
type Props = {
  size?: number
  lang?: string
  withTitle?: boolean
}
const Logo = ({ size = 36, lang, withTitle = false }: Props) => {
  const isPreferDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
  const logo = useMemo(() => { return isPreferDark ? dark : light }, [isPreferDark])
  return (
    <div aria-label={isPreferDark ? "dark" : "light"} className="relative flex items-center gap-2">
      <Image src={logo} className="aspect-video" width={size} height={size} alt="logo" />
      {
        withTitle &&
        <span className="text-xl font-bold text-foreground">YZ13</span>
      }
      {
        lang &&
        <span className="absolute text-xs -top-2 -left-4 text-secondary">
          {lang}
        </span>
      }
    </div>
  )
}
export { Logo }
