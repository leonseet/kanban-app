import { createBoard } from "@/lib/service/createBoard"
import { updateUser } from "@/lib/service/updateUser"
import { createColumn } from "@/lib/service/createColumn"
import { createTask } from "@/lib/service/createTask"
import { createSubtask } from "@/lib/service/createSubtask"
import { LexoRank } from "lexorank"

const newUserBootstrap = async ({ userId }: { userId: string }) => {
  const board = await createBoard({
    userId: userId,
    title: "Sample Board",
    rank: LexoRank.middle().toString(),
  })
  await updateUser({ userId: userId, newUser: false })

  const columnsData = [
    { title: "Todo", numTasks: 4 },
    { title: "In Progress", numTasks: 6 },
    { title: "Done", numTasks: 3 },
  ]

  const taskSamples = [
    "Schedule a meeting with the team",
    "Review project proposal",
    "Finish the report",
    "Design user interface",
    "Test new features",
    "Fix reported bugs",
    "Deploy to production",
    "Plan next sprint",
    "Revise project roadmap",
    "Check email",
    "Conduct user interviews",
    "Analyze feedback",
    "Update project documentation",
    "Organize team building event",
    "Prepare quarterly review",
  ]

  const subtaskSamples = [
    "Draft an email",
    "Prepare a presentation",
    "Create a timeline",
    "Design a prototype",
    "Write test cases",
    "Review the code",
    "Check server logs",
    "Follow up with clients",
    "Submit report",
    "Update status",
    "Check-in with team members",
    "Proofread document",
    "Clean up files",
    "Back up data",
    "Send invoice",
  ]
  let columnPreviousRank = LexoRank.middle()
  for (const columnData of columnsData) {
    const column = await createColumn({
      boardId: board?.data?.id,
      title: columnData.title,
      rank: columnPreviousRank.toString(),
    })
    columnPreviousRank = columnPreviousRank.genNext()

    let taskPreviousRank = LexoRank.middle()
    const tasksForColumn = taskSamples.splice(0, columnData.numTasks)
    for (const taskTitle of tasksForColumn) {
      const task = await createTask({
        columnId: column?.data?.id,
        title: taskTitle,
        description: `This is a task in ${columnData.title}. You can add description, subtasks, and status to it.`,
        status: columnData.title,
        rank: taskPreviousRank.toString(),
      })
      taskPreviousRank = taskPreviousRank.genNext()

      let subtaskPreviousRank = LexoRank.middle()
      const numSubtasks = Math.floor(Math.random() * 3) + 4 // Random number between 4 to 6
      let checked: boolean
      if (columnData.title === "Todo") {
        checked = false
      } else if (columnData.title === "In Progress") {
        checked = Math.random() < 0.5 // random boolean
      } else {
        // If the column is "Done"
        checked = true
      }
      for (const _ of Array.from({ length: numSubtasks })) {
        await createSubtask({
          taskId: task?.data?.id,
          description: subtaskSamples[Math.floor(Math.random() * subtaskSamples.length)],
          checked: checked,
          rank: subtaskPreviousRank.toString(),
        })
        subtaskPreviousRank = subtaskPreviousRank.genNext()
      }
    }
  }
}

export default newUserBootstrap
