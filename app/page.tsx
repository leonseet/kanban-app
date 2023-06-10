/* eslint-disable react/no-unescaped-entities */
import Footer from "@/components/Footer"
import LandingHeader from "@/components/LandingHeader"
import LandingMain from "@/components/LandingMain"

export default async function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <header className="container z-40">
        <LandingHeader />
      </header>

      <div className="flex-1">
        <LandingMain />
      </div>

      <footer className="container">
        <Footer />
      </footer>
    </div>
  )
}
