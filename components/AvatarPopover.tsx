import { FC } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BiLogOut } from "react-icons/bi"
import { signOut } from "next-auth/react"
import { User } from "@prisma/client"

interface AvatarPopoverProps {
  user: User
}

const onSignOut = () => {
  signOut({ callbackUrl: "/login" })
}

const AvatarPopover: FC<AvatarPopoverProps> = ({ user }) => {
  const fallbackName =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("") ?? ""

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Avatar className="w-14 h-14">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{fallbackName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background w-24">
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
            <BiLogOut className="w-5 h-5" />
            <button onClick={onSignOut}>Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default AvatarPopover
