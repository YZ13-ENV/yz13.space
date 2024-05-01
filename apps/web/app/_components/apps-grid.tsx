import { Project } from "@/types"
import { cn } from "@repo/ui/cn"
import Image from "next/image"
import Link from "next/link"


const AppItem = ({ className = "", icon, name = "" }: { className?: string, name?: string, icon?: string }) => {
  return (
    <div className={cn('flex flex-col items-center gap-2 group hover:cursor-pointer', className)}>
      {
        icon
          ? <div className='flex items-center justify-center transition-transform aspect-square w-14 h-14 group-hover:scale-110'>
            <Image className='transition-transform group-hover:scale-110' src={icon} width={48} height={48} alt="app-icon" />
          </div>
          : <div className='transition-transform aspect-square rounded-xl w-14 h-14 group-hover:scale-110 bg-muted' />
      }
      <span className='text-sm text-center transition-colors line-clamp-1 group-hover:text-muted-foreground'>{name ? name : "Приложение"}</span>
    </div>
  )
}
type Props = {
  projects?: Project[]
  className?: string
}
const AppsGrid = ({ projects = [], className = "" }: Props) => {
  if (projects.length === 0) return null
  return (
    <div className={cn("relative w-full h-fit", className)}>
      <div className='container w-full mx-auto h-full'>
        <div className='grid w-full gap-4 app-grid auto-rows-auto h-full'>
          {
            projects.map(app =>
              <Link href={app.link} key={"app-" + app.id}>
                <AppItem className='p-2' icon={app.icon} name={app.name} />
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}
export { AppItem, AppsGrid }

