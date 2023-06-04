"use client"
import DynamicTextArea from "./DynamicTextArea"
import { FC } from "react"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import KanbanCard from "./KanbanCard"
import { cn } from "@/lib/utils"
import { CSS } from "@dnd-kit/utilities"
import { Task } from "@prisma/client"
import TaskModal from "./TaskModal"
import DeleteLanePopover from "./DeleteLanePopover"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { ColumnWithTasks, TaskWithSubtasks, CustomSubtask } from "@/types"

export interface KanbanLaneProps {
  column: ColumnWithTasks
  className?: string
  deleteColumn?: ({ columnId }: { columnId: number }) => Promise<void>
  updateTask?: ({ task }: { task: Task }) => Promise<void>
  addTask?: ({ task }: { task: TaskWithSubtasks }) => Promise<void>
  deleteTask?: ({ taskId }: { taskId: number }) => Promise<void>
  addSubtask?: ({ subtask }: { subtask: CustomSubtask }) => Promise<void>
}

const KanbanLane: FC<KanbanLaneProps> = ({
  column,
  className,
  deleteColumn,
  updateTask,
  addTask,
  deleteTask,
  addSubtask,
}) => {
  const { id, title, rank, tasks } = column
  const taskIds = tasks ? tasks.map((task) => task.id) : []
  const isTaskModalOpen = useSelector((state: RootState) => state.taskModal.isTaskModalOpen)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: "sortablelane-" + id,
    data: { columnId: id, column },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className={cn(
        "flex gap-4 flex-col scrollbar-hide mt-[110px] sm:mt-32 bg-secondary rounded-md p-4 h-fit cursor-default",
        className
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className=" flex items-center gap-3 justify-between">
        <DynamicTextArea column={column} />
        {deleteColumn && <DeleteLanePopover columnId={id} deleteColumn={deleteColumn} />}
      </div>
      <SortableContext
        items={taskIds}
        strategy={verticalListSortingStrategy}
        disabled={isTaskModalOpen}
      >
        <div className="flex flex-col gap-4" ref={setNodeRef}>
          {tasks &&
            tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                updateTask={updateTask}
                addSubtask={addSubtask}
                deleteTask={deleteTask}
              />
            ))}
          {tasks.length === 0 && (
            <div className="py-32 opacity-40 text-secondary-foreground border-secondary-foreground rounded-md border-dashed border-2 flex items-center justify-center cursor-default">
              <p>Drop Task Here</p>
            </div>
          )}
        </div>
      </SortableContext>

      <TaskModal task={null} column={column} addTask={addTask} addSubtask={addSubtask}>
        <button className="px-10 py-7 w-80 bg-background flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer text-[#828FA3] rounded-md">
          +
        </button>
      </TaskModal>
    </div>
  )
}

export default KanbanLane
