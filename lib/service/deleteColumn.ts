export async function deleteColumn({ columnId }: { columnId: number }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    const res = await fetch(`${baseUrl}/api/column-delete`, {
      method: "POST",
      body: JSON.stringify({
        columnId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to delete column.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
