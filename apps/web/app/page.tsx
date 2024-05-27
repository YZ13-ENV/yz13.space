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
      <aside className="w-96 shrink-0 p-6 flex flex-col gap-3 h-full">
        <div className="w-12 h-12 rounded-full bg-accents-1"></div>
        <div className="flex flex-col">
          <h1 className="text-xl">YZ13</h1>
          <p>Frontend developer</p>
        </div>
        <div className="flex flex-col">
          <span className="uppercase text-sm text-secondary">about</span>
          <p>Hi :)</p>
        </div>
        <div className="flex flex-col">
          <span className="uppercase text-sm text-secondary">contact</span>
          <ul>
            <li>
              <div className="flex h-9 items-center justify-start gap-2">
                <BsTelegram />
                <span className="text-sm">YZTHECEO</span>
              </div>
            </li>
            <li>
              <div className="flex h-9 items-center justify-start gap-2">
                <BsTwitterX />
                <span className="text-sm">@YZ13_DEV</span>
              </div>
            </li>
            <li>
              <div className="flex h-9 items-center justify-start gap-2">
                <BsGithub />
                <span className="text-sm">YZ13-ENV</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <span className="uppercase text-sm text-secondary">skills</span>
          <div className="flex flex-row flex-wrap gap-1 w-full">
            <span className="px-2 py-1 text-sm rounded-full border">TypeScript</span>
          </div>
        </div>
        <div className="w-full mt-auto flex items-center gap-3">
          <Button size="icon" variant="ghost"><BsGithub size={24} /></Button>
        </div>
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
              <h2 className="text-sm text-secondary uppercase">contact</h2>
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