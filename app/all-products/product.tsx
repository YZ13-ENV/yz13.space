import { cn } from "@repo/ui/cn";
import { ProductsSection, Product as ProductType } from "./products/types";
import { getStatus } from "./status";
const Product = ({ section }: { section: ProductsSection }) => {
  return (
    <section className="w-full space-y-3">
      <h2 className="text-base text-secondary">{section.name}</h2>
      <div className="w-full grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 auto-rows-auto gap-4">
        {
          section
            .products
            .map(product => {
              return (
                <ProductCard key={`${section.category}#${product.name}`} product={product} />
              )
            })
        }
      </div>
    </section>
  )
}
const ProductCard = ({ product }: { product: ProductType }) => {
  const status = product.status
  const statusLabel = getStatus(status)
  return (
    <div
      key={`${product.name.toLowerCase()}#${status}`}
      className={cn(
        "relative p-3 cursor-pointer rounded-xl hover:bg-yz-neutral-200",
        "w-full space-y-1.5 h-fit",
        "transition-colors delay-50 duration-500"
      )}
    >
      <div className="flex items-center gap-1.5">
        {product.icon({ size: 16 })}
        <span className={cn(
          "text-sm font-medium text-foreground",
        )}>
          {product.name}
        </span>
        {
          statusLabel &&
          <span className="text-xs rounded-full bg-background px-2 py-0.5 border">{statusLabel.label}</span>
        }
      </div>
      <span className={cn(
        "text-sm text-secondary line-clamp-2",
      )}>
        {product.description}
      </span>
    </div>
  )
}
export { Product };
