export async function updateUser({
  userId,
  name,
  email,
  newUser,
}: {
  userId?: string
  name?: string
  email?: string
  newUser?: boolean
}) {
  try {
    const res = await fetch("http://localhost:3000/api/user-update", {
      method: "POST",
      body: JSON.stringify({
        userId,
        name,
        email,
        newUser,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      return res.json()
    } else {
      console.log(await res.json())
      throw new Error("Failed to update user.")
    }
  } catch (error: any) {
    console.log(error?.message)
  }
}
