"use client"

import { FC } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import TaskModal from "./TaskModal"
import checkedCount from "@/lib/checkedCount"
import { Subtask, Task } from "@prisma/client"

interface KanbanCardProps {
  task: TaskWithSubtasks
  updateTask?: ({ task }: { task: Task }) => Promise<void>
  addSubtask?: ({ subtask }: { subtask: CustomSubtask }) => Promise<void>
  deleteTask?: ({ taskId }: { taskId: number }) => Promise<void>
}

const KanbanCard: FC<KanbanCardProps> = ({ task, updateTask, addSubtask, deleteTask }) => {
  const { title } = task
  const subtasks = task.subtasks || []
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: { columnId: task.columnId, task },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskModal
        task={task}
        updateTask={updateTask}
        deleteTask={deleteTask}
        addSubtask={addSubtask}
      >
        <button className="text-left w-80 bg-background px-4 py-6 round rounded-md flex flex-col gap-2 shadow-md dark:shadow-gray-900">
          <p>{title}</p>
          <p className="text-xs text-secondary-foreground">
            {checkedCount({ subtasks })} of {subtasks.length} subtasks
          </p>
        </button>
      </TaskModal>
    </div>
  )
}

export default KanbanCard
