export async function updateSubtask({
  description,
  checked,
  subtaskId,
  taskId,
}: {
  checked?: boolean
  description?: string
  subtaskId?: number
  taskId: number
}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    const res = await fetch(`${baseUrl}/api/subtask-upsert`, {
      method: "POST",
      body: JSON.stringify({
        description,
        checked,
        subtaskId,
        taskId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to upsert subtask.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
