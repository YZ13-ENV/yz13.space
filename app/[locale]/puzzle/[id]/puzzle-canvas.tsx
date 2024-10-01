"use client"

import { useEffect, useRef } from "react"

const PuzzleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const bg = getComputedStyle(canvas).getPropertyValue("--yz13-background")
    console.log(bg)
    // draw dotted background
  }, [canvasRef])
  return (
    <canvas ref={canvasRef} className=" w-full h-full bg-background" />
  )
}

export { PuzzleCanvas }
