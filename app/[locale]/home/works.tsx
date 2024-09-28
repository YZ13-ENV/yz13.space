import { getI18n, Locales } from "@/locales/server";
import { cn } from "yz13/cn";
import { GlobeIcon, PackageIcon, PanelTopIcon } from "lucide-react";
import { works } from "@/actions/works";
import { Skeleton } from "@yz13/mono/components/skeleton";

const Works = async ({ lang = "en" }: { lang?: Locales }) => {
  const t = await getI18n()
  const allWorksResponse = await works()
  const allWorks = allWorksResponse ?? []
  const websites = (allWorks ?? []).filter(work => work.type === "website")
  const packages = (allWorks ?? []).filter(work => work.type === "package")
  const services = (allWorks ?? []).filter(work => work.type === "service")
  const websitesCount = websites.length
  const packagesCount = packages.length
  const servicesCount = services.length
  return (
    <div className="w-full grid sm:!grid-cols-3 grid-cols-1 auto-rows-auto gap-3">
      <div
        className={cn(
          "aspect-video relative group w-full h-full flex items-center justify-center rounded-xl border overflow-hidden",
          "hover:border-foreground hover:bg-yz-neutral-100",
          "cursor-pointer transition-colors *:transition-colors"
        )}
      >
        <span className="capitalize text-base text-secondary group-hover:text-foreground absolute top-2.5 left-2.5">{t("works.work.type.website.multiple")}</span>
        <span className="absolute left-2.5 bottom-2.5 text-4xl font-medium text-foreground">{websitesCount}</span>
        <PanelTopIcon
          strokeWidth={0.25}
          fill="hsl(var(--yz13-background)"
          className="text-yz-neutral-200 w-full h-full aspect-square absolute -right-1/3 top-1/4 group-hover:text-foreground"
        />
      </div>
      <div
        className={cn(
          "aspect-video relative group w-full h-full flex items-center justify-center rounded-xl border overflow-hidden",
          "hover:border-foreground hover:bg-yz-neutral-100",
          "cursor-pointer transition-colors *:transition-colors"
        )}
      >
        <span className="capitalize text-base text-secondary group-hover:text-foreground absolute top-2.5 left-2.5">{t("works.work.type.package.multiple")}</span>
        <span className="absolute left-2.5 bottom-2.5 text-4xl font-medium text-foreground">{packagesCount}</span>
        <PackageIcon
          strokeWidth={0.25}
          fill="hsl(var(--yz13-background)"
          className="text-yz-neutral-200 w-full h-full aspect-square absolute -right-1/3 top-1/4 group-hover:text-foreground"
        />
      </div>
      <div
        className={cn(
          "aspect-video relative group w-full h-full flex items-center justify-center rounded-xl border overflow-hidden",
          "hover:border-foreground hover:bg-yz-neutral-100",
          "cursor-pointer transition-colors *:transition-colors"
        )}
      >
        <span className="capitalize text-base text-secondary group-hover:text-foreground absolute top-2.5 left-2.5">{t("works.work.type.service.multiple")}</span>
        <span className="absolute left-2.5 bottom-2.5 text-4xl font-medium text-foreground">{servicesCount}</span>
        <GlobeIcon
          strokeWidth={0.25}
          fill="hsl(var(--yz13-background)"
          className="text-yz-neutral-200 w-full h-full aspect-square absolute -right-1/3 top-1/4 group-hover:text-foreground"
        />
      </div>
    </div>
  )
}

const WorksSkeleton = () => {
  return (
    <div className="w-full grid sm:!grid-cols-3 grid-cols-1 auto-rows-auto gap-3">
      <Skeleton className="rounded-xl w-full h-full aspect-video" />
      <Skeleton className="rounded-xl w-full h-full aspect-video" />
      <Skeleton className="rounded-xl w-full h-full aspect-video" />
    </div>
  )
}
export { Works, WorksSkeleton }
