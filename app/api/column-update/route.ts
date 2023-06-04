import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { columnId, title, boardId, rank } = await req.json()

    const data = await db.column.update({
      where: {
        id: columnId,
      },
      data: {
        title,
        boardId,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Column updated.",
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
