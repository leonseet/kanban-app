import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { description, checked, subtaskId, taskId, rank } = await req.json()

    const data = await db.subtask.update({
      where: {
        id: subtaskId,
      },
      data: {
        checked,
        description,
        taskId,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Subtask updated.",
      data,
    })
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    )
  }
}
