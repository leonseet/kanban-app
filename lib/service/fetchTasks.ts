import { siteConfig } from "@/config/site"

export async function fetchTasks({ columnId }: { columnId: number }) {
  try {
    const res = await fetch(`${siteConfig.links.baseurl}/api/task-fetch`, {
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
      throw new Error("Failed to fetch tasks.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
