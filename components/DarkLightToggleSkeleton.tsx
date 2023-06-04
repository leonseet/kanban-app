import { Skeleton } from "./ui/skeleton"
import { cn } from "@/lib/utils"
import { FC } from "react"

interface DarkLightToggleSkeletonProps {
  className?: string
}

const DarkLightToggleSkeleton: FC<DarkLightToggleSkeletonProps> = ({ className }) => {
  return (
    <div className={cn("flex gap-4 items-center justify-center cursor-not-allowed", className)}>
      <Skeleton className="w-5 h-5" />
      <Skeleton className="w-10 h-6" />
      <Skeleton className="w-5 h-5" />
    </div>
  )
}

export default DarkLightToggleSkeleton
