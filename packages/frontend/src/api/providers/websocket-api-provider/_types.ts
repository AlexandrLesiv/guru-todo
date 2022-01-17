export interface WebsocketResolvationMap {
  get(key: number): PromiseResolvationPayload | undefined
  set(key: number, value: PromiseResolvationPayload): void
  delete(key: number): void
}

export interface PromiseResolvationPayload {
  resolve: (data: any) => void
  reject: (reason: any) => void
}
