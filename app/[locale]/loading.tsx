import { Loader2Icon } from "lucide-react"


const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2Icon className="animate-spin" size={16} />
    </div>
  )
}
export default Loading
