import { SharedAction } from "@todoguru/shared/actions/_types";
import { ServerAction, ServerActionHandler } from "../_types/action";

export const createServerAction = (action: ServerAction) => action
export const deriveServerAction = (action: SharedAction, handler: ServerActionHandler): ServerAction =>
  createServerAction({ ...action, handler })
