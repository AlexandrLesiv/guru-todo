import { FC } from "react";
import { Task, TaskUpdate } from '@todoguru/shared/types'
import * as styles from './index.module.css'

export interface TaskListItemProps {
  task: Task;
  updateTask: (id: number, task: TaskUpdate) => void
}

export const TaskListItem: FC<TaskListItemProps> = ({ task, updateTask }) => {
  const checkboxId = 'checkbox-' + task.id

  return (
    <li className={styles.taskListItem}>
      <div>
        <h2 className={styles.header}>{ task.name }</h2>
        <p>{ task.description }</p>
      </div>
      <form className={styles.checkboxContainer}>
        <label className={styles.isDoneLabel} htmlFor={checkboxId}>Is Done</label>
        <input
            id={checkboxId}
            checked={task.done}
            type="checkbox"
            className={styles.tasksCheckbox}
            onChange={(e) => updateTask(task.id, { ...task, done: e.target.checked })}
          />
      </form>
    </li>
  )
}