interface findTaskByIdProps {
  id: number
  columns: ColumnWithTasks[]
}

const findTaskById = ({ id, columns }: findTaskByIdProps) => {
  if (columns) {
    const allTasks = columns.flatMap((column) => column.tasks)
    const task = allTasks.find((task) => task.id === id)

    return task
  } else {
    new Error("Columns not found")
  }
}

export default findTaskById
