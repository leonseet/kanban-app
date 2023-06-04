import { LexoRank } from "lexorank"
import { updateColumn } from "./service/updateColumn"
import { ColumnWithTasks } from "@/types"

interface moveLaneProps {
  columns: ColumnWithTasks[]
  activeId: number
  overId: number
}
/**
 * Moves a column to a new position in the columns array based on LexoRank.
 *
  
 * @param {Array} columns - An array of columns. Each column is an object with an id, rank, and tasks array. Each task should be an object with an id.
 * @param {number} activeId - The id of the column to be moved.
 * @param {number} overId - The id of the column that the active column is moving over.
 *
 * @returns {Array} - A deep copy of the original columns array, but with the specified column moved to a new position and the rank updated.
 *
 * @throws {Error} - If a column with the provided ID is not found.
 *
 * @description This function uses LexoRank to calculate the new rank for the moved column. If the moved column is going to the end of the list, it generates a next rank from the last column's rank. If the moved column is going in between two columns, it generates a between rank from the surrounding columns' ranks. It then updates the moved column's rank in the database and in the returned copy of the columns array.
 */

const moveLane = ({ columns, activeId, overId }: moveLaneProps) => {
  const columnsCopy = JSON.parse(JSON.stringify(columns))

  const activeIndex = columnsCopy.findIndex((column: ColumnWithTasks) => column.id === activeId)
  const overIndex = columnsCopy.findIndex((column: ColumnWithTasks) => column.id === overId)
  const activeLane = columnsCopy[activeIndex]
  const overLane = columnsCopy[overIndex]

  if (activeIndex === -1 || overIndex === -1) {
    throw new Error("Column not found")
  }

  const activeRank = LexoRank.parse(activeLane?.rank)
  const overRank = LexoRank.parse(overLane?.rank)
  let newRank

  if (activeIndex < overIndex) {
    const nextLane = columnsCopy[overIndex + 1]
    if (!nextLane) {
      newRank = overRank.genNext()
    } else {
      // Otherwise, calculate the rank between the target and the next lane
      const nextRank = LexoRank.parse(nextLane.rank)
      newRank = overRank.between(nextRank)
    }

    // insert before removing
    const removed = columnsCopy[activeIndex]
    columnsCopy.splice(overIndex + 1, 0, removed)
    columnsCopy.splice(activeIndex, 1)
  } else {
    const prevLane = columnsCopy[overIndex - 1]
    if (!prevLane) {
      newRank = overRank.genPrev()
    } else {
      // Otherwise, calculate the rank between the target and the previous lane
      const prevRank = LexoRank.parse(prevLane.rank)
      newRank = overRank.between(prevRank)
    }

    // remove before inserting
    const [removed] = columnsCopy.splice(activeIndex, 1)
    columnsCopy.splice(overIndex, 0, removed)
  }

  updateColumn({ columnId: activeId, rank: newRank.toString() })
  activeLane.rank = newRank.toString()
  return columnsCopy
}

export default moveLane
