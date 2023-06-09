import { siteConfig } from "@/config/site"

export async function fetchSubtasks({ taskId }: { taskId: number }) {
  try {
    const res = await fetch(`${siteConfig.links.baseurl}/api/subtask-fetch`, {
      method: "POST",
      body: JSON.stringify({
        taskId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to fetch subtasks.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
