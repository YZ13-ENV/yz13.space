import { PiFileDuotone, PiGlobeDuotone, PiPackageDuotone, PiTreeStructureDuotone } from "react-icons/pi";
import { ComponentsList } from "./sections/components";
import { PackagesList } from "./sections/packages";
import { PagesList } from "./sections/pages";
import { WebsitesList } from "./sections/websites";

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