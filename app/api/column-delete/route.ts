import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { columnId } = await req.json()

    await db.column.delete({
      where: {
        id: columnId,
      },
    })

    return NextResponse.json({
      detail: "Column deleted.",
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
