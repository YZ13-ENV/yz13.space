import { VisitorsStack } from "../_components/real-time"
import { CursorsPlayground } from "../_components/real-time/ui/cursors-playground"
import { VisitorSync } from "../_components/real-time/ui/visitor-sync"

const page = () => {
  return (
    <>
      <VisitorSync />
      <div className="w-9 m-6 relative">
        <VisitorsStack />
      </div>
      <CursorsPlayground />
    </>
  )
}
export default page