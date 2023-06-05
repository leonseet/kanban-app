export async function deleteBoard({ boardName, userId }: { boardName: string; userId: string }) {
  try {
    const res = await fetch(`${window.location.origin}/api/board-delete`, {
      method: "POST",
      body: JSON.stringify({
        boardName,
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
      throw new Error("Failed to delete board.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
