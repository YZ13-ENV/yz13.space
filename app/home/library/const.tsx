import { LuFile, LuGlobe, LuPackage, LuWorkflow } from "react-icons/lu";
import { ComponentsList } from "./sections/components";
import { PackagesList } from "./sections/packages";
import { PagesList } from "./sections/pages";
import { WebsitesList } from "./sections/websites";

export const tabs = [
  {
    label: "Websites",
    icon: LuGlobe,
    value: "websites",
    content: <WebsitesList />
  },
  {
    label: "Pages",
    icon: LuFile,
    value: "pages",
    content: <PagesList />
  },
  {
    label: "Components",
    icon: LuWorkflow,
    value: "components",
    content: <ComponentsList />
  },
  {
    label: "Packages",
    icon: LuPackage,
    value: "packages",
    content: <PackagesList />
  },
]