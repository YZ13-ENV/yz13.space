"use client"
import dark from "@/public/redesign/yz-dark.svg"
import light from "@/public/redesign/yz-light.svg"
import Image from "next/image"
import { useMediaQuery } from "react-responsive"
type Props = {
  size?: number
  lang?: string
}
const Logo = ({ size = 36, lang }: Props) => {
  const isPreferDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
  console.log(isPreferDark)
  const logo = isPreferDark ? dark : light
  return (
    <div className="relative">
      <Image src={logo} className="aspect-video" width={size} height={size} alt="logo" />
      {
        lang &&
        <span className="text-xs absolute -top-2 -right-5 text-secondary">{lang}</span>
      }
    </div>
  )
}
export { Logo }
