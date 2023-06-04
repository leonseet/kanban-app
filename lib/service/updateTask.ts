export async function updateTask({
  title,
  description,
  status,
  columnId,
  taskId,
  rank,
}: {
  title?: string
  description?: string
  status?: string
  columnId?: number
  taskId: number
  rank?: string
}) {
  try {
    const res = await fetch("http://localhost:3000/api/task-update", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        status,
        columnId,
        taskId,
        rank,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to update task.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
