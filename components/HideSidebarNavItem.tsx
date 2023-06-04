"use client"

import { setSidebar } from "@/app/redux/features/toggleSidebarSlice"
import { RootState } from "@/app/redux/store"
import { FC } from "react"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"

interface HideSidebarNavItemProps {}

const HideSidebarNavItem: FC<HideSidebarNavItemProps> = () => {
  const isSidebarOpen = useSelector((state: RootState) => state.toggleSidebar.isSidebarOpen)
  const dispatch = useDispatch()

  return (
    <div className="pl-6 text-xl sm:text-base flex sm:pl-10 mr-6 text-secondary-foreground rounded-r-full py-3 sm:px-10 gap-2 items-center">
      <button
        onClick={() => dispatch(setSidebar(!isSidebarOpen))}
        className="flex items-center gap-4"
      >
        <AiOutlineEyeInvisible className="w-6 h-6" />
        <div>
          <p className="text-md truncate font-semibold w-52 sm:w-32">Hide Sidebar</p>
        </div>
      </button>
    </div>
  )
}

export default HideSidebarNavItem
