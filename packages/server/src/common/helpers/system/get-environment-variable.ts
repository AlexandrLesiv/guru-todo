import dotenv from 'dotenv'
import { memoize } from '@todoguru/shared/common/utils/memoize';

const configure = memoize(() => dotenv.config())

export const getEnvironmentVariable =  (variableName: string, defaultValue: string | null = null) => {
  configure()

  if (!(variableName in process.env)) {
    console.warn(`Environment variable ${variableName} is not set`);
    return defaultValue;
  }
  return process.env[variableName];
};
