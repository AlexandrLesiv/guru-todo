import socketIo from 'socket.io-client';
import { memoize } from "@todoguru/shared/common/utils/memoize";
import { ApiProvider } from "../_types";
import { websocketActionResolvationTimeout, websocketServerUrl } from "../../../common/constants";
import { websocketPayload } from './_helpers';
import { appActionWebsocketKey } from '@todoguru/shared/common/constants'
import { WebsocketResolvationMap } from './_types';
import { WebsocketActionResponsePayload } from '@todoguru/shared/actions/_types';

// Also, we might import socket.io on idle
export const getWebsocketApiProvider = memoize<() => ApiProvider>(() => {
  const resolvationMap: WebsocketResolvationMap = new Map()

  const io = socketIo(websocketServerUrl).connect()

  io.on(appActionWebsocketKey, (data: WebsocketActionResponsePayload) => {
    const pendingRequest = resolvationMap.get(data.nonce)
    if (pendingRequest) {
      pendingRequest.resolve(data.data)
      resolvationMap.delete(data.nonce)
    }
  })

  return {
    request(action, data) {
      const payload = websocketPayload(action, data)

      io.emit(appActionWebsocketKey, payload)

      return new Promise((resolve, reject) => {
        resolvationMap.set(payload.nonce, { resolve, reject })

        setTimeout(() => {
          if (resolvationMap.get(payload.nonce)) {
            reject('Connection Timeout')
            resolvationMap.delete(payload.nonce)
          }
        }, websocketActionResolvationTimeout)
      })
    },
    ready() {
      return io.connected
    }
  }
})
