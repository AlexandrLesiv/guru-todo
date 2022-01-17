export const isObject = (maybeObject: unknown): maybeObject is Record<string, unknown> =>  typeof maybeObject === 'object'
