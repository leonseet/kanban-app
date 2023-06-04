"use client"
import { FC, useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "@/components/ui/popover"
import { deleteTask as deleteTaskService } from "@/lib/service/deleteTask"
import { deleteSubtasks } from "@/lib/service/deleteSubtasks"
import { TaskWithSubtasks } from "@/types"

interface DeleteTaskPopoverProps {
  task: TaskWithSubtasks | null
  deleteTask?: ({ taskId }: { taskId: number }) => Promise<void>
}

const DeleteTaskPopover: FC<DeleteTaskPopoverProps> = ({ task, deleteTask }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onDeleteTask = async () => {
    if (task && deleteTask) {
      await deleteSubtasks({ taskId: task.id })
      await deleteTask({ taskId: task.id })
      await deleteTaskService({ taskId: task.id })
    }
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="cursor-default text-sm px-2 py-1.5 rounded-sm text-red-500 hover:bg-accent text-left w-full">
          Delete Task
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="center"
          sideOffset={10}
          className="dark:bg-black bg-white flex flex-col items-center gap-4 w-fit "
        >
          <div className="flex gap-4">
            <Button onClick={onDeleteTask} variant="destructive" size="sm" className="px-6">
              Confirm
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline" size="sm" className="px-6">
              Cancel
            </Button>
          </div>

          {/* <PopoverArrow className="bg-black" /> */}
        </PopoverContent>
      </Popover>
    </>
  )
}

export default DeleteTaskPopover
