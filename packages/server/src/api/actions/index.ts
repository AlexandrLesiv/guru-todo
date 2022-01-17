import { memoize } from "@todoguru/shared/common/utils/memoize"
import { getTaskActions } from "./tasks"

export const getAllActions = memoize(() => {
  const taskActions = getTaskActions()

  const allActions = [...taskActions]

  return allActions
})
