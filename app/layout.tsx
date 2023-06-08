import "@/styles/globals.css"
import Providers from "./Providers"
import { Toaster } from "@/components/ui/toaster"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
// import Preloader from "@/components/Preloader"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata = {
  title: "Kanban",
  description: "A simple kanban board app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontHeading.variable}`}>
        {/* <Preloader /> */}
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
