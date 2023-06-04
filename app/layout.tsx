import "@/styles/globals.css"
import Providers from "./Providers"
import { Toaster } from "@/components/ui/toaster"
// import Preloader from "@/components/Preloader"

export const metadata = {
  title: "Kanban",
  description: "A simple kanban board app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <Preloader /> */}
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
