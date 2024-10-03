"use client"

import { CSSProperties, useEffect, useRef, useState } from "react"

type Coordinate = { x: number, y: number }
type Cursors = CSSProperties["cursor"]

const GRID_SIZE = 100
const RULER_SIZE = 20
const RULER_STEP = GRID_SIZE

const PuzzleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasOffset, setCanvasOffset] = useState<Coordinate>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [canvasSize, setCanvasSize] = useState<Coordinate>({ x: 800, y: 600 })
  const [isMovingCanvas, setIsMovingCanvas] = useState(false)
  const [dragStart, setDragStart] = useState<Coordinate>({ x: 0, y: 0 })
  const [cursorStyle, setCursorStyle] = useState<Cursors>("grab")

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const parent = canvas.parentElement
        if (parent) {
          setCanvasSize({
            x: parent.clientWidth - RULER_SIZE,
            y: parent.clientHeight - RULER_SIZE
          })
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const applyCanvasOffsetAndZoom = (ctx: CanvasRenderingContext2D) => {
          ctx.save()
          ctx.translate(canvasOffset.x, canvasOffset.y)
          ctx.scale(zoom, zoom)
        }
        const drawGrid = (ctx: CanvasRenderingContext2D) => {
          // Draw grid
          ctx.strokeStyle = "#ffffff"
          ctx.lineWidth = 1 / zoom
          const startX = Math.floor((-canvasOffset.x / zoom) / GRID_SIZE) * GRID_SIZE
          const startY = Math.floor((-canvasOffset.y / zoom) / GRID_SIZE) * GRID_SIZE
          const endX = Math.ceil((canvas.width / zoom - canvasOffset.x / zoom) / GRID_SIZE) * GRID_SIZE
          const endY = Math.ceil((canvas.height / zoom - canvasOffset.y / zoom) / GRID_SIZE) * GRID_SIZE

          for (let x = startX; x <= endX; x += GRID_SIZE) {
            ctx.beginPath()
            ctx.moveTo(x, startY)
            ctx.lineTo(x, endY)
            ctx.stroke()
          }
          for (let y = startY; y <= endY; y += GRID_SIZE) {
            ctx.beginPath()
            ctx.moveTo(startX, y)
            ctx.lineTo(endX, y)
            ctx.stroke()
          }
        }

        applyCanvasOffsetAndZoom(ctx)
        drawGrid(ctx)

        ctx.restore()
      }
    }
  }, [canvasRef, canvasSize, canvasOffset, zoom])
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setCursorStyle("move")
    const canvas = canvasRef.current
    if (canvas) {
      setIsMovingCanvas(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      if (isMovingCanvas) {
        const dx = e.clientX - dragStart.x
        const dy = e.clientY - dragStart.y
        setCanvasOffset(prev => ({
          x: prev.x + dx,
          y: prev.y + dy
        }))
        setDragStart({ x: e.clientX, y: e.clientY })
      }
    }
  }
  const handleMouseUp = () => {
    setCursorStyle("grab")
    setIsMovingCanvas(false)
  }
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvasRect = e.currentTarget.getBoundingClientRect()
    const cursorX = e.clientX - canvasRect.left
    const cursorY = e.clientY - canvasRect.top
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const isZoomingIn = delta > 0
    if (isZoomingIn) {
      setZoom(prevZoom => {
        const newZoom = Math.min(Math.max(prevZoom + delta, 0.5), 2)
        setCanvasOffset(prevOffset => ({
          x: prevOffset.x + (cursorX - canvasRect.width / 2) * (1 - newZoom / prevZoom),
          y: prevOffset.y + (cursorY - canvasRect.height / 2) * (1 - newZoom / prevZoom)
        }))
        return newZoom
      })
    } else {
      // need to save position
      setZoom(prevZoom => {
        const newZoom = Math.min(Math.max(prevZoom + delta, 0.5), 2)
        setCanvasOffset(prevOffset => ({
          x: prevOffset.x * prevZoom,
          y: prevOffset.y * prevZoom
        }))
        return newZoom
      })
    }
  }
  return (
    <canvas
      style={{ cursor: cursorStyle }}
      width={canvasSize.x}
      height={canvasSize.y}
      ref={canvasRef}
      className="w-full h-full bg-background"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    />
  )
}

export { PuzzleCanvas }
