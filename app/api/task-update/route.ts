import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { title, description, status, columnId, taskId, rank } = await req.json()

    const data = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        columnId,
        title,
        description,
        status,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Task updated.",
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
