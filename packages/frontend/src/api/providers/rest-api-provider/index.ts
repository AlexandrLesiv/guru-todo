import { memoize } from '@todoguru/shared/common/utils/memoize'
import { restServerUrl } from '../../../common/constants'
import { ApiProvider } from '../_types'
import { normalizePath } from './_helpers'

export const getRestApiProvider = memoize<() => ApiProvider>(() => {
  
  return {
    request(action, payload) {
      const path = normalizePath(action.name, payload?.params, payload?.query)

      return fetch(restServerUrl + path, {
        method:action.type,
        credentials: action.credentials,

        ...(payload?.body && ({
          body: JSON.stringify(payload.body),
          headers: {
            'Content-Type': 'application/json'
          }
        }))
      }).then(r => r.json())
    },
    ready() {
      return true
    }
  }
})
