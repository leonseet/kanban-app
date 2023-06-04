"use client"

import { FC, useRef, useState, RefObject } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BiDotsVerticalRounded } from "react-icons/bi"
import CheckBoxItem from "./CheckBoxItem"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "./ui/button"
import checkedCount from "@/lib/checkedCount"
import DeleteTaskPopover from "./DeleteTaskPopover"
import { useForm } from "react-hook-form"
import { updateSubtask } from "@/lib/service/updateSubtask"
import { Task } from "@prisma/client"
import { updateTask as updateTaskService } from "@/lib/service/updateTask"
import { createTask } from "@/lib/service/createTask"
import { LexoRank } from "lexorank"
import { createSubtasks } from "@/lib/service/createSubtasks"
import { deleteSubtask } from "@/lib/service/deleteSubtask"
import { useDispatch, useSelector } from "react-redux"
import { setTaskModal } from "@/app/redux/features/taskModalSlice"
import { RootState } from "@/app/redux/store"

interface TaskModalProps {
  task: TaskWithSubtasks | null
  column?: ColumnWithTasks | null
  children?: React.ReactNode
  updateTask?: ({ task }: { task: Task }) => Promise<void>
  addTask?: ({ task }: { task: TaskWithSubtasks }) => Promise<void>
  deleteTask?: ({ taskId }: { taskId: number }) => Promise<void>
  addSubtask?: ({ subtask }: { subtask: CustomSubtask }) => Promise<void>
}

interface FormType {
  taskTitle: string
  taskDescription: string
  taskStatus: string
  subtasks: CustomSubtask[]
}

const TaskModal: FC<TaskModalProps> = ({
  task,
  column,
  children,
  updateTask,
  addTask,
  deleteTask,
  addSubtask,
}) => {
  const [subtasks, setSubtasks] = useState<CustomSubtask[]>(task?.subtasks || [])
  const [deletedSubtasks, setDeletedSubtasks] = useState<CustomSubtask[]>([])
  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const isTaskModalOpen = useSelector((state: RootState) => state.taskModal.isTaskModalOpen)
  const dispatch = useDispatch()

  const messagesEndRef: RefObject<HTMLDivElement> = useRef(null)
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<FormType>()

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const onAddSubtask = async () => {
    console.log("task", task)
    if (!task) {
      const newRank =
        subtasks.length === 0
          ? LexoRank.middle().toString()
          : LexoRank.parse(subtasks[subtasks.length - 1].rank)
              .genNext()
              .toString()
      const newSubtask = {
        description: "",
        checked: false,
        rank: newRank,
        taskId: null,
      }
      if (addSubtask) {
        setSubtasks([...subtasks, newSubtask])
        addSubtask({ subtask: newSubtask })
      }
    } else {
      const newRank =
        task?.subtasks.length === 0
          ? LexoRank.middle().toString()
          : LexoRank.parse(task?.subtasks[task?.subtasks.length - 1].rank)
              .genNext()
              .toString()
      const newSubtask = {
        description: "",
        checked: false,
        taskId: task.id,
        rank: newRank,
      }
      if (addSubtask) {
        setSubtasks([...subtasks, newSubtask])
        addSubtask({ subtask: newSubtask })
      }
    }
    setTimeout(scrollToBottom, 0)
  }

  const onDeleteSubtask = (index: number) => {
    const currentSubtasks = [...subtasks]
    currentSubtasks.splice(index, 1)
    setSubtasks(currentSubtasks)
    setDeletedSubtasks([...deletedSubtasks, subtasks[index]])
  }

  const handleSubmitForm = async (data: FormType) => {
    setLoading(true)
    if (task) {
      const newSubtasks = subtasks.filter((subtask) => !subtask.id)
      const existingSubtasks = subtasks.filter((subtask) => subtask.id)

      for (const subtask of existingSubtasks) {
        await updateSubtask({
          subtaskId: subtask.id as number,
          description: subtask.description ?? "",
          checked: subtask.checked,
          taskId: subtask.taskId as number,
        })
      }
      await createSubtasks({ subtasks: newSubtasks })

      const updatedTask = await updateTaskService({
        taskId: task.id,
        title: data.taskTitle,
        description: data.taskDescription,
        status: data.taskStatus,
      })

      if (updateTask) {
        await updateTask({ task: updatedTask.data })
      }
    } else if (column) {
      const lastRank = column.tasks.length > 0 ? column.tasks[column.tasks.length - 1].rank : null
      const newRank = lastRank
        ? LexoRank.parse(lastRank).genNext().toString()
        : LexoRank.middle().toString()

      const createdTask = await createTask({
        title: data.taskTitle,
        description: data.taskDescription,
        status: data.taskStatus,
        columnId: column.id,
        rank: newRank,
      })

      subtasks.forEach((subtask) => {
        subtask.taskId = createdTask.data.id
      })

      if (addTask) {
        await createSubtasks({ subtasks })
        await addTask({ task: { ...createdTask.data, subtasks: subtasks } })
      }
    }

    for (const subtask of deletedSubtasks) {
      subtask.id && (await deleteSubtask({ subtaskId: subtask.id }))
    }
    setOpenTaskModal(false)
    setLoading(false)
  }

  const onOpenChange = () => {
    setOpenTaskModal(!openTaskModal)
    dispatch(setTaskModal(!isTaskModalOpen))
  }

  return (
    <>
      <Dialog open={openTaskModal} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-secondary sm:max-w-4xl">
          <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <TextareaAutosize
                {...register("taskTitle")}
                placeholder="Title"
                className="font-bold bg-transparent w-9/12 focus:outline-none resize-none placeholder:font-bold"
                maxLength={111}
                defaultValue={task && task.title ? task.title : ""}
              />
              {deleteTask && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <BiDotsVerticalRounded className="w-6 h-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background">
                    <DeleteTaskPopover task={task} deleteTask={deleteTask} />
                    {/* <DropdownMenuItem>Flag</DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <TextareaAutosize
              {...register("taskDescription")}
              placeholder="Description"
              className="text-secondary-foreground mb-4 bg-transparent focus:outline-none resize-none placeholder:text-secondary-foreground"
              maxLength={111}
              defaultValue={task?.description ? task.description : ""}
            />
            <p className="text-sm">
              Subtasks ({checkedCount({ subtasks })} of {subtasks.length})
            </p>
            <div className="flex flex-col gap-2 overflow-y-scroll max-h-[14.5rem] scrollbar-hide">
              {subtasks.map(({ description, checked }, index) => (
                <CheckBoxItem
                  key={index}
                  index={index}
                  description={description ?? ""}
                  isChecked={checked}
                  onDeleteSubtask={onDeleteSubtask}
                  subtasks={subtasks}
                  setSubtasks={setSubtasks}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <Button
              variant="outline"
              edge="square"
              size="lg"
              className="-mt-2 mb-4 rounded-md py-4 text-sm"
              onClick={onAddSubtask}
              type="button"
            >
              + Add New Subtask
            </Button>
            {loading ? (
              <>
                <Button
                  variant="default"
                  edge="square"
                  size="lg"
                  loading="yes"
                  className="rounded-md"
                  type="submit"
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                edge="square"
                size="lg"
                className="rounded-md"
                type="submit"
              >
                Save
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TaskModal
