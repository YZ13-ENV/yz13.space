import { cn } from "yz13/cn"

type MainProps = {
  className?: string
  children?: React.ReactNode
}
const Main = ({ children, className = "" }: MainProps) => {
  return (
    <main className={cn(
      "w-full max-w-7xl mx-auto h-fit flex",
      "lg:!pl-6 lg:!pr-10 lg:!py-12 lg:!gap-6",
      "p-3 gap-3",
      className
    )}>
      {children}
    </main>
  )
}
export { Main }
