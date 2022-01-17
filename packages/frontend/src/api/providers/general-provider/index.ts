import { memoize } from "@todoguru/shared/common/utils/memoize";
import { getRestApiProvider } from "../rest-api-provider";
import { getWebsocketApiProvider } from "../websocket-api-provider";
import { ApiProvider } from "../_types";

export const getGeneralApiProvider = memoize<() => ApiProvider>(() => {
  const restProvider = getRestApiProvider()
  const websocketProvider = getWebsocketApiProvider()

  return {
    request(action, payload) {
      if (websocketProvider.ready() && !action.onlyWs) return websocketProvider.request(action, payload)
      return restProvider.request(action, payload)
    },
    ready() {
      return true;
    }
  }
})
