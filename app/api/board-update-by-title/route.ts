import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { oldBoardTitle, newBoardTitle, userId } = await req.json()

    const data = await db.board.update({
      where: {
        uniqueTitlePerUser: {
          title: oldBoardTitle,
          userId: userId,
        },
      },
      data: {
        title: newBoardTitle,
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
