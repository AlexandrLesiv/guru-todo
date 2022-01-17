import { isFunction } from "./is-function"
import { isObject } from "./is-object"

// with the current implementation the function might lose its 'this' context 
export const memoize = <T extends (...args: never[]) => unknown>(fn: T): T => {
  const cache = new Map()

  if (fn.length === 1) {
    const weakCache = new WeakMap()

    const memoizer: T =  ((...args: Parameters<T>) => {
      const argument = args[0]
      if (isObject(argument) || isFunction(argument)) {
        if (!weakCache.get(argument)) {
          weakCache.set(argument as object, fn.apply(null, args))
        }
        return weakCache.get(argument)
      }
      if (!cache.get(argument)) {
        cache.set(argument, fn.apply(null, args))
      }
      return cache.get(argument)
    }) as any
    return memoizer
  }

  const memoizer: T =  ((...args: Parameters<T>) => {
    const argument = fn.length && JSON.stringify(args) 
    if (!cache.get(argument)) {
      cache.set(argument, fn.apply(null, args))
    }
    return cache.get(argument)
  }) as any

  return memoizer
}