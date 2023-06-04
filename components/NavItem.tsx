"use client"

import { FC, ReactNode } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface NavItemProps {
  title: string
  href: string
  children: ReactNode
}

const NavItem: FC<NavItemProps> = ({ title, href, children }) => {
  const searchParams = useSearchParams()
  const boardName = searchParams.get("board")

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: title,
    // data: {},
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Link
      href={`/kanban?board=${href}`}
      // className={`pl-6 text-xl sm:text-base flex ease-in-out duration-200 sm:pl-10 mr-6 text-secondary-foreground rounded-r-full py-3 sm:px-10 gap-4 items-center hover:bg-[#5046BA] hover:text-white ${
      //   href === boardName ? "bg-[#5046BA] text-white" : ""
      // }`}
      className="pl-6 text-xl sm:text-base flex ease-in-out duration-200 sm:pl-10 mr-6 text-secondary-foreground rounded-r-full py-3 sm:px-10 gap-4 items-center"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
      <div>
        <p className="text-md truncate font-semibold w-52 sm:w-32">{title}</p>
      </div>
    </Link>
  )
}

export default NavItem
