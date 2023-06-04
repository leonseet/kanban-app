"use client"

import { FC, useState, useEffect, useRef } from "react"
import Image from "next/image"
import DarkLightToggle from "./DarkLightToggle"
import { useTheme } from "next-themes"
import { AiFillEye } from "react-icons/ai"
import { GoPlus } from "react-icons/go"
import { HiOutlineViewBoards } from "react-icons/hi"
import stringToUrl from "@/lib/stringToUrl"
import { createBoard } from "@/lib/service/createBoard"
import { useRouter } from "next/navigation"
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import BoardNavItem from "./BoardNavItem"
import { LexoRank } from "lexorank"
import moveBoard from "@/lib/moveBoard"
import HideSidebarNavItem from "./HideSidebarNavItem"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { setSidebar } from "@/app/redux/features/toggleSidebarSlice"

interface SideBarProps {
  boards: { rank: string; id: number; title: string; userId: string }[]
  userId: string
}

const SideBar: FC<SideBarProps> = ({ boards, userId }) => {
  const [curBoards, setCurBoards] = useState(boards ?? [])
  const [isCreating, setIsCreating] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState("")
  const { theme } = useTheme()
  const newBoardTitleRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  const sensors = useSensors(pointerSensor)
  const isSidebarOpen = useSelector((state: RootState) => state.toggleSidebar.isSidebarOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isCreating && newBoardTitleRef.current) {
      newBoardTitleRef.current.focus()
    }
  }, [isCreating])

  const handleNewBoardCreation = async () => {
    setIsCreating(false)
    if (newBoardTitle.trim() === "") return
    const lastRank = curBoards[curBoards.length - 1]?.rank
    const newRank = lastRank
      ? LexoRank.parse(lastRank).genNext().toString()
      : LexoRank.min().toString()
    const createdBoard = await createBoard({ title: newBoardTitle, userId, rank: newRank })
    setCurBoards((prev) => [...prev, createdBoard.data])
    router.push(`/kanban?board=${stringToUrl({ inputString: newBoardTitle })}`)
    router.refresh()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNewBoardCreation()
    }
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    if (!e.over) return
    // console.log("handleDragEnd", e)
    const activeTitle = e.active.id.toString()
    const overTitle = e.over?.id.toString()
    const newBoards = await moveBoard({ boards: curBoards, activeTitle, overTitle })
    setCurBoards(newBoards)
    router.refresh()
  }

  return (
    <>
      {isSidebarOpen && (
        <div className="hidden sm:block w-72 py-10 bg-secondary fixed top-0 h-screen items-center left-0 z-30 border border-1 dark:border-r-gray-800 border-r-gray-200">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-10">
              <Image
                src={theme === "dark" ? "logo-light.svg" : "logo-dark.svg"}
                width={1}
                height={1}
                alt="Kanban Logo"
                className="w-auto h-8"
              />
            </div>

            {/* All boards */}
            <p className="mt-14 px-10 mb-8 tracking-[0.2em] text-sm font-semibold text-secondary-foreground">
              ALL BOARDS ({curBoards?.length || 0})
            </p>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <nav className="flex flex-col gap-4">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                  <div className="flex flex-col gap-4">
                    <SortableContext
                      items={curBoards?.map((curBoard) => {
                        return { id: curBoard.title }
                      })}
                      strategy={verticalListSortingStrategy}
                    >
                      {curBoards?.map(({ title }) => (
                        <BoardNavItem
                          key={title}
                          title={title}
                          href={stringToUrl({ inputString: title })}
                          userId={userId}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </DndContext>
              </nav>

              {/* Create new Board */}
              {isCreating ? (
                <div className="flex sm:pl-10 mr-6 mt-4 text-secondary-foreground rounded-r-full py-3 sm:px-10 gap-4 items-center">
                  <HiOutlineViewBoards className="w-6 h-6" />
                  <input
                    ref={newBoardTitleRef}
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    onBlur={handleNewBoardCreation}
                    onKeyDown={handleKeyDown}
                    className="truncate font-semibold w-52 sm:w-32 text-left outline-none bg-transparent"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex sm:pl-10 mr-6 mt-4 text-secondary-foreground rounded-r-full py-3 sm:px-10 gap-4 items-center"
                >
                  <GoPlus className="text-[#5046BA] w-6 h-6" />
                  <div>
                    <p className="text-[#5046BA] truncate font-semibold w-52 sm:w-32 text-left">
                      New Board
                    </p>
                  </div>
                </button>
              )}
            </div>

            {/* Toggle DarkLight */}
            <div className="bg-background py-4 mb-4 mt-12 mx-10 rounded-lg">
              <DarkLightToggle />
            </div>
            {/* Hide Sidebar Tab */}
            <HideSidebarNavItem />
          </div>
        </div>
      )}

      {/* Show Sidebar Tab */}
      {!isSidebarOpen && (
        <button
          onClick={() => dispatch(setSidebar(!isSidebarOpen))}
          className="absolute left-0 bottom-10 text-xl text-white py-4 flex items-center justify-center px-3 opacity-30 hover:opacity-100 rounded-r-full bg-primary"
        >
          <AiFillEye className="w-6 h-6" />
        </button>
      )}
    </>
  )
}

export default SideBar
