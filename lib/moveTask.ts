import { Task } from "@prisma/client"
import { updateTask } from "@/lib/service/updateTask"
import { LexoRank } from "lexorank"
import { arrayMove } from "@dnd-kit/sortable"

interface moveTaskProps {
  columns: ColumnWithTasks[]
  activeId: number
  activeColumnId: number
  overId: number | string
  overColumnId: number
}
/**
 * Moves a task from one position to another within or between columns.
 *
 * @param {Array} props.columns - An array of column objects. Each column object should contain an id and a tasks array.
 * @param {Number} props.activeId - The id of the task to be moved.
 * @param {Number} props.activeColumnId - The id of the column containing the task to be moved.
 * @param {Number|String} props.overId - The id of the task or placeholder before which the active task will be moved. If the task is moved to the end of a column, overId should be the id of the placeholder at the end of the column.
 * @param {Number} props.overColumnId - The id of the column where the active task will be moved to.
 *
 * @returns {Array} - A deep copy of the original columns array, but with the specified task moved to the new position. The task's rank and columnId properties are also updated.
 *
 * @throws {Error} - If a column or task with the provided ID is not found, or if a new rank cannot be generated for the moved task.
 */

const moveTask = ({ columns, activeId, activeColumnId, overId, overColumnId }: moveTaskProps) => {
  const columnsCopy = JSON.parse(JSON.stringify(columns))
  // console.log("columnsCopy", columnsCopy)

  const { column: activeColumn, taskIndex: activeIndex } = findColumnAndTaskIndex(
    columnsCopy,
    activeColumnId,
    activeId
  )

  let { column: overColumn, taskIndex: overIndex } = findColumnAndTaskIndex(
    columnsCopy,
    overColumnId,
    overId
  )
  // console.log("overColumn", overColumn)
  // console.log("overIndex", overIndex)

  const taskToMove = activeColumn.tasks[activeIndex]

  let newRank: LexoRank

  if (overId.toString().startsWith("sortablelane")) {
    activeColumn.tasks.splice(activeIndex, 1)
    overColumn.tasks.push(taskToMove)
    newRank = LexoRank.middle()
  } else {
    // console.log("overColumn", overColumn.tasks)
    const prevTask = overColumn.tasks[overIndex - 1]
    const curTask = overColumn.tasks[overIndex]
    const nextTask = overColumn.tasks[overIndex + 1]

    newRank = generateNewRank(
      prevTask,
      curTask,
      nextTask,
      activeIndex,
      overIndex,
      activeColumnId,
      overColumnId
    )

    if (!nextTask) {
      activeColumn.tasks.splice(activeIndex, 1)
      overColumn.tasks.push(taskToMove)
    } else if (activeColumnId == overColumnId) {
      overColumn.tasks = arrayMove(overColumn.tasks, activeIndex, overIndex)
    } else {
      activeColumn.tasks.splice(activeIndex, 1)
      overColumn.tasks.splice(overIndex, 0, taskToMove)
    }
  }

  updateTask({
    taskId: activeId,
    rank: newRank.toString(),
    columnId: overColumnId,
    status: overColumn.title ?? "",
  })

  // activeColumn.tasks.splice(activeIndex, 1)
  taskToMove.rank = newRank.toString()
  taskToMove.columnId = overColumnId
  taskToMove.status = overColumn.title ?? ""
  return columnsCopy
}

const findColumnAndTaskIndex = (
  columns: ColumnWithTasks[],
  columnId: number,
  taskId: number | string
) => {
  const column = columns.find((column: ColumnWithTasks) => column.id === columnId)
  if (!column) {
    throw new Error("Column not found")
  }

  const taskIndex = column.tasks.findIndex((task: Task) => task.id === taskId)
  if (taskId.toString().startsWith("sortablelane")) {
    return { column, taskIndex: -1 }
  }

  if (taskIndex === -1) {
    throw new Error("Task not found")
  }

  return { column, taskIndex }
}

const generateNewRank = (
  prevTask: Task | undefined,
  curTask: Task | undefined,
  nextTask: Task | undefined,
  activeIndex: number,
  overIndex: number,
  activeColumnId: number,
  overColumnId: number
) => {
  let newRank
  // console.log("prevTask", prevTask)
  // console.log("curTask", curTask)
  // console.log("nextTask", nextTask)
  if (curTask && !nextTask) {
    // The moved task will be the last task in the column
    // console.log("move to last task")
    const curTaskRank = LexoRank.parse(curTask.rank)
    newRank = curTaskRank.genNext()
  } else if (curTask && !prevTask) {
    // The moved task will be the first task in the column
    // console.log("move to first task")
    const curTaskRank = LexoRank.parse(curTask.rank)
    newRank = curTaskRank.genPrev()
  } else if (activeColumnId === overColumnId) {
    if (nextTask && curTask && activeIndex < overIndex) {
      // The moved task will be placed between current and next task
      // console.log("move between current and next task")
      const nextTaskRank = LexoRank.parse(nextTask.rank)
      const curTaskRank = LexoRank.parse(curTask.rank)
      newRank = nextTaskRank.between(curTaskRank)
    } else if (prevTask && curTask && activeIndex > overIndex) {
      // The moved task will be placed between current and previous task
      // console.log("move between current and previous task")
      const prevTaskRank = LexoRank.parse(prevTask.rank)
      const curTaskRank = LexoRank.parse(curTask.rank)
      newRank = prevTaskRank.between(curTaskRank)
    }
  } else {
    // The moved task will be placed between current and previous task
    if (prevTask && curTask) {
      const prevTaskRank = LexoRank.parse(prevTask.rank)
      const curTaskRank = LexoRank.parse(curTask.rank)
      newRank = prevTaskRank.between(curTaskRank)
    }
  }

  if (!newRank) {
    throw new Error("Failed to generate new rank")
  }

  return newRank
}

export default moveTask
