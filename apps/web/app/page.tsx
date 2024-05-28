"use server"
import { get } from "@vercel/edge-config";
import { getThreads } from "@yz13/api/db/threads";
import { Contact } from "@yz13/api/edge/types";
import Image from "next/image";
import Link from "next/link";
import { Thread } from "./_components/thread/ui/thread";
import { Sidebar } from "./sidebar";

const page = async () => {
  const contacts = await get<Contact[]>("contacts")
  const threads_res = await getThreads()
  const threads = (threads_res.data || [])
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="w-full h-full">
        <div className="w-full max-w-xl mx-auto h-full space-y-12 md:px-6 px-3 py-12">
          <div className="flex items-center justify-center">
            <Image src="/brand/yz13-dark.svg" width={36} height={36} alt="brand-logo" />
          </div>
          <div className="w-full space-y-3">
            {
              threads.map(
                (thread) => <Thread
                  key={thread.thread_id + "-" + thread.created_at}
                  thread={thread}
                  className="hover:bg-accents-1 transition-all rounded-2xl"
                  max={3}
                  enableLink
                />
              )
            }
            <section className="space-y-3 py-6">
              <h2 className="text-sm text-secondary uppercase">contact</h2>
              <ul className="divide-y">
                {
                  contacts &&
                  contacts.map(contact =>
                    <li key={`bottom-${contact.value}`}>
                      <Link href={contact.value} className="flex h-9 items-center justify-between">
                        <span className="text-sm">{contact.label}</span>
                        <span className="text-sm">{contact.value_label}</span>
                      </Link>
                    </li>
                  )
                }
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