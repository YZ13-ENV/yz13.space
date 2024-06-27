import { ReactNode } from "react";
import { IconType } from "react-icons/lib";
import { PiFileDuotone, PiGlobeDuotone, PiPackageDuotone, PiTreeStructureDuotone } from "react-icons/pi";
import { ComponentsList } from "./sections/components";
import { PackagesList } from "./sections/packages";
import { PagesList } from "./sections/pages";
import { WebsitesList } from "./sections/websites";

export type Tab = {
  label: string
  icon: IconType
  value: string
  content: ReactNode
}
export type ServerTab = Omit<Tab, "icon"> & { icon?: JSX.Element | undefined }

export const tabs = [
  {
    label: "Websites",
    icon: PiGlobeDuotone,
    value: "websites",
    content: <WebsitesList />
  },
  {
    label: "Pages",
    icon: PiFileDuotone,
    value: "pages",
    content: <PagesList />
  },
  {
    label: "Components",
    icon: PiTreeStructureDuotone,
    value: "components",
    content: <ComponentsList />
  },
  {
    label: "Packages",
    icon: PiPackageDuotone,
    value: "packages",
    content: <PackagesList />
  },
]