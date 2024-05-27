import { SidebarLarge } from "../../sidebar-large"

type Props = {
  params: {
    id: string
  }
}
const page = ({ params }: Props) => {
  const id = params.id
  const Work = () => {
    return (
      <>{id}</>
    )
  }
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="md:block hidden w-full no-scrollbar overflow-y-auto h-full p-3 space-y-3">
        <Work />
      </div>
      <SidebarLarge>
        <div className="md:hidden block w-full h-fit space-y-3">
          <Work />
        </div>
      </SidebarLarge>
    </div>
  )
}
export default page