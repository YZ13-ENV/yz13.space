import { Button } from "@repo/ui/button"
import { BiLeftArrowAlt } from "react-icons/bi"
import { Modal } from "../modal"

const page = () => {
  const MobileModalContent = () => {
    return (
      <div className="max-w-sm w-full space-y-4">
        <div className="w-full p-4 rounded-lg border bg-background">
          <h2 className="text-2xl font-bold">YZ13/real-time</h2>
          <p className="text-secondary text-sm">
            Real time feature is now available on mobiles and tablets, sorry.
          </p>
        </div>
        <Button variant="outline" className="w-full gap-2">
          <BiLeftArrowAlt size={16} className="text-inherit" />
          Leave
        </Button>
      </div>
    )
  }
  return (
    <Modal>
      <MobileModalContent />
    </Modal>
  )
}
export default page