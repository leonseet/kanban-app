import { siteConfig } from "@/config/site"

export async function deleteSubtask({ subtaskId }: { subtaskId: number }) {
  try {
    const res = await fetch(`${siteConfig.links.baseurl}/api/subtask-delete`, {
      method: "POST",
      body: JSON.stringify({
        subtaskId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to delete subtask.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
