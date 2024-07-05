"use client"
import { cn } from "@repo/ui/cn";
import { Textarea, TextareaProps } from "@repo/ui/textarea";
import { ElementRef, useEffect, useRef } from "react";

const MIN_TEXTAREA_HEIGHT = 60;

interface AutoResizeTextAreaProps extends TextareaProps {
  text?: string
  onText?: (text: string) => void
}
const AutoResizeTextArea = ({ className, placeholder, text, onText, ...props }: AutoResizeTextAreaProps) => {
  const ref = useRef<ElementRef<"textarea">>(null)
  useEffect(() => {
    const textarea = ref.current
    if (textarea) {
      textarea.style.height = "inherit";
      textarea.style.height = `${Math.max(
        textarea.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [ref, text, onText])
  return (
    <Textarea
      ref={ref}
      disabled={!onText}
      value={text}
      onChange={e => onText && onText(e.target.value)}
      className={cn(
        "w-full shadow-none rounded-none resize-none !border-0 p-0 text-lg !outline-none !ring-0",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  )
}
export { AutoResizeTextArea };

