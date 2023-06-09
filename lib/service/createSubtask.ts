import { siteConfig } from "@/config/site"

export async function createSubtask({
  description,
  checked = false,
  taskId,
  rank,
}: {
  description?: string
  checked: boolean
  taskId: number
  rank: string
}) {
  try {
    const res = await fetch(`${siteConfig.links.baseurl}/api/subtask-create`, {
      method: "POST",
      body: JSON.stringify({
        description,
        checked,
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
      throw new Error("Failed to create subtask.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
