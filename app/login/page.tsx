import DarkLightToggleSkeleton from "@/components/DarkLightToggleSkeleton"
import LoginForm from "@/components/LoginForm"
import dynamic from "next/dynamic"
const DarkLightToggle = dynamic(() => import("@/components/DarkLightToggle"), {
  ssr: false,
  loading: () => <DarkLightToggleSkeleton className="absolute top-10 md:right-10" />,
})
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Login() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <main className="relative flex min-h-screen flex-col items-center p-24">
      <DarkLightToggle className="absolute top-10" />
      <LoginForm />
    </main>
  )
}
