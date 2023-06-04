export async function createTask({
  title,
  description,
  columnId,
  status,
  rank,
}: {
  title?: string
  description?: string
  columnId: number
  status: string | null
  rank?: string
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task-create`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        columnId,
        status,
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
      throw new Error("Failed to create task.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
