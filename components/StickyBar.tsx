"use client"

import { FC } from "react"
import { RiArrowDropDownLine } from "react-icons/ri"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import stringToUrl from "@/lib/stringToUrl"
import hyphenToSpace from "@/lib/hyphenToSpace"
import NavItem from "./NavItem"
import { MdOutlineSpaceDashboard } from "react-icons/md"
import AvatarPopover from "./AvatarPopover"
import { GoPlus } from "react-icons/go"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { User } from "@prisma/client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { setSearchInput } from "@/app/redux/features/taskFilterSlice"

const navInfos = [
  {
    title: "Platform Launch Platform Launch",
    href: stringToUrl({ inputString: "Platform Launch " }),
  },
  {
    title: "Marketing Plan",
    href: stringToUrl({ inputString: "Marketing Plan" }),
  },
  {
    title: "Roadmap",
    href: stringToUrl({ inputString: "Roadmap" }),
  },
]

interface StickyBarProps {
  user: User
  board: string | ""
  boards: { rank: string; id: number; title: string; userId: string }[]
}

const StickyBar: FC<StickyBarProps> = ({ user, board, boards }) => {
  const dispatch = useDispatch()

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value))
  }

  const isSidebarOpen = useSelector((state: RootState) => state.toggleSidebar.isSidebarOpen)
  return (
    <div className="p-4 fixed left-0 bg-secondary z-20 right-0 border dark:border-b-gray-800 border-b-gray-200 border-1">
      <header className=" flex justify-between dark:text-white items-center h-12 sm:h-16">
        {/* Left Side  */}
        <div className=" flex items-center md:gap-4">
          <div className="flex items-center gap-4 sm:gap-0">
            <Image
              src="logo-mobile.svg"
              width={1}
              height={1}
              alt="Kanban Mobile Logo"
              className={`w-auto h-8 ${
                isSidebarOpen ? "sm:hidden" : "sm:block border-r-gray-700 border-r-2 px-10"
              }`}
            />

            <h3
              className={`hidden sm:block truncate sm:text-2xl text-lg font-heading ${
                isSidebarOpen ? "sm:ml-[19rem]" : "sm:ml-[2rem]"
              } `}
            >
              {hyphenToSpace({ inputString: board })}
            </h3>
            <Dialog>
              <DialogTrigger className="sm:hidden flex gap-4 font-semibold items-center justify-center">
                <p>{hyphenToSpace({ inputString: board })}</p>
                <RiArrowDropDownLine className="-ml-4 w-8 h-8 text-[#5046BB] sm:hidden" />
              </DialogTrigger>
              <DialogContent className="w-11/12 px-0 rounded-lg border-0 bg-secondary flex flex-col">
                <p className="px-6 mb-2 tracking-[0.2em] text-md font-semibold text-secondary-foreground">
                  ALL BOARDS ({boards?.length || 0})
                </p>
                <nav className="flex flex-col gap-2">
                  {boards.map(({ title }) => (
                    <NavItem key={title} title={title} href={stringToUrl({ inputString: title })}>
                      <MdOutlineSpaceDashboard className="w-6 h-6" />
                    </NavItem>
                  ))}
                  <button className="flex pl-6 text-xl mr-6 text-secondary-foreground rounded-r-full py-4 sm:px-10 gap-4 items-center">
                    <GoPlus className="text-[#5046BA] w-6 h-6" />
                    <div>
                      <p className="text-[#5046BA] truncate font-semibold w-52 sm:w-32 text-left">
                        New Board
                      </p>
                    </div>
                  </button>
                </nav>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="px-0 sm:px-8 flex gap-8 items-center">
          <Command className="hidden sm:block border border-input bg-transparent text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <CommandInput placeholder="Search tasks..." onChangeCapture={onSearchInputChange} />
          </Command>
          <AvatarPopover user={user} />
        </div>
      </header>
    </div>
  )
}

export default StickyBar
