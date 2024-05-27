"use server"
import { Button } from "@repo/ui/button";
import Image from "next/image";
import { ReactNode } from "react";
import { BiChart, BiHeart } from "react-icons/bi";
import { BsGithub, BsTelegram, BsTwitterX } from "react-icons/bs";

const page = async () => {
  const Thread = ({ children }: { children?: ReactNode }) => {
    return (
      <div className="flex items-start p-3 border gap-3 rounded-2xl">
        <div className="w-9 aspect-square h-9 rounded-full bg-accents-2"></div>
        <div className="w-full flex flex-col gap-3">
          {children}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <BiHeart size={16} />
                <span className="text-sm text-inherit">0</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <BiChart size={16} />
                <span className="text-sm text-inherit">0</span>
              </Button>
            </div>
            <span className="text-xs">14 May, 2024</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex w-full h-screen">
      <aside className="w-96 shrink-0 p-6 h-full">

      </aside>
      <div className="w-full h-full">
        <div className="w-full max-w-xl mx-auto h-full space-y-12 px-6 py-12">
          <div className="flex items-center justify-center">
            <Image src="/brand/yz13-dark.svg" width={36} height={36} alt="brand-logo" />
          </div>
          <div className="w-full space-y-3">
            <Thread>
              <div className="flex gap-1 items-center">
                <Button size="icon" variant="ghost"><BsGithub size={16} /></Button>
                <Button size="icon" variant="ghost"><BsTelegram size={16} /></Button>
                <Button size="icon" variant="ghost"><BsTwitterX size={16} /></Button>
              </div>
            </Thread>
            <Thread>
              <section className="space-y-2 w-full">
                <h2 className="text-2xl font-semibold">Hi, i am YZ13</h2>
                <p className="text-xl">
                  I'm a frontend developer who likes to create user interface designs in my free time.
                </p>
              </section>
            </Thread>
            <section className="space-y-3 py-6">
              <h2 className="text-sm text-secondary capitalize">contact</h2>
              <ul className="divide-y">
                <li>
                  <div className="flex h-9 items-center justify-between">
                    <span className="text-sm">Telegram</span>
                    <span className="text-sm">YZTHECEO</span>
                  </div>
                </li>
                <li>
                  <div className="flex h-9 items-center justify-between">
                    <span className="text-sm">Twitter(X)</span>
                    <span className="text-sm">@YZ13_DEV</span>
                  </div>
                </li>
                <li>
                  <div className="flex h-9 items-center justify-between">
                    <span className="text-sm">Github</span>
                    <span className="text-sm">YZ13-ENV</span>
                  </div>
                </li>
              </ul>
            </section>
            <footer>
              <span className="text-sm">©2024 YZ13</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
export default page