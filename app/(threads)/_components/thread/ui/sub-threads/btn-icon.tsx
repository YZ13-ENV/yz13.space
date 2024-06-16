import { IconType } from "react-icons/lib"

type Props = {
  icon?: IconType
}
const BtnIcon = ({ icon }: Props) => {
  return (
    <span className="relative flex items-center justify-center">
      {icon && icon({ size: 16, className: "z-[1]" })}
      <span className="w-7 h-7 bg-transparent group-hover/tag:bg-yz-neutral-100 transition-colors rounded-full absolute" />
    </span>
  )
}
export { BtnIcon }
