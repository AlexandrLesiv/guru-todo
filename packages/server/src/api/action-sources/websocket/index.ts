import { ActionSource } from "../_types/action-source";
import { memoize } from "@todoguru/shared/common/utils/memoize";
import { getFastifyServer } from "../_node-server";
import { appActionWebsocketKey } from "@todoguru/shared/common/constants";
import { WebsocketActionPayload, WebsocketActionResponsePayload } from "@todoguru/shared/actions/_types";
import { getMatchEngine } from "./_match-engine";

export const getWebsocketSource = memoize<() => ActionSource>(() => {
  const server = getFastifyServer()
  const matchEngine = getMatchEngine()

  const runWebSocket = () => {
    const io = server.io

    io.on('connection', (socket) => {
      socket.on(appActionWebsocketKey, async (data: WebsocketActionPayload) => {
        // we don't handle not found case
        const serverAction = matchEngine.getServerAction(data.action)!
        const actionData = data.data || { body: undefined, params: undefined, query: undefined }
        const actionResult = await serverAction.handler(actionData)

        const response: WebsocketActionResponsePayload = {
          data: actionResult,
          nonce: data.nonce,
          statusCode: 200
        }

        socket.emit(appActionWebsocketKey, response)
      })
    })
  }

  return {
    registerAction(action) {
      if (action.onlyRest) return
      matchEngine.addAction(action)
    },
    startListening() {
      server.ready(runWebSocket)
      console.log('Successfully established websocket connection')
    },
  }
});
