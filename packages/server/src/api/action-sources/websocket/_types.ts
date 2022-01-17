import { ServerAction, ServerActionHandler } from "../../actions/_types/action";

export interface WebsocketMatchMap {
  get(path: string): ServerAction | undefined
  set(path: string, handler: ServerAction): void
  delete(path: string): void
}