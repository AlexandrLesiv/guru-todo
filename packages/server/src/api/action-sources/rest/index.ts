import { ActionSource } from '../_types/action-source'
import { getFastifyServer } from '../_node-server';
import { serverPort } from '../../../common/constants';
import { memoize } from '@todoguru/shared/common/utils/memoize';
import { SharedActionData } from '@todoguru/shared/actions/_types';

export const getRestSource = memoize<() => ActionSource>(() => {
  const server = getFastifyServer()

  return {
    startListening() {
      server.listen(serverPort, '0.0.0.0', (e, address) => {
        if (e) return console.error(e)

        console.log(`Server is Listening at ${address}`)
      }) 
    },
    registerAction: (action) => {
      if (action.onlyWs) return

      server.route({
        method: action.type,
        url: action.name,
        handler: (req) => {
          const { body, params, query } = req;
          const actionPayload: SharedActionData = {
            body,
            params,
            query
          }

          return action.handler(actionPayload)
        }
      })
    }
  }
})
