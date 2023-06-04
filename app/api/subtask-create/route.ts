import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { description, checked, taskId, rank } = await req.json()

    const data = await db.subtask.create({
      data: {
        description,
        checked,
        taskId,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Subtask created.",
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
