"use client"
import { ReactNode } from "react"
import { useMediaQuery } from "react-responsive"

type Props = {
  desktop?: ReactNode
  mobile?: ReactNode
}
const Profile = ({ desktop, mobile }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  if (isMobile) return mobile
  return desktop
}
export default Profile
