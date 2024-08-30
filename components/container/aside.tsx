"use client"


const Aside = ({ children }: { children?: React.ReactNode }) => {
  return (
    <aside
      style={{ width: "var(--container-nav-sidebar-width)" }}
      className="h-fit sticky top-6 space-y-1 flex flex-col"
    >
      {children}
    </aside>
  )
}
export { Aside }
