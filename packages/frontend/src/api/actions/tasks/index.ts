import { deriveClientAction } from "../_helpers";
import { createTaskSharedAction, getTasksSharedAction, updateTaskSharedAction } from '@todoguru/shared/actions'

export const createTaskClientAction = deriveClientAction(createTaskSharedAction, { credentials: 'include' })
export const getTasksClientAction = deriveClientAction(getTasksSharedAction, { credentials: 'include' })
export const updateTaskClientAction = deriveClientAction(updateTaskSharedAction, { credentials: 'include' })
