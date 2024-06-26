"use client"

import { getLayoutNav } from "@/app/_conts/nav-pages"
import { createClient } from "@/packages/supabase/src/supabase/client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/packages/ui/src/components/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/packages/ui/src/components/popover"
import { Separator } from "@/packages/ui/src/components/separator"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { PiAddressBookDuotone, PiSignOutDuotone, PiSquaresFourDuotone } from "react-icons/pi"
import { TbMenu, TbX } from "react-icons/tb"



type Props = {
  user: User
}
const FullScreenMenu = ({ user }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const metadata = user.user_metadata
  const name = metadata.name
  const email = metadata.email
  const type = metadata.type || "user"
  const isAdmin = type === "admin"
  const pathname = usePathname()
  const router = useRouter()
  const layout = getLayoutNav(pathname)
  const signOut = async () => {
    const sp = createClient()
    sp.auth.signOut()
      .then(() => router.refresh())
  }
  return (
    <Popover defaultOpen open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-9 bg-background aspect-square rounded-full flex items-center justify-center border">
        {
          open
            ? <TbX size={16} />
            : <TbMenu size={16} />
        }
      </PopoverTrigger>
      <PopoverContent
        style={{ height: "calc(100dvh - 64px)" }}
        className="w-screen px-6 py-0 left-0 top-16 shadow-none border-none rounded-none bg-background"
      >
        <div className="flex flex-col py-4">
          <span className="text-lg text-foreground">{name}</span>
          <span className="text-sm text-secondary">{email}</span>
        </div>
        <Separator />
        <div className="w-full flex flex-col py-4 gap-2">
          {
            isAdmin &&
            <Link href="/dashboard" className="justify-between flex items-center gap-2 h-10">
              Dashboard
              <PiSquaresFourDuotone size={18} />
            </Link>
          }
          {/* <button className="justify-between flex items-center gap-2 h-10">
            Account settings
            <PiSlidersHorizontalDuotone size={18} />
          </button> */}
          {/* </div> */}
          {/* <Separator /> */}
          {/* <div className="w-full py-4"> */}
          <Link href="/contact" className="w-full justify-between flex items-center gap-2 h-10">
            Contact
            <PiAddressBookDuotone size={18} />
          </Link>
        </div>
        <Separator />
        <div className="w-full py-4">
          <button onClick={signOut} className="w-full justify-between flex items-center gap-2 h-10">
            Log out
            <PiSignOutDuotone size={18} />
          </button>
        </div>
        {
          layout &&
          <>
            <Separator />
            <div className="w-full py-4 space-y-2">
              {
                layout.nav
                  .map(item => {
                    const isSingle = item.type === "single"
                    const isGroup = item.type === "group"
                    if (isSingle) {
                      return (
                        <Link href={item.value} className="w-full justify-between flex items-center gap-2 h-10">
                          {item.label}
                          {item.icon({ size: 18 })}
                        </Link>
                      )
                    }
                    if (isGroup) {
                      return (
                        <Accordion type="multiple">
                          <AccordionItem value={item.label} className="border-0">
                            <AccordionTrigger className="w-full font-normal text-base justify-between flex items-center gap-2 p-0 h-10">
                              {item.label}
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2 py-2">
                              {
                                item.items.map(sub_item =>
                                  <Link
                                    href={sub_item.value}
                                    className="w-full justify-between text-base flex items-center gap-2 h-10"
                                  >
                                    {sub_item.label}
                                    {sub_item.icon({ size: 18 })}
                                  </Link>
                                )
                              }
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )
                    }
                    return null
                  })
              }
            </div>
          </>
        }
      </PopoverContent>
    </Popover>
  )
}
export { FullScreenMenu }
