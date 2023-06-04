export async function updateColumn({
  columnId,
  title,
  color,
  boardId,
  rank,
}: {
  columnId: number
  title?: string
  color?: string
  boardId?: string
  rank?: string
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/column-update`, {
      method: "POST",
      body: JSON.stringify({
        columnId,
        title,
        color,
        boardId,
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
      throw new Error("Failed to update column.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
