const placeholderCount = Array.from({ length: 6 }).map((_, i) => i)
const PlaceholderSkeleton = () => {
  return (
    <>
      {
        placeholderCount.map(
          item =>
            <div
              key={`item-skeleton#${item}`}
              className="aspect-[4/2.5] bg-yz-neutral-200 rounded-xl border w-full h-full animate-pulse"
            />
        )
      }
    </>
  )
}
export { PlaceholderSkeleton, placeholderCount }
