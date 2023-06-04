import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { boardName, userId } = await req.json()

    await db.board.delete({
      where: {
        uniqueTitlePerUser: {
          title: boardName,
          userId: userId,
        },
      },
    })

    return NextResponse.json({
      detail: "Board deleted.",
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
