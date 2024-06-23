const Skeleton = ({ length = 1, prefix = "-" }: { prefix?: string, length?: number }) => {
  const scratch = Array.from({ length: length }).map((_, i) => i)
  return (
    <>
      {
        scratch.map(item =>
          <div
            key={`thread-skeleton${prefix}#${item}`}
            className="w-full aspect-[4/3] bg-yz-neutral-200 animate-pulse border-b" />
        )
      }
    </>
  )
}
export { Skeleton }
