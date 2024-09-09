import json from "@/package.json"
import { Skeleton } from "@yz13/mono/components/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import { TeamInfo } from "@/app/[locale]/home/team-info/team-info";
import { UserActivity } from "@/app/[locale]/home/activity/activity-widget";
import { Separator } from "@yz13/mono/components/separator";
import { JournalLastFive } from "@/app/[locale]/journal/journal-last-five";
import { getCurrentLocale } from "@/locales/server";
import { Header } from "@/components/header/tiny-header/header";
import { FolderIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YZ13 - developer that you looking for",
};

const page = async () => {
  const lang = getCurrentLocale()
  return (
    <div className="max-w-4xl w-full mx-auto space-y-0">
      <Header />
      <div className="w-full grid md:!grid-cols-4 grid-cols-1 auto-rows-auto gap-2 px-2">
        <div className="col-span-2 row-span-2 w-full flex h-full flex-col gap-2">
          <div className="w-full flex gap-4 shrink-0 flex-row p-4 rounded-2xl border h-36 bg-yz-neutral-50">
            <div className="w-fit shrink-0 flex h-full flex-col">
              <span>Works</span>
              <span className="text-2xl font-medium">24</span>
            </div>
            <div className="w-full h-full">
              <ul className="divide-y h-full">
                <li className="h-1/3">
                  <div className="w-full flex items-center h-full gap-2">
                    <FolderIcon size={16} />
                    <span className="text-sm text-foreground">repo/user</span>
                    <span className="text-sm text-secondary">last commmit</span>
                  </div>
                </li>
                <li className="h-1/3">
                  <div className="w-full flex items-center h-full gap-2">
                    <FolderIcon size={16} />
                    <span className="text-sm text-foreground">repo/user</span>
                    <span className="text-sm text-secondary">last commmit</span>
                  </div>
                </li>
                <li className="h-1/3">
                  <div className="w-full flex items-center h-full gap-2">
                    <FolderIcon size={16} />
                    <span className="text-sm text-foreground">repo/user</span>
                    <span className="text-sm text-secondary">last commmit</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex gap-4 flex-col p-4 col-span-2 rounded-2xl border h-full bg-yz-neutral-50">
            <Link href="/canvas/journal" className="font-medium">Journal</Link>
            <Suspense fallback={
              <ul className="h-fit w-full space-y-3">
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
                <Skeleton className="w-1/2 h-6 rounded-lg" />
              </ul>
            }>
              <JournalLastFive lang={lang} />
            </Suspense>
          </div>
        </div>
        <div className="w-full h-fit p-4 col-span-2 flex flex-col gap-2 row-span-2 rounded-2xl border bg-yz-neutral-50">
          <Suspense fallback={<Skeleton className="rounded-xl w-full h-40" />}>
            <TeamInfo />
          </Suspense>
          <Separator />
          <Suspense fallback={<Skeleton className="rounded-xl w-full h-36" />}>
            <UserActivity uid="d5f98156-1776-42da-8f20-686d6a1ae2a8" lang={lang} />
          </Suspense>
        </div>
      </div>
      <footer className="w-full p-2 flex items-center justify-between">
        <span className="text-xs text-secondary">YZ13 - 2024</span>
        <span className="text-xs text-secondary">{json.version}</span>
      </footer>
    </div>
  );
};
export default page;
