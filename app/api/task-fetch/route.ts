import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { columnId } = await req.json()

    const data = await db.task.findMany({
      where: {
        columnId,
      },
      orderBy: {
        rank: "asc",
      },
    })

    return NextResponse.json({
      detail: "Task fetched.",
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
