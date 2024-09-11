"use client"

import { cn } from "yz13/cn"


const Aside = ({ children }: { children?: React.ReactNode }) => {
  return (
    <aside
      //     style={{ width: "var(--container-nav-sidebar-width)" }}
      className={cn(
        "h-fit lg:!w-44 md:!w-36 shrink-0 w-fit sticky lg:!top-6 top-3 space-y-1 flex flex-col",
        "z-10"
      )}
    >
      {children}
    </aside>
  )
}
export { Aside }
