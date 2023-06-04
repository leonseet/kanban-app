import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { description, checked, subtaskId, taskId, rank, task } = await req.json()

    const data = await db.subtask.upsert({
      create: {
        taskId,
        checked,
        description,
        rank,
        task,
      },
      where: {
        id: subtaskId,
      },
      update: {
        checked,
        description,
      },
    })

    return NextResponse.json({
      detail: "Subtask upserted.",
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
