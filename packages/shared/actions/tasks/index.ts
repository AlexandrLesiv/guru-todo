import { createAction } from '../_helpers';

export const getTasksSharedAction = createAction({ name: '/tasks', type: 'GET' })
export const createTaskSharedAction = createAction({ name: '/tasks', type: 'POST' })
export const updateTaskSharedAction = createAction({ name: '/tasks/:id', type: 'PUT' })
