import { stringify } from 'qs'

export const normalizePath = (path: string, params?: Record<string, unknown>, query?: Record<string, unknown>) => {
  let apiUrl = path

  if (params) {
    for (const paramsKey of Object.keys(params)) {
      apiUrl = apiUrl.replace(':' + paramsKey, String(params[paramsKey]));
    }
  }
  if (query) {
    const stringQuery = stringify(query);
    apiUrl += '?' + stringQuery;
  }

  return apiUrl
}