export async function deleteSubtasks({ taskId }: { taskId: number }) {
  try {
    const res = await fetch(`${process.env.VERCEL_URL}/api/subtasks-delete`, {
      method: "POST",
      body: JSON.stringify({
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
      throw new Error("Failed to delete subtasks.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
