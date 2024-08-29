"use client"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@yz13/mono/components/navigation-menu"
import Link from "next/link"
import { cn } from "yz13/cn"


const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "rounded-full")}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem >
          <NavigationMenuTrigger className="rounded-full">Works</NavigationMenuTrigger>
          <NavigationMenuContent className="!rounded-3xl">
            <div className="w-fit p-4 flex flex-row gap-4">
              <div className="flex flex-col gap-6 w-52">
                <span className="text-sm text-secondary">Packages</span>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-52">
                <span className="text-sm text-secondary">Website</span>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-52">
                <span className="text-sm text-secondary">Services</span>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-md border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">Some work</span>
                    <span className="text-xs text-secondary">Description</span>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full">Journal</NavigationMenuTrigger>
          <NavigationMenuContent className="rounded-3xl">
            <div className="w-64 h-fit space-y-6 p-4">
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md border" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">Some work</span>
                  <span className="text-xs text-secondary">Description</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md border" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">Some work</span>
                  <span className="text-xs text-secondary">Description</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md border" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">Some work</span>
                  <span className="text-xs text-secondary">Description</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-md border" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">Some work</span>
                  <span className="text-xs text-secondary">Description</span>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

type ItemProps = {
  label: string
  link: string
  icon: React.ReactNode
  children?: React.ReactNode
}

const Item = ({ }: ItemProps) => {
  return (
    <></>
  )
}

export { Navigation }
