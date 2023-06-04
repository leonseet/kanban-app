"use client"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"
import { store } from "./redux/store"
import { Provider } from "react-redux"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider enableSystem={false} attribute="class">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  )
}

export default Providers
