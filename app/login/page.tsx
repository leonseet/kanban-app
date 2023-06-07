import DarkLightToggleSkeleton from "@/components/DarkLightToggleSkeleton"
import LoginForm from "@/components/LoginForm"
import dynamic from "next/dynamic"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
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
      <div className="absolute top-[13%] sm:top-[16%] flex flex-col items-center gap-6">
        <Alert className="bg-accent w-fit shadow-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sign up or use the following demo account</AlertTitle>
          <AlertDescription className="mt-2">
            <p>Email: demo@gmail.com</p>
            <p>Password: password</p>
          </AlertDescription>
        </Alert>
        <LoginForm />
      </div>
    </main>
  )
}
