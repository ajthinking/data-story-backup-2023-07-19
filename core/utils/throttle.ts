export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function(this: any, ...args: Parameters<T>) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        timeoutId = undefined;
      }, delay);
    }
  };
}