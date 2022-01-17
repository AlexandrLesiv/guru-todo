import { TaskCreate } from "@todoguru/shared/types"
import { FC, FormEvent, useState } from "react"
import * as styles from './index.module.css'

export interface AddTaskPanelProps {
  createTask: (task: TaskCreate) => void;
}

export const AddTaskPanel: FC<AddTaskPanelProps> = (props) => {
  const { createTask } = props
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescriptions] = useState('')

  const submitForm = (e: FormEvent) => {
    e.preventDefault()

    const task: TaskCreate = {
      name: taskName,
      description: taskDescription,
      done: false,
    }

    createTask(task)
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <div className={styles.createTaskFormSection}>
        <label className={styles.createTaskFormLabel} htmlFor="task-name">Name</label>
        <input className={styles.formItem} id="task-name" name="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </div>

      <div className={styles.createTaskFormSection}>
        <label className={styles.createTaskFormLabel} htmlFor="task-description">Description</label>
        <input className={styles.formItem} id="task-description" name="taskDescription" value={taskDescription} onChange={(e) => setTaskDescriptions(e.target.value)} />
      </div>

      <div className={styles.createTaskFormSection}>
        <button className={styles.formItem} type="submit">Create Task</button>
      </div>
    </form>
  )
}