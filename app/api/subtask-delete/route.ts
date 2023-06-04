import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { subtaskId } = await req.json()

    await db.subtask.delete({
      where: {
        id: subtaskId,
      },
    })

    return NextResponse.json({
      detail: "Subtask deleted.",
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
