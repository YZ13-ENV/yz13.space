const GradientLabel = ({ text }: { text?: string }) => {
  return (
    <div className="p-[2px] relative flex items-center justify-center rounded-full mx-auto w-fit h-fit overflow-hidden">
      <div className="w-full absolute aspect-square bg-gradient-to-br grayscale from-warning to-accents-3 animate-long-spin" />
      <span className="px-2 py-1 text-xs bg-background rounded-full z-[1]">{text}</span>
    </div>
  )
}
export { GradientLabel }
