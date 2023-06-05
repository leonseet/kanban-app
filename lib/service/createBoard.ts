export async function createBoard({
  userId,
  title,
  rank,
}: {
  userId: string
  title: string
  rank: string
}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    const res = await fetch(`${baseUrl}/api/board-create`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        title,
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
      throw new Error("Failed to create board.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
