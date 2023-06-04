import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId, title, rank } = await req.json()

    const data = await db.board.create({
      data: {
        title,
        userId,
        rank,
      },
    })

    return NextResponse.json({
      detail: "Board created.",
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
