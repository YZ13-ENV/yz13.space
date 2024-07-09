import { Logo } from "@/components/logo"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/packages/ui/src/components/navigation-menu"
import Link from "next/link"

type Props = {
  className?: string
}
const NavMenu = ({ className = "" }: Props) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 h-fit">
            <div className="relative flex w-full gap-4">
              <div className="absolute flex flex-col items-center justify-center h-full border rounded-lg w-44">
                <Logo width={48} height={48} />
                <span className="font-semibold">YZ13</span>
              </div>
              <div className="pl-48 w-fit shrink-0">
                <div className="w-72">
                  <Link href="/works" className="flex flex-col w-full p-4 transition-colors rounded-lg h-fit hover:bg-yz-neutral-100">
                    <span className="text-sm font-medium text-foreground">Works</span>
                    <span className="text-sm text-secondary">View my works</span>
                  </Link>
                  <Link href="/templates" className="flex flex-col w-full p-4 transition-colors rounded-lg h-fit hover:bg-yz-neutral-100">
                    <span className="text-sm font-medium text-foreground">Templates</span>
                    <span className="text-sm text-secondary">View my templates</span>
                  </Link>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent className="h-fit bg-background">
            <div className="w-72">
              <Link href="/library/websites" className="flex flex-col w-full p-4 transition-colors rounded-lg h-fit hover:bg-yz-neutral-100">
                <span className="text-sm font-medium text-foreground">Websites</span>
                <span className="text-sm text-secondary">Can ship websites for you</span>
              </Link>
              <Link href="/library/pages" className="flex flex-col w-full p-4 transition-colors rounded-lg h-fit hover:bg-yz-neutral-100">
                <span className="text-sm font-medium text-foreground">Pages</span>
                <span className="text-sm text-secondary">Can ship pages for you</span>
              </Link>
              <Link href="/library/components" className="flex flex-col w-full p-4 transition-colors rounded-lg h-fit hover:bg-yz-neutral-100">
                <span className="text-sm font-medium text-foreground">Components</span>
                <span className="text-sm text-secondary">Can ship components for you</span>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/pricing" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export { NavMenu }
