import { Task, TaskCreate, TaskUpdate } from '@todoguru/shared/types'
import { FC, useEffect, useState } from 'react'
import { createTaskClientAction, getTasksClientAction, updateTaskClientAction } from '../api/actions'
import { getGeneralApiProvider } from '../api/providers/general-provider'
import { TaskList } from './containers/task-list'
import { AddTaskPanel } from './containers/add-task-panel'
import * as styles from './index.module.css'

export const App: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskPanelKey, setTaskPanelKey] = useState(1)
  useEffect(() => {
    const generalApoProvider = getGeneralApiProvider()

    // we don't handle errors for this example
    generalApoProvider.request(getTasksClientAction)
      .then((r) => {
        setTasks(r)
      })
  }, [])


  const createTask = (task: TaskCreate) => {
    const generalApiProvider = getGeneralApiProvider()

    generalApiProvider.request(createTaskClientAction, {
      body: task,
      params: undefined,
      query: undefined
    }).then(response => {
      setTasks([response, ...tasks])
      setTaskPanelKey(taskPanelKey + 1)
    })
  }

  const updateTask = (id: number, task: TaskUpdate) => {
    const generalApiProvider = getGeneralApiProvider()

    generalApiProvider.request(updateTaskClientAction, {
      body: task,
      params: { id },
      query: undefined,
    }).then(response => {
      const tasksUpdated = tasks.map(item => item.id === response.id ? response : item)
      setTasks(tasksUpdated)
    })
  }

  return (
    <div>
      <h1 className={styles.header}>Tasks</h1>
      <AddTaskPanel key={taskPanelKey} createTask={createTask} />
      <main>
        <TaskList tasks={tasks} updateTask={updateTask} />
      </main>
    </div>
  )
}
