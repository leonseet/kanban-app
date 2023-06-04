import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { title, color, boardId, rank } = await req.json()

    const data = await db.column.create({
      data: {
        title,
        color,
        boardId,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Column created.",
      data: {
        id: data.id,
        title: data.title,
        color: data.color,
        boardId: data.boardId,
        rank: data.rank,
      },
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
