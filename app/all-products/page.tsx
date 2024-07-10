import { Logo } from "@/components/logo"
import { cn } from "@repo/ui/cn"
import Link from "next/link"
import { platform } from "./products"



const page = () => {
  return (
    <>
      <Link href="/home">
        <Logo
          width={36} height={36}
          className="lg:absolute shrink-0 relative top-0 mt-6 ml-6 left-0"
        />
      </Link>
      <div className="max-w-3xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold">Explore YZ13 products</h1>
      </div>
      <div className="max-w-3xl w-full mx-auto p-6 h-fit">
        <section className="w-full space-y-3">
          <h2 className="text-base text-secondary">{platform.name}</h2>
          <div className="w-full grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 auto-rows-auto gap-4">
            {
              platform
                .products
                .map(product => {
                  return (
                    <div
                      key={`${platform.category}#${product.name}`}
                      className="relative p-3 w-full space-y-1.5 h-fit cursor-pointer rounded-xl hover:bg-yz-neutral-200"
                    >
                      <div className="flex items-center gap-1.5">
                        {product.icon({ size: 16 })}
                        <span className={cn(
                          "text-sm font-medium text-foreground",
                        )}>
                          {product.name}
                        </span>
                      </div>
                      <span className={cn(
                        "text-sm text-secondary line-clamp-2",
                      )}>
                        {product.description}
                      </span>
                    </div>
                  )
                })
            }
          </div>
        </section>
      </div>
    </>
  )
}
export default page