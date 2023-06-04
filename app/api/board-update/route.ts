import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { boardId, title, userId, rank } = await req.json()

    const data = await db.board.update({
      where: {
        id: boardId,
      },
      data: {
        title,
        rank,
        userId,
      },
    })

    return NextResponse.json({
      detail: "Board updated.",
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
