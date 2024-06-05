"use client"
import { ReactNode } from "react"
import { useMediaQuery } from "react-responsive"

type Props = {
  desktop?: ReactNode
  mobile?: ReactNode
}
const Wrapper = ({ desktop, mobile }: Props) => {

  const isMobile = useMediaQuery({ query: '(max-width: 786px)' })
  const type = isMobile ? "mobile" : "desktop"
  if (type === "desktop") return desktop
  if (type === "mobile") return mobile
  return null
}
export { Wrapper }
