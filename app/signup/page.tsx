import DarkLightToggleSkeleton from "@/components/DarkLightToggleSkeleton"
import SignUpForm from "@/components/SignUpForm"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
const DarkLightToggle = dynamic(() => import("@/components/DarkLightToggle"), {
  ssr: false,
  loading: () => <DarkLightToggleSkeleton className="absolute top-10 md:right-10" />,
})
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { signIn } from "next-auth/react"

export default function Signup() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-24">
      <DarkLightToggle className="absolute top-10" />
      <SignUpForm />
    </main>
  )
}
