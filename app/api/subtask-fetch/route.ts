import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { taskId } = await req.json()

    const data = await db.subtask.findMany({
      where: {
        taskId,
      },
    })

    return NextResponse.json({
      detail: "subtask fetched.",
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
