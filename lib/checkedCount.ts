import { CustomSubtask } from "@/types"

const checkedCount = ({ subtasks }: { subtasks: CustomSubtask[] | null }) => {
  if (subtasks && subtasks.length === 0) return 0
  if (!subtasks) return 0
  return subtasks.filter((subtask) => subtask.checked).length
}

export default checkedCount
