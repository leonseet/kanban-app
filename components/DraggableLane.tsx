"use client"
import { FC } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

interface DraggableLaneProps {
  columnId: number
  children: React.ReactNode
}

const DraggableLane: FC<DraggableLaneProps> = ({ columnId, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggablelane-" + columnId,
    data: { columnId },
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  )
}

export default DraggableLane
