"use client"

import { FC, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { HiOutlineViewBoards } from "react-icons/hi"
import { MdDragIndicator } from "react-icons/md"
import { deleteBoard } from "@/lib/service/deleteBoard"
import { X } from "lucide-react"
import { AiOutlineEdit } from "react-icons/ai"
import { updateBoard } from "@/lib/service/updateBoard"
import { updateBoardByTitle } from "@/lib/service/updateBoardByTitle"
import stringToUrl from "@/lib/stringToUrl"
import DeleteBoardPopover from "./DeleteBoardPopover"

interface BoardNavItemProps {
  title: string
  href: string
  userId: string
}

const BoardNavItem: FC<BoardNavItemProps> = ({ title, href, userId }) => {
  const originalTitle = title
  const [isRenaming, setIsRenaming] = useState(false)
  const [boardTitle, setBoardTitle] = useState(title)
  const searchParams = useSearchParams()
  const boardName = searchParams.get("board")
  const router = useRouter()
  const renameBoard = useRef<HTMLInputElement>(null)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: boardTitle,
  })

  const scrollRef = useRef<HTMLDivElement>(null)
  const executeScroll = () => scrollRef?.current?.scrollIntoView({ behavior: "auto" })

  useEffect(() => {
    if (href === boardName) {
      executeScroll()
    }
  }, [href, boardName])

  useEffect(() => {
    if (isRenaming && renameBoard.current) {
      renameBoard.current.focus()
    }
  }, [isRenaming])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const onDeleteBoard = async () => {
    await deleteBoard({ boardName: boardTitle, userId })
    router.push("/kanban")
    router.refresh()
  }

  const handleRenameBoard = async () => {
    console.log(boardTitle)

    if (boardTitle.trim() === "") {
      setBoardTitle(originalTitle)
      return
    }
    setIsRenaming((prev) => !prev)
    if (isRenaming) {
      await updateBoardByTitle({ newBoardTitle: boardTitle, oldBoardTitle: originalTitle, userId })
      router.push(`/kanban?board=${stringToUrl({ inputString: boardTitle })}`)
      router.refresh()
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRenameBoard()
    }
  }

  return (
    <div ref={scrollRef} className="flex">
      <div
        className={`pl-6 text-xl sm:text-base flex sm:pl-2 mr-6 text-secondary-foreground rounded-r-full py-3 sm:pr-6 gap-2 items-center ${
          href === boardName ? "bg-[#5046BA] text-white" : ""
        }`}
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <MdDragIndicator {...listeners} className="w-6 h-6 opacity-30 hover:opacity-100" />
        <Link href={`/kanban?board=${href}`} className="flex items-center gap-4">
          <HiOutlineViewBoards className="w-6 h-6" />
          {!isRenaming && (
            <p className="text-md truncate font-semibold w-52 sm:w-28">{boardTitle}</p>
          )}
          {isRenaming && (
            <input
              className="text-md truncate font-semibold w-52 sm:w-28 bg-transparent outline-none"
              type="text"
              ref={renameBoard}
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onBlur={handleRenameBoard}
              onKeyDown={handleKeyDown}
            />
          )}
        </Link>
        {href === boardName && (
          <button onClick={handleRenameBoard}>
            <AiOutlineEdit className="w-5 h-5 opacity-30 hover:opacity-100" />
          </button>
        )}
        {href === boardName && <DeleteBoardPopover boardTitle={boardTitle} userId={userId} />}
      </div>
    </div>
  )
}

export default BoardNavItem
