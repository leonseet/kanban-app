import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { title, description, columnId, status, rank } = await req.json()

    const data = await db.task.create({
      data: {
        title,
        description,
        columnId,
        status,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Task created.",
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
