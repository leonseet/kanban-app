import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"
import newUserBootstrap from "@/lib/newUserBootstrap"
import StickyBar from "@/components/StickyBar"
import SideBar from "@/components/SideBar"
import { redirect } from "next/navigation"
import hyphenToSpace from "@/lib/hyphenToSpace"
import KanbanBoard from "@/components/KanbanBoard"
import stringToUrl from "@/lib/stringToUrl"
// import Preloader from "@/components/Preloader"

export default async function Kanban({ searchParams }: { searchParams: { board?: string } }) {
  const session = await getServerSession(authOptions)

  const user = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  })

  const boards = await db.board.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      rank: "asc",
    },
    select: {
      title: true,
      rank: true,
      id: true,
      userId: true,
    },
  })

  if (user?.newUser) {
    await newUserBootstrap({ userId: user?.id })
    redirect("/kanban?board=Sample-Board")
  }

  if (!searchParams.board) {
    redirect(`/kanban?board=${stringToUrl({ inputString: boards[0].title })}`)
  }

  let board = await db.board.findFirst({
    where: {
      title: hyphenToSpace({ inputString: searchParams.board ?? "" }),
      userId: session?.user?.id,
    },
    // orderBy: {
    //   rank: "asc",
    // },
    include: {
      columns: {
        orderBy: {
          rank: "asc",
        },
        include: {
          tasks: {
            orderBy: {
              rank: "asc",
            },
            include: {
              subtasks: {
                orderBy: {
                  rank: "asc",
                },
              },
            },
          },
        },
      },
    },
  })

  board = JSON.parse(JSON.stringify(board))

  return (
    <div className="h-screen overflow-hidden overflow-x-scroll scrollbar-hide">
      {/* <Preloader board={board} /> */}
      {/* Stickybar */}
      {user && <StickyBar user={user} board={searchParams.board ?? ""} />}
      <div className="scrollbar-hide h-screen flex overflow-scroll ml-6">
        {/* Sidebar */}
        {session?.user?.id && <SideBar boards={boards} userId={session?.user?.id} />}
        {/* Kanban Boards */}
        <KanbanBoard board={board} />
      </div>
    </div>
  )
}
