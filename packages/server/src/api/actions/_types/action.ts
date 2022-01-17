import { SharedAction, SharedActionData } from '@todoguru/shared/actions/_types'

export interface ServerAction extends SharedAction {
  handler: ServerActionHandler;
}

export interface ServerActionHandler {
  (data: SharedActionData): Promise<any>
}

