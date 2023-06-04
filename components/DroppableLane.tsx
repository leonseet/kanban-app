"use client"
import { FC } from "react"
import { useDroppable } from "@dnd-kit/core"

interface DroppableLaneProps {
  columnId: number
  children: React.ReactNode
}

const DroppableLane: FC<DroppableLaneProps> = ({ columnId, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppablelane-" + columnId,
    data: { columnId },
  })

  return <div ref={setNodeRef}>{children}</div>
}

export default DroppableLane
