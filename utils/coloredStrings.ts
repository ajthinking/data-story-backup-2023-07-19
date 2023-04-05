export const green = (message: string) => `\x1b[32m${message}\x1b[0m`;
export const blue = (message: string) => `\x1b[34m${message}\x1b[0m`;
export const reset = (message: string) => `\x1b[0m${message}\x1b[0m`;