"use client"
import dark from "@/public/brand/yz-dark.svg"
import light from "@/public/brand/yz-light.svg"
import Image from "next/image"
import { useMediaQuery } from "react-responsive"
type Props = {
  size?: number
  lang?: string
}
const Logo = ({ size = 36, lang }: Props) => {
  const isPreferDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
  const logo = isPreferDark ? dark : light
  return (
    <div className="relative">
      <Image src={logo} width={size} height={36} alt="logo" />
      {
        lang &&
        <span className="text-xs absolute -top-2 -right-6 text-secondary">{lang}</span>
      }
    </div>
  )
}
export { Logo }
