export interface SharedAction<T = any> {
  name: string;
  type: 'GET' | 'POST' | 'PUT' | 'DELETE';

  onlyRest?: boolean
  onlyWs?: boolean
}


export interface WebsocketActionPayload {
  nonce: number
  data?: SharedActionData
  action: SharedAction
}

export interface WebsocketActionResponsePayload {
  nonce: number
  statusCode: number
  data: any
}

export interface SharedActionData {
  body: any
  params: any
  query: any
}
