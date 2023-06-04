"use client"
import { FC } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
interface EmptyBoardProps {
  addColumn: () => void
}

const EmptyBoard: FC<EmptyBoardProps> = ({ addColumn }) => {
  const { theme } = useTheme()
  const isSidebarOpen = useSelector((state: RootState) => state.toggleSidebar.isSidebarOpen)

  return (
    <div
      className={`${
        isSidebarOpen ? "-ml-40" : ""
      } flex flex-col items-center justify-center w-screen gap-6 h-screen`}
    >
      <Image
        src={theme === "dark" ? "purple-create-board-dark.svg" : "purple-create-board-light.svg"}
        width={1}
        height={1}
        alt="Create Board"
        className="w-auto h-96"
      />
      <p className="text-secondary-foreground font-semibold text-center">
        This board is empty. Create a new lane to get started.
      </p>
      <Button onClick={addColumn} variant="default" edge="round" size="lg">
        + Add New Lane
      </Button>
    </div>
  )
}

export default EmptyBoard
