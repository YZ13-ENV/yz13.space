import { Skeleton } from "@yz13/mono/components/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { SearchIcon, SettingsIcon, UserIcon, WifiIcon } from "lucide-react";
import { LocalData } from "../home/local-data";
import Link from "next/link";
import { JournalLastFive } from "../journal/journal-last-five";
import { Button } from "@yz13/mono/components/button";

export const metadata: Metadata = {
  title: "YZ13 - developer that you looking for",
};

const page = async () => {
  const lang = getCurrentLocale();
  const t = await getI18n();
  return (
    <div className="flex min-h-screen w-full flex-col divide-y md:!flex-row md:!divide-x">
      <div className="h-fit md:!sticky static top-0 w-full space-y-12 md:!h-screen md:!w-1/2">
        <div className="w-full h-fit p-2 flex items-center justify-end">
          <Button className="h-6 py-0 max-w-xs w-fit" variant="ghost" size="sm">
            <span className="text-xs line-clamp-1">1.0.0 - Redesign, again</span>
          </Button>
          <Button className="size-6 p-0" variant="ghost" size="icon">
            <WifiIcon size={14} className="shrink-0" />
          </Button>
          <Button className="size-6 p-0" variant="ghost" size="icon">
            <SearchIcon size={14} className="shrink-0" />
          </Button>
          <Button className="size-6 p-0" variant="ghost" size="icon">
            <UserIcon size={14} className="shrink-0" />
          </Button>
          <Button className="size-6 p-0" variant="ghost" size="icon">
            <SettingsIcon size={14} className="shrink-0" />
          </Button>
        </div>
        <div className="px-6 w-full">
          <div className="flex w-full flex-row">
            <LocalData className="w-1/2" lang={lang} />
            <div className="flex w-1/2 flex-col">
              <div className="flex h-9 items-center gap-2">
                <Link
                  href="/journal"
                  className="text-secondary hover:text-foreground text-lg font-medium transition-colors"
                >
                  {t("journal.title")}
                </Link>
              </div>
              <Suspense
                fallback={
                  <ul className="h-fit w-full space-y-3">
                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                  </ul>
                }
              >
                <JournalLastFive lang={lang} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit w-full p-6 md:!min-h-screen md:!w-1/2 lg:!p-12">
        <div className="mx-auto h-fit w-full max-w-lg space-y-6">
        </div>
      </div>
    </div>
  );
};
export default page;
