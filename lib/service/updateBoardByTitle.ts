export async function updateBoardByTitle({
  newBoardTitle,
  oldBoardTitle,
  userId,
}: {
  newBoardTitle: string
  oldBoardTitle: string
  userId: string
}) {
  try {
    const res = await fetch("http://localhost:3000/api/board-update-by-title", {
      method: "POST",
      body: JSON.stringify({
        newBoardTitle,
        oldBoardTitle,
        userId,
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
