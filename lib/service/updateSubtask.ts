export async function updateSubtask({
  description,
  status,
  subtaskId,
  taskId,
  rank,
  checked,
}: {
  description?: string
  status?: string
  subtaskId: number
  taskId?: number
  rank?: string
  checked?: boolean
}) {
  try {
    const res = await fetch(`${process.env.VERCEL_URL}/api/subtask-update`, {
      method: "POST",
      body: JSON.stringify({
        description,
        status,
        subtaskId,
        taskId,
        rank,
        checked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to update subtask.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
