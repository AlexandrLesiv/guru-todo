export interface TaskCreate {
  name: string
  description: string
  done: boolean
}

export type TaskUpdate = Partial<TaskCreate>

export interface Task extends TaskCreate {
  id: number
}
