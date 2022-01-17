import { ClientAction, OwnClientActionProperties } from "../_types";

export const createClientAction = (action: ClientAction) => action
export const deriveClientAction = (sharedAction: ClientAction, clientProperties?: OwnClientActionProperties) => ({
  ...sharedAction,
  ...clientProperties
})
