export async function createColumn({
  title,
  color,
  boardId,
  rank,
}: {
  title?: string
  color?: string
  boardId: number
  rank: string
}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    const res = await fetch(`${baseUrl}/api/column-create`, {
      method: "POST",
      body: JSON.stringify({
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
      throw new Error("Failed to create column.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
