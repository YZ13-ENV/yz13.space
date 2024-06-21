import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/packages/ui/src/components/navigation-menu"
import Link from "next/link"
import { Logo } from "../_components/logo"

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent className="flex gap-4 p-4 h-fit">
            <div className="flex items-center justify-center h-56 border rounded-lg w-44">
              <Logo size={48} />
            </div>
            <div className="w-72 shrink-0">
              <div className="flex flex-col w-full p-4 rounded-lg h-fit hover:bg-yz-neutral-100">
                <span className="text-sm font-medium text-foreground">Works</span>
                <span className="text-sm text-secondary">View my works</span>
              </div>
              <div className="flex flex-col w-full p-4 rounded-lg h-fit hover:bg-yz-neutral-100">
                <span className="text-sm font-medium text-foreground">Templates</span>
                <span className="text-sm text-secondary">View my templates</span>
              </div>
              <div className="flex flex-col w-full p-4 rounded-lg h-fit hover:bg-yz-neutral-100">
                <span className="text-sm font-medium text-foreground">Works</span>
                <span className="text-sm text-secondary">View my works</span>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pricing" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export { NavMenu }
