import { SharedAction } from '@todoguru/shared/actions/_types'

export type ClientAction =  SharedAction & OwnClientActionProperties


export interface OwnClientActionProperties {
  credentials?: 'include' | 'omit' | 'same-origin';  
}