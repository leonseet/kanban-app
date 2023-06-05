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
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    const res = await fetch(`${baseUrl}/api/board-update`, {
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
