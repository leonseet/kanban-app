import { LexoRank } from "lexorank"
import { updateBoard } from "./service/updateBoard"

interface moveBoardProps {
  boards: { rank: string; id: number; title: string; userId: string }[]
  activeTitle: string
  overTitle: string
}

interface boardProps {
  rank: string
  id: number
  title: string
  userId: string
}

/**
 * Moves a board to a new position in the boards array based on LexoRank.
 *
 * @param {Object} params - An object with the following properties:
 *    @property {Array} boards - An array of board objects. Each board is an object with an id, rank, title, and userId.
 *    @property {string} activeTitle - The title of the board to be moved.
 *    @property {string} overTitle - The title of the board that the active board is moving over.
 *
 * @returns {Array} - A deep copy of the original boards array, but with the specified board moved to a new position and the rank updated.
 *
 * @throws {Error} - If a board with the provided title is not found.
 *
 * @description This function uses LexoRank to calculate the new rank for the moved board. If the moved board is going to the end of the list, it generates a next rank from the last board's rank. If the moved board is going in between two boards, it generates a between rank from the surrounding boards' ranks. It then updates the moved board's rank in the database and in the returned copy of the boards array.
 */

const moveBoard = ({ boards, activeTitle, overTitle }: moveBoardProps) => {
  const boardsCopy = JSON.parse(JSON.stringify(boards))

  const activeIndex = boardsCopy.findIndex((board: boardProps) => board.title === activeTitle)
  const overIndex = boardsCopy.findIndex((board: boardProps) => board.title === overTitle)
  const activeBoard = boardsCopy[activeIndex]
  const overBoard = boardsCopy[overIndex]
  const title = activeBoard?.title
  const userId = activeBoard?.userId
  const boardId = activeBoard?.id

  if (activeIndex === -1 || overIndex === -1) {
    throw new Error("Column not found")
  }

  const activeRank = LexoRank.parse(activeBoard?.rank)
  const overRank = LexoRank.parse(overBoard?.rank)
  let newRank

  if (activeIndex < overIndex) {
    const nextBoard = boardsCopy[overIndex + 1]
    if (!nextBoard) {
      newRank = overRank.genNext()
    } else {
      // Otherwise, calculate the rank between the target and the next Board
      const nextRank = LexoRank.parse(nextBoard.rank)
      newRank = overRank.between(nextRank)
    }

    // insert before removing
    const removed = boardsCopy[activeIndex]
    boardsCopy.splice(overIndex + 1, 0, removed)
    boardsCopy.splice(activeIndex, 1)
  } else {
    const prevBoard = boardsCopy[overIndex - 1]
    if (!prevBoard) {
      newRank = overRank.genPrev()
    } else {
      // Otherwise, calculate the rank between the target and the previous Board
      const prevRank = LexoRank.parse(prevBoard.rank)
      newRank = overRank.between(prevRank)
    }

    // remove before inserting
    const [removed] = boardsCopy.splice(activeIndex, 1)
    boardsCopy.splice(overIndex, 0, removed)
  }

  updateBoard({ boardId, title, userId, rank: newRank.toString() })
  activeBoard.rank = newRank.toString()
  return boardsCopy
}

export default moveBoard
