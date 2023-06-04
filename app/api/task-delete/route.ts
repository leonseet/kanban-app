import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { taskId } = await req.json()

    await db.task.delete({
      where: {
        id: taskId,
      },
    })

    return NextResponse.json({
      detail: "Task deleted.",
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
