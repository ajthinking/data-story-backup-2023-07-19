import { useCallback, useEffect } from "react";

const KEY_NAME = 'Minus';
const KEY_EVENT_TYPE = 'keyup';
 
export function usePlusKey(handle: any) {
    const handleEscKey = useCallback((event: any) => {
    if (event.key === KEY_NAME) {
      handle();
    }
  }, [handle]);
 
  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handle, false);
 
    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handle, false);
    };
  }, [handle]);
}