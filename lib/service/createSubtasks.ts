import { CustomSubtask } from "@/types"

export async function createSubtasks({ subtasks }: { subtasks: CustomSubtask[] }) {
  try {
    const res = await fetch(`https://${process.env.VERCEL_URL}/api/subtasks-create`, {
      method: "POST",
      body: JSON.stringify({ subtasks }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to create subtasks.")
    }
  } catch (error: any) {
    console.log(error?.message)
    throw error
  }
}
