import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { subtasks } = await req.json()
    const data = await db.subtask.createMany({
      data: subtasks,
    })

    return NextResponse.json({
      detail: "Subtasks created.",
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
