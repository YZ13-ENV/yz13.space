const placeholderCount = Array.from({ length: 6 }).map((_, i) => i)
const PlaceholderSkeleton = () => {
  return (
    <>
      {
        placeholderCount.map(
          item =>
            <div
              key={`item-skeleton#${item}`}
              className="flex items-center aspect-video justify-center bg-yz-neutral-200 rounded-xl border w-full h-full animate-pulse"
            >
            </div>
        )
      }
    </>
  )
}
export { PlaceholderSkeleton, placeholderCount }
