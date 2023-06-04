import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { title, description, status, columnId, taskId, rank } = await req.json()

    const data = await db.task.upsert({
      where: {
        id: taskId,
      },
      create: {
        columnId,
        title,
        status,
        description,
        rank,
      },
      update: {
        columnId,
        title,
        description,
        status,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Task upserted.",
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
