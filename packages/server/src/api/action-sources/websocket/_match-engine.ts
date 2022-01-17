import { SharedAction } from "@todoguru/shared/actions/_types"
import { memoize } from "@todoguru/shared/common/utils/memoize"
import { ServerAction } from "../../actions/_types/action"
import { WebsocketMatchMap } from "./_types"

export const getMatchEngine = memoize(() => {
  const getRoutes: WebsocketMatchMap =  new Map()
  const postRoutes: WebsocketMatchMap = new Map()
  const putRoutes: WebsocketMatchMap = new Map()
  const deleteRoutes: WebsocketMatchMap = new Map()

  const allRoutes = {
    GET: getRoutes,
    POST: postRoutes,
    PUT: putRoutes,
    DELETE: deleteRoutes,
  }

  return {
    addAction(action: ServerAction) {
      allRoutes[action.type].set(action.name, action)
    },
    getServerAction(action: SharedAction) {
      return allRoutes[action.type].get(action.name)
    }
  }
})
