import { getGeneralActionsSource } from "./action-sources/general"
import { getAllActions } from "./actions"

export const runApi = () => {
  const actionsSource = getGeneralActionsSource()
  const appActions = getAllActions()

  appActions.forEach(action => actionsSource.registerAction(action))

  actionsSource.startListening()
}