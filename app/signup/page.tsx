import SignUpForm from "@/components/SignUpForm"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { signIn } from "next-auth/react"
import Footer from "@/components/Footer"

export default function Signup() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1">
        <SignUpForm />
      </div>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <Footer />
      </div>
    </main>
  )
}
