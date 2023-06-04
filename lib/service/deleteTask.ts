export async function deleteTask({ taskId }: { taskId: number }) {
  try {
    const res = await fetch("http://localhost:3000/api/task-delete", {
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
      throw new Error("Failed to delete task.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
