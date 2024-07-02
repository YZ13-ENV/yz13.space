import { LuDot } from "react-icons/lu"

const Loader = ({ text = "" }: { text: string }) => {
  return (
    <div className="w-full h-6 flex items-center gap-1">
      <div className="-space-x-2">
        <LuDot size={20} className="h-6 aspect-square inline-block animate-ping duration-1000 delay-0" />
        <LuDot size={20} className="h-6 aspect-square inline-block animate-ping duration-1000 delay-300" />
        <LuDot size={20} className="h-6 aspect-square inline-block animate-ping duration-1000 delay-500" />
      </div>
      <span className="text-sm">{text}...</span>
    </div>
  )
}
export { Loader }
