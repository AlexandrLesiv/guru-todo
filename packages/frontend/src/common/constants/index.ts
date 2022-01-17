import { getEnvironmentVariable } from "../helpers/system/get-environment-variable";

export const restServerUrl = getEnvironmentVariable('APP_REST_SERVER_URL', 'http://localhost:5000')!
export const websocketServerUrl = getEnvironmentVariable('APP_WEBSOCKET_SERVER_URL', 'http://localhost:5000')!

export const websocketActionResolvationTimeout = 1000 * 10
