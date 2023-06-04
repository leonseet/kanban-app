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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/board-create`, {
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
