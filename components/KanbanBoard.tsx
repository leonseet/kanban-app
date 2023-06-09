"use client"

import { FC, useEffect, useState } from "react"
import { Board, Column, Subtask, Task } from "@prisma/client"
import EmptyBoard from "./EmptyBoard"
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import { LexoRank } from "lexorank"
import KanbanLane from "./KanbanLane"
import moveTask from "@/lib/moveTask"
import TaskModal from "./TaskModal"
import moveLane from "@/lib/moveLane"
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { createColumn } from "@/lib/service/createColumn"
import checkedCount from "@/lib/checkedCount"
import { deleteColumn as deleteColumnService } from "@/lib/service/deleteColumn"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { ColumnWithTasks, TaskWithSubtasks, CustomSubtask } from "@/types"
import { setTaskModal } from "@/app/redux/features/taskModalSlice"

interface KanbanBoardProps {
  board:
    | (Board & {
        columns: (Column & {
          tasks: (Task & {
            subtasks: Subtask[]
          })[]
        })[]
      })
    | null
}

const KanbanBoard: FC<KanbanBoardProps> = ({ board }) => {
  const searchInput = useSelector((state: RootState) => state.taskFilter.searchInput)
  const [columns, setColumns] = useState<ColumnWithTasks[] | undefined>(board?.columns)
  const [activeId, setActiveId] = useState<number | string | null>(null)
  const [dragOverlayTask, setDragOverlayTask] = useState<TaskWithSubtasks | null>(null)
  const [dragOverlayColumn, setDragOverlayColumn] = useState<ColumnWithTasks | null>(null)
  const isTaskModalOpen = useSelector((state: RootState) => state.taskModal.isTaskModalOpen)
  const isSidebarOpen = useSelector((state: RootState) => state.toggleSidebar.isSidebarOpen)

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const filteredColumns = board?.columns?.map((column) => {
      return {
        ...column,
        tasks: column.tasks.filter((task) => {
          return task.title?.toLowerCase().includes(searchInput.toLowerCase())
        }),
      }
    })
    setColumns(filteredColumns)
  }, [searchInput, board])

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const sensors = useSensors(pointerSensor)

  const handleDragStart = async (e: DragStartEvent) => {
    const { active } = e
    const id = active.id
    setActiveId(id)
    if (id.toString().startsWith("sortablelane")) {
      setDragOverlayColumn(e.active.data.current?.column)
    } else {
      setDragOverlayTask(e.active.data.current?.task)
    }
    // console.log("handleDragStart", e)
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    // console.log("handleDragEnd", e)
    const { active, over } = e
    const activeId = active.id
    const overId = over?.id
    const activeColumnId = active.data.current?.columnId
    const overColumnId = over?.data.current?.columnId

    if (columns && overId && typeof activeId === "number") {
      const columnCopy = moveTask({
        columns,
        activeId,
        activeColumnId,
        overId,
        overColumnId,
      })
      setColumns(columnCopy)
    } else if (
      columns &&
      activeId.toString().startsWith("sortablelane") &&
      overId?.toString().startsWith("sortablelane")
    ) {
      const columnCopy = moveLane({
        columns,
        activeId: activeColumnId,
        overId: overColumnId,
      })
      setColumns(columnCopy)
    }
    setDragOverlayTask(null)
    setDragOverlayColumn(null)
    router.refresh()
  }

  const addColumn = async () => {
    const lastRank = columns?.[columns.length - 1]?.rank
    const newRank = lastRank
      ? LexoRank.parse(lastRank).genNext().toString()
      : LexoRank.min().toString()
    if (board && newRank) {
      const newColumn = await createColumn({ boardId: board?.id, rank: newRank, title: "" })
      const newColumnWithTasks = { ...newColumn.data, tasks: [] }
      setColumns([...(columns || []), newColumnWithTasks])
    }
    router.refresh()
  }

  const deleteColumn = async ({ columnId }: { columnId: number }) => {
    const updatedColumns = columns?.filter((column) => column.id !== columnId)
    await deleteColumnService({ columnId })
    setColumns(updatedColumns)
    router.refresh()
  }

  const addTask = async ({ task }: { task: TaskWithSubtasks }) => {
    const { columnId } = task
    const updatedColumns = columns?.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        }
      }
      return column
    })
    setColumns(updatedColumns)
    router.refresh()
  }

  const updateTask = async ({ task }: { task: Task }) => {
    const { id: taskId, columnId } = task
    const updatedColumns = columns?.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.map((oldTask) =>
            oldTask.id === taskId ? { ...oldTask, ...task } : oldTask
          ),
        }
      }
      return column
    })
    setColumns(updatedColumns)
    router.refresh()
  }

  const deleteTask = async ({ taskId }: { taskId: number }) => {
    const updatedColumns = columns?.map((column) => {
      return {
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }
    })
    setColumns(updatedColumns)
    dispatch(setTaskModal(!isTaskModalOpen))
    router.refresh()
  }

  const addSubtask = async ({ subtask }: { subtask: CustomSubtask }) => {
    // console.log("subtask", subtask)
    const { taskId } = subtask
    const updatedColumns = columns?.map((column) => {
      return {
        ...column,
        tasks: column.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              subtasks: [...task.subtasks, subtask],
            }
          }
          return task
        }),
      }
    })
    setColumns(updatedColumns as ColumnWithTasks[])
    router.refresh()
  }

  // console.log("columns", columns)

  return (
    <div className={isSidebarOpen ? "sm:ml-72" : ""}>
      {columns && columns.length > 0 && (
        <div className="flex">
          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex gap-6">
              <SortableContext
                items={columns?.map((column) => {
                  return { id: "sortablelane-" + column.id }
                })}
                strategy={horizontalListSortingStrategy}
                disabled={isTaskModalOpen}
              >
                {columns?.map((column) => (
                  <KanbanLane
                    key={"droppablelane-" + column.id}
                    column={column}
                    deleteColumn={deleteColumn}
                    updateTask={updateTask}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    addSubtask={addSubtask}
                  />
                ))}
              </SortableContext>
            </div>

            <DragOverlay>
              {typeof activeId === "number" && (
                <TaskModal task={dragOverlayTask}>
                  <button className="text-left w-80 bg-background px-4 py-6 round rounded-md flex flex-col gap-2 shadow-md dark:shadow-gray-900">
                    <p>{dragOverlayTask?.title}</p>
                    <p className="text-xs text-secondary-foreground">
                      {checkedCount({ subtasks: dragOverlayTask?.subtasks ?? null })} of{" "}
                      {dragOverlayTask?.subtasks.length} subtasks
                    </p>
                  </button>
                </TaskModal>
              )}

              {dragOverlayColumn && activeId && activeId.toString().startsWith("sortablelane") && (
                <KanbanLane column={dragOverlayColumn} className="sm:m-0 m-0 opacity-70" />
              )}
            </DragOverlay>
          </DndContext>

          <button
            onClick={addColumn}
            className="ml-6 h-[60px] min-w-[60px] dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] text-[#828FA3] mt-[111px] sm:mt-[128px] rounded-lg "
          >
            +
          </button>
        </div>
      )}

      {columns?.length === 0 && <EmptyBoard addColumn={addColumn} />}
      <div className="py-4 bg-background" />
    </div>
  )
}

export default KanbanBoard
