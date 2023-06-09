import { siteConfig } from "@/config/site"

export async function upsertTask({
  title,
  description,
  status,
  columnId,
  taskId,
  rank,
}: {
  title?: string
  description?: string
  status?: string
  columnId?: number
  taskId: number
  rank?: string
}) {
  try {
    const res = await fetch(`${siteConfig.links.baseurl}/api/task-upsert`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        status,
        columnId,
        taskId,
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
      throw new Error("Failed to upsert task.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
