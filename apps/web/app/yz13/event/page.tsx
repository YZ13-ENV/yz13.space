import { Sidebar } from "../sidebar-large"
import { SidebarMini } from "../sidebar-mini"

const page = () => {
  return (
    <div className="w-full h-screen flex flex-row-reverse">
      <Sidebar />
      <div className="w-full no-scrollbar overflow-y-auto h-full p-3 space-y-3">
      </div>
      <SidebarMini />
    </div>
  )
}
export default page