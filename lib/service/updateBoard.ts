export async function updateBoard({
  boardId,
  title,
  userId,
  rank,
}: {
  boardId: number
  title: string
  userId: string
  rank: string
}) {
  try {
    const res = await fetch(`https://${process.env.VERCEL_URL}/api/board-update`, {
      method: "POST",
      body: JSON.stringify({
        boardId,
        title,
        userId,
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
      throw new Error("Failed to update board.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
