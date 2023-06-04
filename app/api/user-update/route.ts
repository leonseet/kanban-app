import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId, name, email, newUser } = await req.json()

    const updateUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        newUser,
      },
    })

    return NextResponse.json({
      detail: "User updated.",
      updateUser,
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
