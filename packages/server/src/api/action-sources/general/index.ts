import { memoize } from "@todoguru/shared/common/utils/memoize";
import { getRestSource } from "../rest";
import { getWebsocketSource } from "../websocket";
import { ActionSource } from "../_types/action-source";

export const getGeneralActionsSource = memoize<() => ActionSource>(() => {
  const sources: ActionSource[] = [
    getRestSource(),
    getWebsocketSource()
  ]

  return {
    registerAction(action) {
      sources.forEach(source => source.registerAction(action))
    },
    startListening() {
      sources.forEach(source => source.startListening())
    }
  }
})
