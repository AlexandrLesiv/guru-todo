import { getEnvironmentVariable } from "../helpers/system/get-environment-variable";

export const serverPort = +getEnvironmentVariable('PORT', '5000')!
export const clientOrigin = getEnvironmentVariable('CLIENT_ORIGIN', 'http://localhost:1234')!

export const nodeEnv = getEnvironmentVariable('NODE_ENV', 'development')
export const isDevelopment = nodeEnv === 'development'
export const isProduction = nodeEnv === 'production'
