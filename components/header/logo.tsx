import { cn } from "yz13/cn"
import { DynamicImage } from "../dynamic-image"

type LogoProps = {
  className?: string
}
const LogoHeader = ({ className = "" }: LogoProps) => {
  return (
    <div className={cn("relative", className)}>
      <DynamicImage
        image={{
          dark: "/yz-dark.svg",
          light: "/yz-light.svg"
        }}
        alt="logo"
      />
    </div>
  )
}
export { LogoHeader }
