import { ColumnWithTasks } from "@/types"
import { LexoRank } from "lexorank"

interface updateLaneRankProps {
  columns: ColumnWithTasks[]
  activeId: number
  overId: number
}

const updateLaneRank = async ({ columns, activeId, overId }: updateLaneRankProps) => {
  const columnsCopy = JSON.parse(JSON.stringify(columns))

  // Find the lane to move, the target lane, and their indices in the sorted array
  const activeIndex = columnsCopy.findIndex((column: ColumnWithTasks) => column.id === activeId)
  const overIndex = columnsCopy.findIndex((column: ColumnWithTasks) => column.id === overId)
  const activeLane = columnsCopy[activeIndex]
  const overLane = columnsCopy[overIndex]

  // Parse the ranks
  const activeRank = LexoRank.parse(activeLane?.rank)
  const overRank = LexoRank.parse(overLane?.rank)

  let newRank

  // If the current lane is being moved forward (its rank is less than the target rank)
  if (activeIndex < overIndex) {
    // Get the lane after the target lane
    const nextLane = columnsCopy[overIndex + 1]

    // If there's no lane after the target, generate the next rank
    if (!nextLane) {
      newRank = overRank.genNext()
    } else {
      // Otherwise, calculate the rank between the target and the next lane
      const nextRank = LexoRank.parse(nextLane.rank)
      newRank = overRank.between(nextRank)
    }
  } else {
    // If the current lane is being moved backward (its rank is more than the target rank)
    // Get the lane before the target lane
    const prevLane = columnsCopy[overIndex - 1]

    // If there's no lane before the target, generate the previous rank
    if (!prevLane) {
      newRank = overRank.genPrev()
    } else {
      // Otherwise, calculate the rank between the target and the previous lane
      const prevRank = LexoRank.parse(prevLane.rank)
      newRank = overRank.between(prevRank)
    }
  }

  activeLane.rank = newRank.toString()

  // Update the rank of the lane in the database
  // await db.column.update({
  //   where: { id: activeId },
  //   data: { rank: newRank.toString() },
  // })

  console.log(columns)
  console.log(columnsCopy)
  return columnsCopy
}

export default updateLaneRank
