import { Task, TaskUpdate } from "@todoguru/shared/types"
import { FC } from "react"
import { TaskListItem } from "../task-list-item"
import * as styles from './index.module.css'

export interface TaskListProps {
  tasks: Task[]
  updateTask: (id: number, task: TaskUpdate) => void
}

export const TaskList: FC<TaskListProps> = ({ tasks, updateTask }) => {

  return (
    <ul className={styles.list}>
      {tasks.map(task => <TaskListItem key={task.id} task={task} updateTask={updateTask} />)}
    </ul>
  )
}