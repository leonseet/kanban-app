export interface ColumnWithTasks {
  id: number
  title: string | null
  boardId: number
  createdAt: Date
  rank: string
  tasks: {
    id: number
    title: string | null
    description: string | null
    status: string | null
    columnId: number
    rank: string
    createdAt: Date
    subtasks: {
      id: number
      description: string | null
      checked: boolean
      taskId: number
      createdAt: Date
      rank: string
    }[]
  }[]
}

export interface TaskWithSubtasks {
  id: number
  title: string | null
  description: string | null
  status: string | null
  columnId: number
  rank: string
  createdAt: Date
  subtasks: {
    id: number
    description: string | null
    checked: boolean
    taskId: number
    createdAt: Date
    rank: string
  }[]
}

export interface CustomSubtask {
  description: string | null
  checked: boolean
  taskId: number | null
  id?: number
  rank: string
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    project_github: string
    github: string
    linkedin: string
    shadcn: string
    vercel: string
    frontendmentor: string
  }
}
