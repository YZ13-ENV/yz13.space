import { cn } from "yz13/cn"
import { DynamicImage } from "../dynamic-image"

type LogoProps = {
  className?: string
}
const LogoHeader = ({ className = "" }: LogoProps) => {
  return (
    <div className={cn("", className)}>
      <DynamicImage
        image={{
          dark: "https://yzstatic.yz13.space/logo/yz-dark.svg",
          light: "https://yzstatic.yz13.space/logo/yz-light.svg"
        }}
        alt="logo"
      />
    </div>
  )
}
export { LogoHeader }
