import { cn } from "yz13/cn"

type MainProps = {
  className?: string
  children?: React.ReactNode
}
const Main = ({ children, className = "" }: MainProps) => {
  return (
    <main className={cn(
      "w-full h-fit pt-24 pl-6 gap-6 pr-10 pb-12 flex",
      className
    )}>
      {children}
    </main>
  )
}
export { Main }
