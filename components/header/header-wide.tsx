import { cn } from "yz13/cn"

const WideHeader = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <header
      className={cn(
        "flex justify-between items-center px-6 w-full max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </header>
  )
}
export { WideHeader }
