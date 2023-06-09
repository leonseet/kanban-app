import { siteConfig } from "@/config/site"

export async function deleteColumn({ columnId }: { columnId: number }) {
  try {
    const res = await fetch(`${siteConfig.links.baseurl}/api/column-delete`, {
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
