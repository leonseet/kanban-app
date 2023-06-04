"use client"
import { FC, useState } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "@/components/ui/popover"
import { X } from "lucide-react"

interface DeleteLanePopoverProps {
  columnId: number
  deleteColumn: ({ columnId }: { columnId: number }) => Promise<void>
}

const DeleteLanePopover: FC<DeleteLanePopoverProps> = ({ columnId, deleteColumn }) => {
  const [isOpen, setIsOpen] = useState(false)

  const deleteLane = async () => {
    await deleteColumn({ columnId })
    setIsOpen(false)
  }

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="py-1.5">
          <X className="text-secondary-foreground opacity-40 hover:text-red-500 hover:opacity-100 w-5 h-5 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="center"
          className="dark:bg-black bg-white flex flex-col items-center gap-4 w-fit "
        >
          <div className="flex gap-4">
            <Button onClick={deleteLane} variant="destructive" size="sm" className="px-6">
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

export default DeleteLanePopover
