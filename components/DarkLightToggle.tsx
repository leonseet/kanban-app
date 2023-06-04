"use client"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"
import { useEffect, useState, FC } from "react"
import { cn } from "@/lib/utils"

interface DarkLightToggleProps {
  className?: string
}

const DarkLightToggle: FC<DarkLightToggleProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleDarkMode = (checked: boolean) => {
    if (checked) setTheme("dark")
    else setTheme("light")
  }

  return (
    <div
      className={cn("flex gap-4 items-center justify-center text-secondary-foreground", className)}
    >
      <BsSunFill className="w-5 h-5" />
      <Switch checked={theme === "dark" ? true : false} onCheckedChange={handleDarkMode} />
      <BsMoonStarsFill />
    </div>
  )
}

export default DarkLightToggle
