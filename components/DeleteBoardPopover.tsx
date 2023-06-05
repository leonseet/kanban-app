"use client"
import { FC, useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "@/components/ui/popover"
import { X } from "lucide-react"
import { deleteBoard } from "@/lib/service/deleteBoard"
import { useRouter } from "next/navigation"

interface DeleteBoardPopoverProps {
  boardTitle: string
  userId: string
}

const DeleteBoardPopover: FC<DeleteBoardPopoverProps> = ({ boardTitle, userId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const onDeleteBoard = async () => {
    await deleteBoard({ boardName: boardTitle, userId })
    setIsOpen(false)
    router.push("/kanban")
    router.refresh()
  }

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="py-1.5">
          <X className=" opacity-30 hover:text-red-500 hover:opacity-100 w-5 h-5 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="center"
          className="dark:bg-black bg-white flex flex-col items-center gap-4 w-fit "
        >
          <div className="flex gap-4">
            <Button onClick={onDeleteBoard} variant="destructive" size="sm" className="px-6">
              Confirm
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline" size="sm" className="px-6">
              Cancel
            </Button>
          </div>

          {/* <PopoverArrow className="" /> */}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DeleteBoardPopover
