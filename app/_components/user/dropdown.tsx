import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/packages/ui/src/components/dropdown-menu"
import { Separator } from "@/packages/ui/src/components/separator"
import { User } from "@supabase/supabase-js"
import { ReactNode } from "react"
import { LuLayoutGrid } from "react-icons/lu"

type Props = {
  children?: ReactNode
  user: User
}
const UserDropdown = ({ children, user }: Props) => {
  const metadata = user.user_metadata
  const name = metadata.name
  const email = metadata.email
  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild={!!children}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 gap-0 p-0 space-y-0 rounded-xl h-fit">
        <DropdownMenuLabel className="flex flex-col p-3">
          <span className="text-lg">{name}</span>
          <span className="text-sm text-secondary">{email}</span>
        </DropdownMenuLabel>
        <Separator />
        <div className="w-full p-3">
          <DropdownMenuItem className="gap-2 h-9">
            <LuLayoutGrid size={14} />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 h-9">
            Account settings
          </DropdownMenuItem>
        </div>
        <Separator />
        <div className="w-full p-3">
          <div className="flex items-center w-full">
            <button className="w-1/2 rounded-l-lg h-9 bg-yz-neutral-200"></button>
            <button className="w-1/2 rounded-r-lg h-9 bg-yz-neutral-200"></button>
          </div>
        </div>
        <Separator />
        <div className="w-full p-3">
          <DropdownMenuItem className="gap-2 h-9">
            Log out
          </DropdownMenuItem>
        </div>
        <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export { UserDropdown }
