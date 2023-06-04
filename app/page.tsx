import { Inter } from "next/font/google"
import DarkLightToggleSkeleton from "@/components/DarkLightToggleSkeleton"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const DarkLightToggle = dynamic(() => import("@/components/DarkLightToggle"), {
  ssr: false,
  loading: () => <DarkLightToggleSkeleton />,
})

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <DarkLightToggle />
      <Button>Button</Button>
    </main>
  )
}
