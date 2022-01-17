export const getEnvironmentVariable =  (variableName: string, defaultValue: string | null = null) => {

  if (!(variableName in process.env)) {
    console.warn(`Environment variable ${variableName} is not set`);
    return defaultValue;
  }
  return process.env[variableName];
};
