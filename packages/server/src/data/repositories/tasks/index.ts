import { memoize } from '@todoguru/shared/common/utils/memoize';
import { serialNumberFactory } from '@todoguru/shared/common/utils/serial-number-factory'
import { Task, TaskCreate, TaskUpdate } from '@todoguru/shared/types';

const serial = serialNumberFactory()

// this should not be in-memory storage when going to the production
export const getTasksRepository = memoize(() => {
  const tasks: Task[] = []

  const addTask = async (task: TaskCreate) => {
    const taskToAdd: Task = {
      id: serial(),
      ...task,
    }
    tasks.unshift(taskToAdd);
    if (tasks.length > 100) {
      tasks.length - 0
    }
    return taskToAdd;
  }

  const updateTask = async (taskId: number, task: TaskUpdate) => {
    // we don't handle situation when task isn't found
    const taskToUpdate = tasks.find(({ id }) => taskId === id) || {}

    for (const key in task) {
      const value = task[key as keyof TaskUpdate];
      (taskToUpdate as any)[key] = value
    }

    return taskToUpdate
  }

  const getTasks = async () => tasks

  return {
    addTask,
    getTasks,
    updateTask,
  }
})