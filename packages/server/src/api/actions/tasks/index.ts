import { getTasksSharedAction, createTaskSharedAction, updateTaskSharedAction } from "@todoguru/shared/actions";
import { getTasksRepository } from "../../../data/repositories";
import { ServerAction } from "../_types/action";
import { deriveServerAction } from "../_helpers";

const createTaskServerAction = deriveServerAction(createTaskSharedAction, ({ body }) => {
  // The request should be validated in production

  const tasksRepository = getTasksRepository()
  const addedTask = tasksRepository.addTask(body)

  return addedTask
})

const getTasksServerAction = deriveServerAction(getTasksSharedAction, () => {
  const tasksRepository = getTasksRepository()
  const tasks = tasksRepository.getTasks()

  return tasks
})

const updateTaskServerAction = deriveServerAction(updateTaskSharedAction, ({ params, body }) => {
  const tasksRepository = getTasksRepository()
  const updatedTask = tasksRepository.updateTask(params.id!, body)
  
  return updatedTask
})


export const getTaskActions = (): ServerAction[] => [
  createTaskServerAction,
  getTasksServerAction,
  updateTaskServerAction,
]
