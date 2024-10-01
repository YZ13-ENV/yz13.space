import { Input } from "@yz13/mono/components/input"
import { PuzzleCanvas } from "./puzzle-canvas"


const page = () => {
  return (
    <div className="w-full h-screen relative">
      <PuzzleCanvas />

      <div className="max-w-xs w-full absolute bottom-4 left-4">
        <Input placeholder="Enter message" />
      </div>
    </div>
  )
}
export default page
